"use client"
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import {
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    CloseOutlined
} from '@ant-design/icons';
import { Button, Input, Space, Table, Typography, Radio, ConfigProvider, Divider, Modal } from 'antd';
import userProfile from '../../../../public/user.png';
import AddArticleModal from '../modals/addArticle/page'
const { Title } = Typography;



const articles = [
    {
        "article_id": 1,
        "name": "Attention Is All You Need",
        "field": "Inteligência Artificial",
        "doi": "10.48550/arXiv.1706.03762",
        "keywords": "machine learning, neural networks, transformers, natural language processing"
    },
    {
        "article_id": 2,
        "name": "A Review of Advancements and Challenges in CRISPR-Cas9 Genome Editing",
        "field": "Genética",
        "doi": "10.1016/j.tibs.2024.05.012",
        "keywords": "CRISPR, gene editing, biotechnology, molecular biology"
    },
    {
        "article_id": 3,
        "name": "Observation of Gravitational Waves from a Binary Black Hole Merger",
        "field": "Astrofísica",
        "doi": "10.1103/PhysRevLett.116.061102",
        "keywords": "gravitational waves, black holes, LIGO, general relativity"
    },
    {
        "article_id": 4,
        "name": "The Impact of Urban Green Spaces on Community Well-being in Belo Horizonte",
        "field": "Estudos Urbanos",
        "doi": "10.1177/0042098025134578",
        "keywords": "urban planning, green space, public health, sociology"
    }
]


