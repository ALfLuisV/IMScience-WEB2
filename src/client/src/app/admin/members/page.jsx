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
import userProfile from '../../../../public/user.png'
import AddMemberModal from '../modals/addMember/page'
const { Title } = Typography;



const externalMembers = [
    {
        "external_members_id": 1,
        "name": "Dr. Ricardo Oliveira",
        "description": "Pesquisador sênior especializado em aprendizado de máquina e processamento de sinais.",
        "cpf": "123.456.789-01",
        "country": "Brasil",
        "institution": "Universidade de São Paulo (USP)",
        "projects": ["Análise Preditiva de Séries Temporais", "Detecção de Anomalias em Redes"]
    },
    {
        "external_members_id": 2,
        "name": "Dr. Emily Carter",
        "description": "Postdoctoral researcher focusing on computational chemistry and materials science.",
        "cpf": 'Vazio',
        "country": "USA",
        "institution": "Massachusetts Institute of Technology (MIT)",
        "projects": ["Quantum Dot Simulation", "Molecular Dynamics of Polymers"]
    },
    {
        "external_members_id": 3,
        "name": "Fernanda Costa",
        "description": "Mestranda desenvolvendo modelos de PLN para análise de sentimentos em redes sociais.",
        "cpf": "234.567.890-12",
        "country": "Brasil",
        "institution": "Universidade Estadual de Campinas (UNICAMP)",
        "projects": ["Classificador de Emoções em Textos em Português"]
    },
    {
        "external_members_id": 4,
        "name": "Lucas Martins",
        "description": "Engenheiro de software colaborador em projetos de otimização de infraestrutura de nuvem.",
        "cpf": "345.678.901-23",
        "country": "Brasil",
        "institution": "Tech Solutions Ltda.",
        "projects": ["Framework de Backend Escalável", "Monitoramento de Performance de APIs"]
    },
    {
        "external_members_id": 5,
        "name": "Dr. Kenji Tanaka",
        "description": "Visiting professor with expertise in robotics and computer vision.",
        "cpf": 'Vazio',
        "country": "Japan",
        "institution": "University of Tokyo",
        "projects": ["Robotic Arm Control using Reinforcement Learning"]
    },
    {
        "external_members_id": 6,
        "name": "Beatriz Almeida",
        "description": "Aluna de graduação em iniciação científica na área de bioinformática e análise genômica.",
        "cpf": "456.789.012-34",
        "country": "Brasil",
        "institution": "Universidade Federal de Minas Gerais (UFMG)",
        "projects": ["Análise de Sequenciamento de Nova Geração (NGS)", "Estudo de Variantes Genéticas"]
    },
    {
        "external_members_id": 7,
        "name": "Dr. Aisha Khan",
        "description": "Data scientist specializing in public health data analysis and epidemiological modeling.",
        "cpf": 'Vazio',
        "country": "United Kingdom",
        "institution": "Imperial College London",
        "projects": ["Epidemiological Modeling of Infectious Diseases", "Healthcare Data Visualization"]
    },
    {
        "external_members_id": 8,
        "name": "Hans Schmidt",
        "description": "PhD candidate researching ethical AI and fairness in algorithms.",
        "cpf": 'Vazio',
        "country": "Germany",
        "institution": "Technical University of Munich",
        "projects": ["Bias Detection in Machine Learning Models"]
    },
    {
        "external_members_id": 9,
        "name": "Júlia Pereira",
        "description": "Pesquisadora colaboradora em estudos sobre o impacto de energias renováveis na Amazônia.",
        "cpf": "567.890.123-45",
        "country": "Brasil",
        "institution": "Instituto Nacional de Pesquisas da Amazônia (INPA)",
        "projects": ["Otimização de Redes Elétricas Isoladas", "Modelagem de Fontes Solares"]
    },
    {
        "external_members_id": 10,
        "name": "Dr. Lena Petrova",
        "description": "Expert in cybersecurity and cryptography.",
        "cpf": 'Vazio',
        "country": "Estonia",
        "institution": "Cybernetica",
        "projects": ["Blockchain Applications for Secure Voting", "Post-Quantum Cryptography"]
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

    const internalMembersTableColumns = [
        Table.SELECTION_COLUMN,
        Table.EXPAND_COLUMN,
        Object.assign(
            {
                title: '',
                dataIndex: 'profile_pic',
                key: 'profile_pic',
                render: (value, record) => { return <img src={value} style={{ width: '30px' }}></img> },
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
                    title: 'Position',
                    dataIndex: 'position',
                    key: 'position',
                    width: '40%',
                    filters: [
                        { text: 'Professor', value: 'professor' },
                        { text: 'PhD Student', value: 'phd_student' },
                        { text: 'MsC Student', value: 'msc_student' },
                        { text: 'Undergrade Student', value: 'undergrade_student' },
                        { text: 'Volunteer', value: 'volunteer' },
                    ],
                    filteredValue: filteredInfo.position || null,
                    onFilter: (value, record) => { return record.position === value },
                    sorter: (a, b) => a.position - b.position,
                    sortOrder: sortedInfo.columnKey === 'position' ? sortedInfo.order : null,
                    ellipsis: true,
                },
            ),

            {
                sorter: (a, b) => a.position.localeCompare(b.position),
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
    const externalMembersTableColumns = [
        Table.SELECTION_COLUMN,
        Table.EXPAND_COLUMN,
        Object.assign(
            {
                title: '',
                dataIndex: '',
                key: '',
                render: (value, record) => { return <img src={userProfile.src} style={{ width: '30px' }}></img> },
                width: '5%'
            },
        ),
        Object.assign(
            Object.assign(
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    filteredValue: filteredInfoExternal.name || null,
                    sorter: (a, b) => a.name - b.name,
                    sortOrder: sortedInfoExternal.columnKey === 'name' ? sortedInfoExternal.order : null,
                    width: '20%'
                },
                getColumnSearchProps('name', true),
            ),
            {
                sorter: (a, b) => a.name.localeCompare(b.name),
                sortDirections: ['descend', 'ascend'],
            },
        ),
        Object.assign(
            {
                title: 'CPF',
                dataIndex: 'cpf',
                key: 'cpf',
                filteredValue: filteredInfoExternal.cpf || null,
                width: '15%',
                render: (value, record) => { return <div>{record.cpf ? record.cpf : "Vazio"}</div> }
            },
            getColumnSearchProps('cpf', true),
        ),
        Object.assign(
            Object.assign(
                {
                    title: 'Country',
                    dataIndex: 'country',
                    key: 'country',
                    filteredValue: filteredInfoExternal.country || null,
                    sorter: (a, b) => a.country - b.country,
                    sortOrder: sortedInfoExternal.columnKey === 'country' ? sortedInfoExternal.order : null,
                    width: '10%'
                },
                getColumnSearchProps('country', true),
            ),
            {
                sorter: (a, b) => a.country.localeCompare(b.country),
                sortDirections: ['descend', 'ascend'],
            },
        ),
        Object.assign(
            Object.assign(
                {
                    title: 'Institution',
                    dataIndex: 'institution',
                    key: 'institution',
                    filteredValue: filteredInfoExternal.institution || null,
                    sorter: (a, b) => a.institution - b.institution,
                    sortOrder: sortedInfoExternal.columnKey === 'institution' ? sortedInfoExternal.order : null,
                    width: '30%'
                },
                getColumnSearchProps('institution', true),
            ),
            {
                sorter: (a, b) => a.institution.localeCompare(b.institution),
                sortDirections: ['descend', 'ascend'],
            },
        ),
        Object.assign(
            {
                title: 'Projects',
                dataIndex: 'projects',
                key: 'projects',
                render: (value, record) => {
                    return <>
                        <div>
                            projetos
                        </div>
                    </>
                },
                width: '10%'
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
    ]


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
                <Title level={2} style={{ color: '#156D86', marginTop: '10px' }}>Members</Title>
                <Divider orientation="left" plain></Divider>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ paddingTop: '10px' }}>
                        <Radio.Group
                            value={memberType}
                            size='small'
                            onChange={(e) => {
                                setMemberType(e.target.value),
                                    setSelectedRowKeys([])
                            }}
                            style={{ marginBottom: '15px', boxShadow: '0 2px 8px 0 rgba(156, 156, 156, 0.25), 0 1.5px 4px 0 rgba(0,0,0,0.10)' }}
                        >
                            <Radio.Button value="internal">Internal members</Radio.Button>
                            <Radio.Button value="external">External members</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div id='tableType' style={{ paddingTop: '6px' }}>
                        <Title level={4} style={{ marginBottom: '15px', color: '#156D86' }}>{`${memberType === 'internal' ? 'Internal' : 'External'} members`}</Title>
                    </div>
                    <div id='addButton' style={{ paddingTop: '10px' }}>
                        {selectedRowKeys.length > 0 ? (
                            <Button
                                type="primary"
                                danger
                                size='small'
                                style={{
                                    width: '200px',
                                    height: '25px',
                                    textAlign: 'center',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 16px 0 rgba(21, 109, 134, 0.25), 0 1.5px 4px 0 rgba(0,0,0,0.10)'
                                }}
                            >
                                {`Delete ${memberType} member(s)`}<CloseOutlined />
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                size='small'
                                style={{
                                    width: '200px',
                                    height: '25px',
                                    textAlign: 'center',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 16px 0 rgba(21, 109, 134, 0.25), 0 1.5px 4px 0 rgba(0,0,0,0.10)'
                                }}
                                onClick={(e) => { setIsModalOpen(true) }}
                            >
                                {`Add member`}<PlusOutlined />
                            </Button>
                        )}

                    </div>
                </div>
                <div id='membersTables' style={{ justifyItems: 'left' }}>
                    <div id='membersTable' style={{ width: '100%' }}>
                        <Table columns={memberType === 'internal' ? internalMembersTableColumns : externalMembersTableColumns}
                            dataSource={memberType === 'internal' ? members : externalMembers}
                            rowSelection={rowSelection}
                            rowKey={memberType === 'internal' ? "member_id" : "external_members_id"}
                            expandable={{
                                expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                            }}
                            pagination={{ pageSize: 7, }}
                            onChange={memberType === 'internal' ? handleChange : handleChangeExternal}
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
                    <AddMemberModal close={() => setIsModalOpen(false)} />
                </Modal>
            </div>
        </ConfigProvider >
    );
};