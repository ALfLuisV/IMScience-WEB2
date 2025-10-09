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
import AddProjectModal from '../modals/addProject/page'
const { Title } = Typography;



const projects = [
    {
        "project_id": 5,
        "name": "Plataforma de E-learning Corporativo",
        "abstract": "Desenvolvimento de um ambiente virtual de aprendizagem para capacitação contínua dos colaboradores da empresa.",
        "members": 10,
        "validity": "2026-11-30"
    },
    {
        "project_id": 6,
        "name": "Otimização da Logística de Entrega",
        "abstract": "Implementação de um novo software de roteirização para reduzir custos e tempo de entrega dos produtos.",
        "members": 7,
        "validity": "2026-02-28"
    },
    {
        "project_id": 7,
        "name": "Campanha de Marketing Digital - Outono/Inverno",
        "abstract": "Criação e execução de uma campanha publicitária online para promover a nova coleção de produtos sazonais.",
        "members": 5,
        "validity": "2026-07-31"
    },
    {
        "project_id": 8,
        "name": "Desenvolvimento de API Pública",
        "abstract": "Criação de uma API RESTful para permitir a integração de serviços de terceiros com nossa plataforma principal.",
        "members": 9,
        "validity": "2027-01-15"
    },
    {
        "project_id": 9,
        "name": "Projeto de Sustentabilidade e Redução de Carbono",
        "abstract": "Iniciativa para analisar e reduzir a pegada de carbono das operações da empresa em 20%.",
        "members": 6,
        "validity": "2026-12-31"
    },
    {
        "project_id": 10,
        "name": "Automação de Processos Financeiros",
        "abstract": "Implementação de robôs (RPA) para automatizar tarefas repetitivas no departamento financeiro, como conciliação bancária.",
        "members": 4,
        "validity": "2026-05-20"
    },
    {
        "project_id": 11,
        "name": "Redesign do Website Institucional",
        "abstract": "Modernização completa do design e da experiência do usuário (UX/UI) do website principal da companhia.",
        "members": 8,
        "validity": "2026-08-10"
    },
    {
        "project_id": 12,
        "name": "Análise de Big Data para Previsão de Vendas",
        "abstract": "Utilização de modelos de machine learning para analisar dados históricos e prever tendências de vendas futuras.",
        "members": 5,
        "validity": "2027-04-01"
    },
    {
        "project_id": 13,
        "name": "Programa de Inovação Aberta",
        "abstract": "Criação de um programa para colaborar com startups e universidades no desenvolvimento de novas tecnologias.",
        "members": 3,
        "validity": "2027-06-30"
    },
    {
        "project_id": 14,
        "name": "Implantação da Norma ISO 27001",
        "abstract": "Projeto para adequar os processos de segurança da informação da empresa aos padrões da certificação ISO 27001.",
        "members": 11,
        "validity": "2026-10-25"
    },
    {
        "project_id": 15,
        "name": "Criação de um Chatbot de Atendimento",
        "abstract": "Desenvolvimento de um assistente virtual com inteligência artificial para o atendimento ao cliente 24/7 no site.",
        "members": 7,
        "validity": "2026-03-18"
    },
    {
        "project_id": 16,
        "name": "Sistema de Business Intelligence (BI)",
        "abstract": "Construção de dashboards interativos para visualização de dados e apoio à tomada de decisão estratégica.",
        "members": 9,
        "validity": "2027-02-12"
    },
    {
        "project_id": 17,
        "name": "Expansão para o Mercado Asiático",
        "abstract": "Estudo de viabilidade e planejamento estratégico para a entrada da empresa em mercados selecionados da Ásia.",
        "members": 6,
        "validity": "2027-08-31"
    },
    {
        "project_id": 18,
        "name": "Gamificação do Treinamento de Vendas",
        "abstract": "Transformar o processo de treinamento da equipe de vendas em uma experiência gamificada para aumentar o engajamento.",
        "members": 4,
        "validity": "2026-09-05"
    },
    {
        "project_id": 19,
        "name": "Desenvolvimento de Produto com IoT",
        "abstract": "Criação de um novo produto conectado à Internet das Coisas para monitoramento remoto.",
        "members": 15,
        "validity": "2027-05-22"
    },
    {
        "project_id": 20,
        "name": "Reestruturação do Programa de Benefícios",
        "abstract": "Análise e modernização do pacote de benefícios oferecido aos funcionários, com foco em flexibilidade e bem-estar.",
        "members": 5,
        "validity": "2026-04-30"
    }
]


export default function membersPage() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchedColumnExternal, setSearchedColumnExternal] = useState('');
    const searchInputExternal = useRef(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [memberType, setMemberType] = useState('internal');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [members, setMembers] = useState([])

    const handleChange = (pagination, filters, sorter) => {
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

    const projectColumns = [
        Table.SELECTION_COLUMN,
        Table.EXPAND_COLUMN,
            Object.assign(
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    sortDirections: ['descend', 'ascend'],
                    filteredValue: filteredInfo.name || null,
                    sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
                    width: '60%'
                },
                getColumnSearchProps('name', true),
            ),
                {
                    title: 'Members',
                    dataIndex: 'members',
                    key: 'members',
                    filteredValue: filteredInfo.members || null,
                    sorter: (a, b) => a.members - b.members,
                    sortDirections: ['descend', 'ascend'],
                    sortOrder: sortedInfo.columnKey === 'members' ? sortedInfo.order : null,
                    width: '10%'
                },
                {
                    title: 'Validity',
                    dataIndex: 'validity',
                    key: 'validity',
                    filteredValue: filteredInfo.validity || null,
                    sortOrder: sortedInfo.columnKey === 'validity' ? sortedInfo.order : null,
                    width: '30%'
                },
    ]


    // async function getInternalMembers() {
    //     let members = await axios.get('http://localhost:7777/members/getAllInternal');

    //     if (members.status !== 200) {
    //         alert('Erro ao buscar membros.');
    //     }

    //     let membersArray = [];

    //     for (const mem of members.data.memberData) {
    //         let line = mem;
    //         line.key = mem.member_id;
    //         membersArray.push(line);
    //     }

    //     setMembers(membersArray);

    // }

    // useEffect(() => {
    //     getInternalMembers()
    // }, [memberType]);

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
                <Title level={2} style={{ color: '#156D86', marginTop: '10px' }}>Projects</Title>
                <Divider orientation="left" plain></Divider>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div id='tableType' style={{ paddingTop: '6px' }}>
                        <Title level={4} style={{ marginBottom: '15px', color: '#156D86' }}>Projects</Title>
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
                                {`Delete project(s)`}<CloseOutlined />
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
                                {`Add project`}<PlusOutlined />
                            </Button>
                        )}

                    </div>
                </div>
                <div id='membersTables' style={{ justifyItems: 'left' }}>
                    <div id='membersTable' style={{ width: '100%' }}>
                        <Table columns={projectColumns}
                            dataSource={projects}
                            rowSelection={rowSelection}
                            rowKey={"project_id"}
                            expandable={{
                                expandedRowRender: record => <p style={{ margin: 0 }}>{record.abstract}</p>,
                            }}
                            pagination={{ pageSize: 7, }}
                            onChange= {handleChange}
                            style={{ height: '400px' }}
                        />
                    </div>
                </div>
                <Modal
                    title="Add project"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                    centered
                >
                    <AddProjectModal close={() => setIsModalOpen(false)} />
                </Modal>
            </div>
        </ConfigProvider >
    );
};