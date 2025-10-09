"use client";
import React from 'react';
import {
    Button,
    Input,
    ConfigProvider,
    Divider,
    Form,
    message,
    DatePicker,
    InputNumber
} from 'antd';
import axios from 'axios';

const { TextArea } = Input;

// Props: 'close' para fechar o modal e 'refreshData' para atualizar a lista de projetos.
export default function AddProjectModal({ close, refreshData }) {
    const [form] = Form.useForm();

    // Função para adicionar o projeto
    async function addProject(values) {
        try {
            message.loading({ content: 'Adding project...', key: 'addProject' });

            // Endpoint hipotético para adicionar projetos. Ajuste conforme sua API.
            const response = await axios.post('http://localhost:7777/projects/addProject', values);

            if (response.status === 201) {
                message.success({ content: 'Project added successfully!', key: 'addProject', duration: 2 });
                form.resetFields(); // Limpa o formulário
                if (refreshData) {
                    refreshData(); // Atualiza os dados na página principal
                }
                close(); // Fecha o modal
            } else {
                 message.error({ content: `Failed to add project: ${response.data.message || 'Unknown error'}`, key: 'addProject', duration: 3 });
            }

        } catch (error) {
            console.error('Error adding project:', error);
            const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred.';
            message.error({ content: `Error adding project: ${errorMessage}`, key: 'addProject', duration: 3 });
        }
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        primaryShadow: '#156D86',
                        colorPrimary: '#156D86',
                        colorPrimaryHover: '#12576b',
                        colorPrimaryActive: '#104c5e',
                    },
                },
            }}
        >
            <div>
                <Divider orientation="left" plain />
                <Form
                    form={form}
                    layout="vertical"
                    variant='filled'
                    onFinish={addProject}
                >
                    {/* Campos alinhados com o model 'project' */}
                    <Form.Item
                        label="Project Name"
                        name="name"
                    >
                        <Input placeholder="e.g., Quantum Computing Research" />
                    </Form.Item>

                    <Form.Item
                        label="Abstract"
                        name="abstract"
                    >
                        <TextArea rows={4} placeholder="Brief summary of the project..." />
                    </Form.Item>

                    <Form.Item
                        label="Number of Members"
                        name="members"
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="e.g., 5" />
                    </Form.Item>

                    <Form.Item
                        label="Validity Date"
                        name="validity"
                    >
                        <DatePicker style={{ width: '100%' }} placeholder="Select the project's end date" />
                    </Form.Item>

                    <Divider orientation="left" plain />

                    <Form.Item style={{ display: 'flex', justifyContent: 'end', marginBottom: 0 }}>
                        <Button key="back" type="primary" danger onClick={close}>
                            Cancel
                        </Button>
                        <Button
                            key="add"
                            style={{ marginLeft: '10px' }}
                            type="primary"
                            htmlType="submit"
                        >
                            Add Project
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </ConfigProvider>
    );
}