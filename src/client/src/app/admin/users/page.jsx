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
// import userProfile from '../../../../public/user.png'
import userProfile from '../../../../public/user.png';
import AddUserModal from '../modals/addUser/page';
const { Title } = Typography;



const users = [
    {
        "uid": "1",
        "name": "Ana Silva",
        "email": "ana.silva@example.com",
        "role": "admin"
    },
    {
        "uid": "2",
        "name": "Bruno Costa",
        "email": "bruno.costa@example.com",
        "role": "user"
    },
    {
        "uid": "3",
        "name": "Carla Dias",
        "email": "carla.dias@example.com",
        "role": "user"
    },
    {
        "uid": "4",
        "name": "Daniel Oliveira",
        "email": "daniel.oliveira@example.com",
        "role": "admin"
    },
    {
        "uid": "5",
        "name": "Eduarda Ferreira",
        "email": "eduarda.ferreira@example.com",
        "role": "user"
    },
    {
        "uid": "6",
        "name": "Fábio Martins",
        "email": "fabio.martins@example.com",
        "role": "user"
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
    const [members, setMembers] = useState([])

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

    const usersCollumns = [
        Table.SELECTION_COLUMN,
        Table.EXPAND_COLUMN,
        Object.assign(
            {
                title: '',
                dataIndex: 'profile_pic',
                key: 'profile_pic',
                render: (value, record) => <img src={userProfile} alt="profile" style={{ width: '30px' }} />,
                width: '10%'
            },
        ),
        Object.assign(
            Object.assign(
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    filteredValue: filteredInfo.name || null,
                    sorter: (a, b) => a.name.localeCompare(b.name),
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
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                    width: '40%',
                    filteredValue: filteredInfo.email || null,
                    onFilter: (value, record) => { return record.email === value },
                    sorter: (a, b) => a.email.localeCompare(b.email),
                    sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
                    ellipsis: true,
                },
                getColumnSearchProps('email', false),
            ),

            {
                sorter: (a, b) => a.email.localeCompare(b.email),
                sortDirections: ['descend', 'ascend'],
            },
        ),
        Object.assign(
            Object.assign(
                {
                    title: 'Role',
                    dataIndex: 'role',
                    key: 'role',
                    width: '20%',
                    filters: [
                        { text: 'Admin', value: 'admin' },
                        { text: 'User', value: 'user' },
                    ],
                    filteredValue: filteredInfo.role || null,
                    onFilter: (value, record) => { return record.role === value },
                    sorter: (a, b) => a.role.localeCompare(b.role),
                    sortOrder: sortedInfo.columnKey === 'role' ? sortedInfo.order : null,
                    ellipsis: true,
                },
            ),

            {
                sorter: (a, b) => a.role.localeCompare(b.role),
                sortDirections: ['descend', 'ascend'],
            },
        ),
        Object.assign(
            {
                title: 'Actions',
                dataIndex: '',
                key: '',
                render: (value, record) => {
                    return (
                        <>
                            <div>
                                <EditOutlined style={{ fontSize: '20px', color: "#156D86", marginRight: '15px' }} onClick={(e) => { alert("clicado") }} />
                                <DeleteOutlined style={{ fontSize: '20px', color: '#b42020' }} onClick={(e) => { alert("clicado") }} />
                            </div>
                        </>
                    )
                },
                width: '20%'
            }
        ),
    ];


    async function getInternalMembers() {
            let members = await axios.get('http://localhost:7777/members/getAllInternal');

            if(members.status !== 200){
                alert('Erro ao buscar membros.');
            }

            let membersArray = [];
            
            for(const mem of members.data.memberData){
                let line = mem;
                line.key = mem.member_id;
                membersArray.push(line);
            }

            setMembers(membersArray);

    }

    useEffect(() => {
        getInternalMembers()
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
                <Title level={2} style={{ color: '#156D86', marginTop: '10px' }}>Users</Title>
                <Divider orientation="left" plain></Divider>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div id='tableType' style={{ paddingTop: '6px' }}>
                        <Title level={4} style={{ marginBottom: '15px', marginLeft: '650px', color: '#156D86' }}> App Users</Title>
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
                                {`Delete user(s)`}<CloseOutlined />
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
                                Add user<PlusOutlined />
                            </Button>
                        )}

                    </div>
                </div>
                <div id='membersTables' style={{ justifyItems: 'left' }}>
                    <div id='membersTable' style={{ width: '100%' }}>
                        <Table columns={usersCollumns}
                            dataSource={users}
                            rowSelection={rowSelection}
                            rowKey={"uid"}
                            pagination={{ pageSize: 7, }}
                            // onChange={memberType === 'internal' ? handleChange : handleChangeExternal}
                            style={{ height: '400px' }}
                        />
                    </div>
                </div>
                <Modal
                    title="Add member"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                    centered
                >
                    <AddUserModal close={() => setIsModalOpen(false)} />
                </Modal>
            </div>
        </ConfigProvider >
    );
};