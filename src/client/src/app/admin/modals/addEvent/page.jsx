"use client";
import React from 'react';
import {
    Button,
    Input,
    Select,
    ConfigProvider,
    Divider,
    Form,
    DatePicker, 
    notification
} from 'antd';
import axios from 'axios';

const { TextArea } = Input;

export default function AddEventModal({ close }) {
    const [form] = Form.useForm();

    // Função para adicionar o evento
    const addEvent = async (values) => {
        try {
            const eventData = {
                ...values,
                event_date: values.event_date ? values.event_date.format('YYYY-MM-DD') : null,
            };

            console.log('Enviando dados do evento:', eventData);

            // Envia os dados para a API
            const response = await axios.post(
                'http://localhost:7777/events/addEvent',
                eventData 
            );

            if (response.status === 200 || response.status === 201) {
                notification.success({
                    message: 'Sucesso!',
                    description: 'Evento adicionado com sucesso.',
                });
                form.resetFields(); 
                close(); 
            }
        } catch (error) {
            console.error('Erro ao adicionar evento:', error);
            notification.error({
                message: 'Erro!',
                description: `Não foi possível adicionar o evento. ${error.message}`,
            });
        }
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: '#156D86',
                        colorPrimaryHover: '#12576b',
                    },
                },
            }}
        >
            <div>
                <Divider orientation="left" plain>Event Datails</Divider>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={addEvent} 
                    autoComplete="off"
                >
                    <Form.Item
                        label="Event Name"
                        name="name"
                        rules={[{ required: true, message: 'Por favor, insira o nome do evento!' }]}
                    >
                        <Input placeholder="Ex: Semana de Tecnologia" />
                    </Form.Item>

                    <Form.Item
                        label="Event Date"
                        name="event_date"
                        rules={[{ required: true, message: 'Por favor, selecione a data!' }]}
                    >
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>

                    <Form.Item
                        label="Local"
                        name="location"
                        rules={[{ required: true, message: 'Por favor, insira o local!' }]}
                    >
                        <Input placeholder="Ex: Centro de Convenções ou Online" />
                    </Form.Item>

                    <Form.Item
                        label="Mode"
                        name="mode"
                        rules={[{ required: true, message: 'Por favor, selecione o modo!' }]}
                    >
                        <Select placeholder="Selecione o modo do evento">
                            <Select.Option value="Presencial">Presencial</Select.Option>
                            <Select.Option value="Online">Online</Select.Option>
                            <Select.Option value="Híbrido">Híbrido</Select.Option>
                        </Select>
                    </Form.Item>
                    
                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Por favor, insira o tipo de evento!' }]}
                    >
                        <Input placeholder="Ex: Congresso, Webinar, Workshop" />
                    </Form.Item>

                     <Form.Item
                        label="Audience"
                        name="audiencia"
                        rules={[{ required: true, message: 'Por favor, insira a audiência!' }]}
                    >
                        <Input placeholder="Ex: Público Geral, Estudantes" />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <TextArea rows={4} placeholder="Descreva brevemente o evento..." />
                    </Form.Item>

                    <Divider plain></Divider>

                    <Form.Item style={{ display: 'flex', justifyContent: 'end', marginBottom: 0 }}>
                        <Button key="back" type="primary" danger onClick={close}>
                            Cancel
                        </Button>
                        <Button key="add" style={{ marginLeft: '10px' }} type="primary" htmlType="submit">
                            Add Event
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </ConfigProvider>
    );
}