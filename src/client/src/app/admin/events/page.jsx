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
import { Button, Input, Space, Table, Typography, ConfigProvider, Divider, Modal } from 'antd';
import AddEventModal from '../modals/addEvent/page';

const { Title } = Typography;

const eventsData = [
    {
        "event_id": 1,
        "name": "Semana de Tecnologia 2025",
        "description": "Uma semana inteira com palestras e workshops sobre as tecnologias mais recentes do mercado.",
        "event_date": "2025-10-20 / 09:00",
        "location": "Centro de Convenções Principal",
        "mode": "Presencial",
        "type": "Congresso",
        "audiencia": "Público Geral"
    },
    {
        "event_id": 2,
        "name": "Webinar: Introdução à Inteligência Artificial",
        "description": "Aprenda os conceitos fundamentais de IA com especialistas da área.",
        "event_date": "2025-09-05 / 19:00",
        "location": "Plataforma Zoom",
        "mode": "Online",
        "type": "Webinar",
        "audiencia": "Estudantes"
    },
    {
        "event_id": 3,
        "name": "Hackathon de Soluções Sustentáveis",
        "description": "Maratona de programação focada em criar soluções para problemas ambientais.",
        "event_date": "2025-11-15 / 08:30",
        "location": "Campus da Universidade",
        "mode": "Presencial",
        "type": "Competição",
        "audiencia": "Desenvolvedores"
    },
    {
        "event_id": 4,
        "name": "Meetup de Desenvolvedores Front-End",
        "description": "Encontro mensal para discutir novidades em frameworks como React, Vue e Svelte.",
        "event_date": "2025-08-30 / 18:00",
        "location": "Auditório Tech Hub / YouTube Live",
        "mode": "Híbrido",
        "type": "Meetup",
        "audiencia": "Desenvolvedores"
    }
];


export default function EventsPage() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState([]);

    // Função para buscar eventos da API
    async function getEvents() {
        try {
            // Descomente a linha abaixo para buscar dados reais da sua API
            /*const response = await axios.get('http://localhost:7777/events/getAll');
                if (response.status !== 200) {
                    alert('Erro ao buscar eventos.');
                    return;
                }
                const eventsFromApi = response.data.eventData;*/

            // Usando dados mocados enquanto a API não está pronta
            const eventsFromApi = eventsData;

            const eventsArray = eventsFromApi.map(event => ({
                ...event,
                key: event.event_id,
            }));

            setEvents(eventsArray);

        } catch (error) {
            console.error("Erro ao buscar eventos:", error);

            const eventsArray = eventsData.map(event => ({ ...event, key: event.event_id }));
            setEvents(eventsArray);
        }
    }

    useEffect(() => {
        getEvents();
    }, []);

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

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
        setFilteredInfo({});
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

    const eventsTableColumns = [
        Table.SELECTION_COLUMN,
        Table.EXPAND_COLUMN,
        Object.assign(
            Object.assign(
                {
                    title: 'Event name',
                    dataIndex: 'name',
                    key: 'name',
                    filteredValue: filteredInfo.name || null,
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
                    width: '30%'
                },
                getColumnSearchProps('name', false),
            ),
            {
                sorter: (a, b) => a.name.localeCompare(b.name),
                sortDirections: ['descend', 'ascend'],
            },
        ),
        {
            title: 'Date',
            dataIndex: 'event_date',
            key: 'event_date',
            sorter: (a, b) => new Date(a.event_date.split(" / ")[0]) - new Date(b.event_date.split(" / ")[0]),
            sortOrder: sortedInfo.columnKey === 'event_date' ? sortedInfo.order : null,
            filteredValue: filteredInfo.mode || null,
            width: '15%'
        },
        Object.assign(
            Object.assign(
                {
                    title: 'Local',
                    dataIndex: 'location',
                    key: 'location',
                    filteredValue: filteredInfo.location || null,
                    width: '25%'
                },
                getColumnSearchProps('location', false),
            ),
        ),
        {
            title: 'Mode',
            dataIndex: 'mode',
            key: 'mode',
            filters: [
                { text: 'Presencial', value: 'Presencial' },
                { text: 'Online', value: 'Online' },
                { text: 'Híbrido', value: 'Híbrido' },
            ],
            filteredValue: filteredInfo.mode || null,
            onFilter: (value, record) => record.mode === value,
            width: '15%'
        },
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

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        primaryShadow: '#156D86',
                        colorPrimary: '#156D86',
                        colorPrimaryHover: '#12576b',
                    },
                },
            }}
        >
            <div style={{ margin: '15px', maxHeight: '100%' }}>
                <Title level={2} style={{ color: '#156D86', marginTop: '10px' }}>Events</Title>
                <Divider orientation="left" plain></Divider>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div />
                    <Title level={4} style={{ color: '#156D86' }}>Registered events</Title>

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
                            onClick={() => alert(`Excluir ${selectedRowKeys.length} evento(s)`)}
                        >
                            {`Delete Event(s)`}<CloseOutlined />
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
                            onClick={() => setIsModalOpen(true)}
                        >
                            {`Add Event`}<PlusOutlined />
                        </Button>
                    )}
                </div>

                <Table
                    columns={eventsTableColumns}
                    dataSource={events}
                    rowSelection={rowSelection}
                    rowKey="event_id"
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                    }}
                    pagination={{ pageSize: 7 }}
                    onChange={handleChange}
                />

                <Modal
                    title="Add New Event"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                    centered
                >
                    {/* Você precisará criar este componente para o formulário de adição de evento */}
                    <AddEventModal close={() => setIsModalOpen(false)} />
                </Modal>
            </div>
        </ConfigProvider>
    );
};