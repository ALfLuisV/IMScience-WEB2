"use client";
import React from 'react';
import {
    Button,
    Input,
    ConfigProvider,
    Divider,
    Form,
    message // Usar o message do Antd para feedback é melhor que 'alert'
} from 'antd';
import axios from 'axios';

const { TextArea } = Input;

// O prop 'refreshData' é opcional, mas recomendado para atualizar a tabela após adicionar um item.
export default function AddArticleModal({ close, refreshData }) {
    const [form] = Form.useForm();

    // Função para adicionar o artigo
    async function addArticle(values) {
        try {
            message.loading({ content: 'Adding article...', key: 'addArticle' });

            // Endpoint hipotético para adicionar artigos. Ajuste conforme sua API.
            const response = await axios.post('http://localhost:7777/articles/addArticle', values);

            if (response.status === 201) { // 201 Created é um status comum para sucesso em POST
                message.success({ content: 'Article added successfully!', key: 'addArticle', duration: 2 });
                form.resetFields(); // Limpa o formulário
                if (refreshData) {
                    refreshData(); // Atualiza os dados na tabela da página principal
                }
                close(); // Fecha o modal
            } else {
                 message.error({ content: `Failed to add article: ${response.data.message || 'Unknown error'}`, key: 'addArticle', duration: 3 });
            }

        } catch (error) {
            console.error('Error adding article:', error);
            const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred.';
            message.error({ content: `Error adding article: ${errorMessage}`, key: 'addArticle', duration: 3 });
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
                    onFinish={addArticle} // onFinish é chamado quando o formulário é submetido com sucesso
                >
                    <Form.Item
                        label="Article Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the article name!' }]}
                    >
                        <Input placeholder="Attention Is All You Need" />
                    </Form.Item>
                    <Form.Item
                        label="Field"
                        name="field"
                        rules={[{ required: true, message: 'Please input the scientific field!' }]}
                    >
                        <Input placeholder="Artificial Intelligence" />
                    </Form.Item>
                    <Form.Item
                        label="DOI (Digital Object Identifier)"
                        name="doi"
                        rules={[{ required: true, message: 'Please input the DOI!' }]}
                    >
                        <Input placeholder="e.g., 10.48550/arXiv.1706.03762" />
                    </Form.Item>
                    <Form.Item
                        label="Keywords"
                        name="keywords"
                        rules={[{ required: true, message: 'Please input some keywords!' }]}
                    >
                        <TextArea rows={3} placeholder="Comma-separated keywords, e.g., machine learning, neural networks" />
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
                            htmlType="submit" // Define o botão como gatilho de submit do formulário
                        >
                            Add Article
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </ConfigProvider>
    );
}