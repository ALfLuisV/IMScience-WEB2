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



const news = [
    {
        "news_id": 1,
        "tittle": "Ataques de urso no Japão deixam dois feridos em supermercado e um morto",
        "content": "O Japão está enfrentando um aumento no número de encontros entre humanos e ursos. Em um incidente recente, um urso entrou em um supermercado, ferindo duas pessoas. Em um ataque separado, um homem foi morto. As autoridades locais estão em alerta e pedem que a população tome cuidado.",
        "data": "01-10-2025",
        "tags": "Japão, ataques de animais, ursos, segurança pública"
    },
    {
        "news_id": 2,
        "tittle": "Crise de reféns em Gaza: Conversas sobre cessar-fogo avançam",
        "content": "As negociações para um cessar-fogo em Gaza estão mostrando sinais de progresso, com o Hamas anunciando que listas de reféns e prisioneiros foram trocadas com Israel. A comunidade internacional acompanha de perto, na esperança de uma resolução para o conflito que já dura dois anos.",
        "data": "07-10-2025",
        "tags": "Gaza, Israel, conflito, cessar-fogo, negociações de paz"
    },
    {
        "news_id": 3,
        "tittle": "Google expande recursos de IA na busca para mais idiomas",
        "content": "O Google anunciou a expansão do seu Modo de IA na busca, incluindo o recurso 'Search Live' e suporte para sete novas línguas indianas. A empresa também apresentou o Gemini 2.5 Computer Use, um modelo de IA com habilidades de navegação na web semelhantes às humanas.",
        "data": "08-10-2025",
        "tags": "Google, inteligência artificial, tecnologia, busca na web, Gemini"
    },
    {
        "news_id": 4,
        "tittle": "Mercado de ações dos EUA se recupera com ouro atingindo recordes",
        "content": "Wall Street viu uma recuperação nas ações, com o S&P 500 subindo 0.5% e se aproximando de sua máxima histórica. O preço do ouro continua a subir, ultrapassando os $4.000 por onça. O mercado financeiro segue aquecido, impulsionado por ações de tecnologia e IA.",
        "data": "05-10-2025",
        "tags": "mercado financeiro, ações, Wall Street, ouro, economia"
    },
    {
        "news_id": 5,
        "tittle": "Nações do rugby se unem para banir jogadores de liga rebelde",
        "content": "Oito nações do rugby, incluindo a Inglaterra, se comprometeram a banir jogadores que participarem da liga rebelde R360. A decisão visa proteger a integridade das competições oficiais e manter a estrutura atual do esporte.",
        "data": "04-10-2025",
        "tags": "rugby, esportes, competições, R360, banimento"
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
        return new Set(data.flatMap((proj) => proj.tags.split(', ')));
    }


    const newsCollumns = [
        Table.SELECTION_COLUMN,
        Object.assign(
            Object.assign(
                {
                    title: 'Title',
                    dataIndex: 'tittle',
                    key: 'tittle',
                    filteredValue: filteredInfo.tittle || null,
                    sorter: (a, b) => a.tittle.localeCompare(b.tittle),
                    sortOrder: sortedInfo.columnKey === 'tittle' ? sortedInfo.order : null,
                    width: '60%'
                },
                getColumnSearchProps('tittle', false),
            ),
            {
                sorter: (a, b) => a.tittle.localeCompare(b.tittle),
                sortDirections: ['descend', 'ascend'],
            },
        ),
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
            width: '20%',
            ellipsis: true,

            filteredValue: filteredInfo.data || null,
            onFilter: (value, record) => record.data === value,
            sorter: (a, b) => a.data.localeCompare(b.data),
            sortOrder: sortedInfo.columnKey === 'data' ? sortedInfo.order : null,
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('data', false),
        },
        Object.assign(
            Object.assign(
                {
                    title: 'Tags',
                    dataIndex: 'tags',
                    key: 'tags',
                    filteredValue: filteredInfo.name || null,
                    width: '20%',
                },
                getColumnSearchProps('tags', false),
            ),

        ),
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <EditOutlined style={{ fontSize: '20px', color: "#156D86", cursor: 'pointer' }} onClick={() => alert(`Editar ${record.name}`)} />
                    <DeleteOutlined style={{ fontSize: '20px', color: '#b42020', cursor: 'pointer' }} onClick={() => alert(`Excluir ${record.name}`)} />
                </Space>
            ),
            width: '15%'
        },
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
        let keywords = setFiltersArray(news);

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
                <Title level={2} style={{ color: '#156D86', marginTop: '10px' }}>News</Title>
                <Divider orientation="left" plain></Divider>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div id='tableType' style={{ paddingTop: '6px' }}>
                        <Title level={4} style={{ marginBottom: '15px', marginLeft: '650px', color: '#156D86' }}> IMScience News</Title>
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
                                {`Delete news`}<CloseOutlined />
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
                                Add news<PlusOutlined />
                            </Button>
                        )}

                    </div>
                </div>
                <div id='membersTables' style={{ justifyItems: 'left' }}>
                    <div id='newsTable' style={{ width: '100%' }}>
                        <Table columns={newsCollumns}
                            dataSource={news}
                            rowSelection={rowSelection}
                            rowKey={"news_id"}
                            pagination={{ pageSize: 7, }}
                            expandable={{
                                expandedRowRender: record => <p style={{ margin: 0 }}>{record.content}</p>,
                            }}
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