export default function membersPage() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchTextExternal, setSearchTextExternal] = useState('');
    const [searchedColumnExternal, setSearchedColumnExternal] = useState('');
    const searchInputExternal = useRef(null);
    const [filteredInfoExternal, setFilteredInfoExternal] = useState({});
    const [sortedInfoExternal, setSortedInfoExternal] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [memberType, setMemberType] = useState('internal');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const [filterKeys, setFilterkeys] = useState([]);

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = clearFilters => {
        setFilteredInfo({});
        clearFilters();
        setSearchText('');
    };
    const handleChangeExternal = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfoExternal(filters);
        setSortedInfoExternal(sorter);
    };
    const handleSearchExternal = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchTextExternal(selectedKeys[0]);
        setSearchedColumnExternal(dataIndex);
    };
    const handleResetExternal = clearFilters => {
        setFilteredInfoExternal({});
        clearFilters();
        setSearchTextExternal('');
    };

    const getColumnSearchProps = (dataIndex, external) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
                <Input
                    ref={external ? searchInputExternal : searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    autoFocus
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex, false)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => external ? handleSearchExternal(selectedKeys, confirm, dataIndex) : handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => external ? clearFilters && handleResetExternal(clearFilters) : clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            external ? setSearchedColumnExternal(dataIndex) : setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => {
                        var _a;
                        return external ? ((_a = searchInputExternal.current) === null || _a === void 0 ? void 0 : _a.select()) :
                            ((_a = searchInputExternal.current) === null || _a === void 0 ? void 0 : _a.select());
                    }, 100);
                }
            },
        },
        render: text =>
            external ?
                (searchedColumnExternal === dataIndex ? (text) : (text)) : (searchedColumn === dataIndex ? (text) : (text))
    });

    const onSelectChange = newSelectedRowKeys => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };



    function setFiltersArray(data) {
        return new Set(data.flatMap((proj) => proj.keywords.split(', ')));
    }


    const articleCollumns = [
        Table.SELECTION_COLUMN,
        Object.assign(
            Object.assign(
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    filteredValue: filteredInfo.name || null,
                    sorter: (a, b) => a.name - b.name,
                    sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
                    width: '60%'
                },
                getColumnSearchProps('name', false),
            ),
            {
                sorter: (a, b) => a.name.localeCompare(b.name),
                sortDirections: ['descend', 'ascend'],
            },
        ),
        Object.assign(
            Object.assign(
                {
                    title: 'Field',
                    dataIndex: 'field',
                    key: 'field',
                    width: '20%',
                    filteredValue: filteredInfo.field || null,
                    onFilter: (value, record) => { return record.field === value },
                    sorter: (a, b) => a.field.localeCompare(b.field),
                    sortOrder: sortedInfo.columnKey === 'field' ? sortedInfo.order : null,
                    ellipsis: true,
                },
                getColumnSearchProps('field', false),
            ),

            {
                sorter: (a, b) => a.field.localeCompare(b.field),
                sortDirections: ['descend', 'ascend'],
            },
        ),
        Object.assign(
            Object.assign(
                {
                    title: 'DOI',
                    dataIndex: 'doi',
                    key: 'doi',
                    filteredValue: filteredInfo.name || null,
                    width: '20%',
                },
                getColumnSearchProps('doi', false),
            ),

        ),
        Object.assign(
            Object.assign(
                {
                    title: 'Keywords',
                    dataIndex: 'keywords',
                    key: 'keywords',
                    width: '40%',
                    filters: filterKeys,
                    filterSearch: true,
                    filteredValue: filteredInfo.keywords || null,
                    onFilter: (value, record) => { return record.keywords.includes(value) },
                    ellipsis: true,
                },
            ),
        ),
    ];


    async function getInternalMembers() {
        let members = await axios.get('http://localhost:7777/members/getAllInternal');

        if (members.status !== 200) {
            alert('Erro ao buscar membros.');
        }

        let membersArray = [];

        for (const mem of members.data.memberData) {
            let line = mem;
            line.key = mem.member_id;
            membersArray.push(line);
        }

        setMembers(membersArray);

    }

    useEffect(() => {
        // getInternalMembers()
        let keywords = setFiltersArray(articles);
        
        setFilterkeys([...keywords].map((key) => {
            return {
                text: key.charAt(0).toUpperCase() + key.slice(1),
                value: key
            }
        }))

    }, [memberType]);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        primaryShadow: '#156D86',
                        colorPrimary: '#156D86',
                        colorPrimaryHover: '#12576b',
                        colorPrimaryActive: '#104c5e',
                        colorPrimaryBg: '#156D86',
                        colorPrimaryBgHover: '#12576b',
                        colorPrimaryBgActive: '#104c5e',
                    },
                    Radio: {
                        colorPrimary: '#156D86',
                        buttonSolidCheckedBg: '#fff',
                        buttonSolidCheckedColor: '#156D86',
                        buttonSolidCheckedBorderColor: '#156D86',
                        buttonSolidCheckedShadow: '0 0 0 2px #156D8633',
                    }
                },
            }}
        >
            <div style={{ marginTop: '15px', marginLeft: '15px', maxHeight: '100%' }}>
                <Title level={2} style={{ color: '#156D86', marginTop: '10px' }}>Articles</Title>
                <Divider orientation="left" plain></Divider>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div id='tableType' style={{ paddingTop: '6px' }}>
                        <Title level={4} style={{ marginBottom: '15px', marginLeft: '650px', color: '#156D86' }}> IMScience Articles</Title>
                    </div>
                    <div id='addButton' style={{ paddingTop: '10px' }}>
                        {selectedRowKeys.length > 0 ? (
                            <Button
                                type="primary"
                                danger
                                size='small'
                                style={{
                                    width: '150px',
                                    height: '25px',
                                    textAlign: 'center',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 16px 0 rgba(21, 109, 134, 0.25), 0 1.5px 4px 0 rgba(0,0,0,0.10)'
                                }}
                            >
                                {`Delete Articles(s)`}<CloseOutlined />
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                size='small'
                                style={{
                                    width: '130px',
                                    height: '25px',
                                    textAlign: 'center',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 16px 0 rgba(21, 109, 134, 0.25), 0 1.5px 4px 0 rgba(0,0,0,0.10)'
                                }}
                                onClick={(e) => { setIsModalOpen(true) }}
                            >
                                Add Articles<PlusOutlined />
                            </Button>
                        )}

                    </div>
                </div>
                <div id='membersTables' style={{ justifyItems: 'left' }}>
                    <div id='membersTable' style={{ width: '100%' }}>
                        <Table columns={articleCollumns}
                            dataSource={articles}
                            rowSelection={rowSelection}
                            rowKey={"article_id"}
                            pagination={{ pageSize: 7, }}
                            onChange={handleChange}
                            style={{ height: '400px' }}
                        />
                    </div>
                </div>
                <Modal
                    title="Add article"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                    centered
                >
                    <AddArticleModal close={() => setIsModalOpen(false)} />
                </Modal>
            </div>
        </ConfigProvider >
    );
};