"use client";
import React from 'react';
import {
    Button,
    Input,
    ConfigProvider,
    Divider,
    Form,
    message,
    Select,
    Switch
} from 'antd';
import axios from 'axios';

// Props: 'close' para fechar o modal e 'refreshData' para atualizar a lista de usuários.
export default function AddUserModal({ close, refreshData }) {
    const [form] = Form.useForm();

    const userRoles = [
        { value: 'ADMIN', label: 'Admin' },
        { value: 'USER', label: 'User' },
        { value: 'GUEST', label: 'Guest' }
    ];

    // Função para adicionar o usuário
    async function addUser(values) {
        try {
            message.loading({ content: 'Adding user...', key: 'addUser' });

            // Endpoint hipotético para adicionar usuários. Ajuste conforme sua API.
            const response = await axios.post('http://localhost:7777/users/addUser', values);

            if (response.status === 201) {
                message.success({ content: 'User added successfully!', key: 'addUser', duration: 2 });
                form.resetFields(); // Limpa o formulário
                if (refreshData) {
                    refreshData(); // Atualiza os dados na página principal
                }
                close(); // Fecha o modal
            } else {
                 message.error({ content: `Failed to add user: ${response.data.message || 'Unknown error'}`, key: 'addUser', duration: 3 });
            }

        } catch (error) {
            console.error('Error adding user:', error);
            const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred.';
            message.error({ content: `Error adding user: ${errorMessage}`, key: 'addUser', duration: 3 });
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
                    onFinish={addUser}
                    initialValues={{ isActive: true }} // Define o valor inicial do Switch
                >
                    {/* Campos alinhados com o model 'users' */}
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the full name!' }]}
                    >
                        <Input placeholder="e.g., John Doe" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input the email!' },
                            { type: 'email', message: 'The input is not a valid email!' }
                        ]}
                    >
                        <Input placeholder="e.g., john.doe@example.com" />
                    </Form.Item>

                     <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please select a role!' }]}
                    >
                        <Select placeholder="Select a role for the user">
                            {userRoles.map(role => (
                                <Select.Option key={role.value} value={role.value}>
                                    {role.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Active Status"
                        name="isActive"
                        valuePropName="checked" // Essencial para componentes como Switch e Checkbox
                    >
                        <Switch />
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
                            Add User
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </ConfigProvider>
    );
}