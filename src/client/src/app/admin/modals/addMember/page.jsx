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
    Tabs,
} from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const { TabPane } = Tabs;

// Props: 'projectId' é obrigatório, 'close' e 'refreshData' são para controle
export default function AddMemberModal({ projectId, close, refreshData }) {
    const [internalForm] = Form.useForm();
    const [externalForm] = Form.useForm();

    // Defina as opções de cargo para os membros internos
    // Ajuste estes valores conforme o seu Enum 'member_position' no Prisma
    const memberPositions = [
        { value: 'RESEARCHER', label: 'Pesquisador' },
        { value: 'DEVELOPER', label: 'Desenvolvedor' },
        { value: 'PROJECT_MANAGER', label: 'Gerente de Projeto' },
        { value: 'STUDENT', label: 'Bolsista / Estudante' },
    ];

    // Função para CRIAR E ASSOCIAR um membro interno
    async function handleAddInternalMember(values) {
        try {
            message.loading({ content: 'Adicionando membro interno...', key: 'addMember' });
            // Endpoint para criar e associar um novo membro interno
            const payload = { ...values, projectId };
            const response = await axios.post('http://localhost:7777/projects/addInternalMember', payload);

            if (response.status === 201) {
                message.success({ content: 'Membro interno adicionado com sucesso!', key: 'addMember' });
                internalForm.resetFields();
                if (refreshData) refreshData();
                close();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Ocorreu um erro.';
            message.error({ content: `Erro: ${errorMessage}`, key: 'addMember' });
        }
    }

    // Função para CRIAR E ASSOCIAR um membro externo (sem alterações)
    async function handleAddExternalMember(values) {
        try {
            message.loading({ content: 'Adicionando membro externo...', key: 'addMember' });
            // Endpoint para criar e associar membro externo
            const payload = { ...values, projectId };
            const response = await axios.post('http://localhost:7777/projects/addExternalMember', payload);
            
            if (response.status === 201) {
                message.success({ content: 'Membro externo adicionado com sucesso!', key: 'addMember' });
                externalForm.resetFields();
                if (refreshData) refreshData();
                close();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Ocorreu um erro.';
            message.error({ content: `Erro: ${errorMessage}`, key: 'addMember' });
        }
    }

    return (
        <ConfigProvider /* Seu tema aqui */ >
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Membro Interno" key="1">
                    <Divider plain>Cadastrar Novo Membro Interno</Divider>
                    <Form form={internalForm} layout="vertical" onFinish={handleAddInternalMember}>
                        <Form.Item
                            label="Nome Completo"
                            name="name"
                            rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                        >
                            <Input placeholder="Nome do novo membro" />
                        </Form.Item>
                        <Form.Item
                            label="Cargo/Posição"
                            name="position"
                            rules={[{ required: true, message: 'Por favor, selecione um cargo!' }]}
                        >
                            <Select placeholder="Selecione o cargo principal do membro">
                                {memberPositions.map(pos => (
                                    <Select.Option key={pos.value} value={pos.value}>{pos.label}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Descrição/Qualificação"
                            name="description"
                        >
                            <TextArea rows={2} placeholder="Breve descrição ou biografia" />
                        </Form.Item>
                        <Form.Item
                            label="URL da Foto de Perfil"
                            name="profile_pic"
                        >
                            <Input placeholder="https://exemplo.com/foto.png" />
                        </Form.Item>
                        <Form.Item style={{ display: 'flex', justifyContent: 'end', marginTop: 24 }}>
                            <Button onClick={close} style={{ marginRight: 8 }}>Cancelar</Button>
                            <Button type="primary" htmlType="submit">Adicionar Membro</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                
                <TabPane tab="Membro Externo" key="2">
                    <Divider plain>Cadastrar Novo Membro Externo</Divider>
                    <Form form={externalForm} layout="vertical" onFinish={handleAddExternalMember}>
                        <Form.Item name="name" label="Nome Completo" rules={[{ required: true }]}>
                            <Input placeholder="Nome do membro externo" />
                        </Form.Item>
                        <Form.Item name="institution" label="Instituição" rules={[{ required: true }]}>
                            <Input placeholder="Ex: Universidade de São Paulo" />
                        </Form.Item>
                        <Form.Item name="cpf" label="CPF (Opcional)">
                            <Input placeholder="CPF do membro" />
                        </Form.Item>
                        <Form.Item name="country" label="País">
                            <Input placeholder="País de origem" />
                        </Form.Item>
                        <Form.Item name="description" label="Descrição/Qualificação">
                            <TextArea rows={2} placeholder="Breve descrição das qualificações do membro" />
                        </Form.Item>
                        <Form.Item style={{ display: 'flex', justifyContent: 'end', marginTop: 24 }}>
                            <Button onClick={close} style={{ marginRight: 8 }}>Cancelar</Button>
                            <Button type="primary" htmlType="submit">Adicionar Membro</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </ConfigProvider>
    );
}