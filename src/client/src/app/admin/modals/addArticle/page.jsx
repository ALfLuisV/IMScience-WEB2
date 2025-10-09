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

export default function AddArticleModal({ close, refreshData }) {
    const [form] = Form.useForm();

    async function addArticle(values) {
        try {
            message.loading({ content: 'Adding article...', key: 'addArticle' });

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
                    onFinish={addArticle}
                >
                    {/* Campos alinhados com o model 'articles' */}
                    <Form.Item
                        label="Project ID"
                        name="project"
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="e.g., 1" />
                    </Form.Item>

                    <Form.Item
                        label="Field"
                        name="field"
                    >
                        <Input placeholder="Artificial Intelligence" />
                    </Form.Item>

                    <Form.Item
                        label="DOI (Digital Object Identifier)"
                        name="doi"
                    >
                        <Input placeholder="e.g., 10.48550/arXiv.1706.03762" />
                    </Form.Item>
                    
                    <Form.Item
                        label="Conference Name"
                        name="conference_name"
                    >
                        <Input placeholder="e.g., NeurIPS 2017" />
                    </Form.Item>

                    <Form.Item
                        label="Conference Date"
                        name="conference_date"
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Conference Place"
                        name="conference_place"
                    >
                        <Input placeholder="e.g., Long Beach, CA, USA" />
                    </Form.Item>

                    <Form.Item
                        label="Demo URL"
                        name="demo"
                    >
                        <Input placeholder="https://example.com/demo" />
                    </Form.Item>

                    <Form.Item
                        label="Abstract"
                        name="abstract"
                    >
                        <TextArea rows={4} placeholder="Brief summary of the article..." />
                    </Form.Item>

                    <Form.Item
                        label="Keywords"
                        name="keywords"
                    >
                        <TextArea rows={2} placeholder="Comma-separated keywords, e.g., machine learning, neural networks" />
                    </Form.Item>
                    
                    <Form.Item
                        label="References"
                        name="referencias"
                    >
                        <TextArea rows={3} placeholder="List of references..." />
                    </Form.Item>
                    
                    <Form.Item
                        label="Acknowledgment"
                        name="acknowledgment"
                    >
                        <TextArea rows={2} placeholder="Acknowledgments..." />
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
                            Add Article
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </ConfigProvider>
    );
}