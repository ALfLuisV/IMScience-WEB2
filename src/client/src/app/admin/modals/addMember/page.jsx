"use client";
import React, { useRef, useEffect, useState } from 'react';
import {
    SearchOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    UploadOutlined
} from '@ant-design/icons';
import {
    Button,
    Input,
    Space,
    Select,
    Typography,
    Radio,
    ConfigProvider,
    Divider,
    Form,
    Upload,
    Alert
} from 'antd';
import NumericInput from '../../components/inputs/numericInputs/page';
const { TextArea } = Input;
import axios from 'axios';

export default function AddMemberModal({ close }) {
    const [internalForm] = Form.useForm();
    const [externalForm] = Form.useForm();
    const [memberType, setMemberType] = useState('internal');
    const [countryList, setCountryList] = useState([]);

    // Separar os useWatch para cada formulário
    const internalValues = Form.useWatch([], internalForm);
    const externalValues = Form.useWatch([], externalForm);
    const values = memberType === 'internal' ? internalValues : externalValues;

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            window?.antd?.message?.error?.('Apenas arquivos de imagem são permitidos!');
        }
        return isImage || Upload.LIST_IGNORE;
    };

    async function getCountries() {
        try {
            let response = await axios.get('https://restcountries.com/v3.1/all?fields=name');
            let filteredResponse = response.data.map((c) => { return { value: c.name.common, label: c.name.common } });
            setCountryList(filteredResponse)
        } catch (error) {
            alert('Não foi possivel buscar os paises: ' + error.message);
        }
    }


    async function addMember(member) {
        try {
            if (!member) {
                console.error('No member data provided');
                return;
            }

            const formData = new FormData();

            // Adiciona os campos do membro ao formData
            for (const key in member) {
                if (key !== 'profile_pic' && member[key] !== undefined && member[key] !== null) {
                    formData.append(key, member[key]);
                }
            }

            // Handle the file upload
            if (member.profile_pic && Array.isArray(member.profile_pic) && member.profile_pic.length > 0) {
                console.log('Processing profile_pic array:', member.profile_pic);
                const file = member.profile_pic[0];
                if (file.originFileObj) {
                    formData.append('profile_pic', file.originFileObj);
                } else if (file instanceof File) {
                    formData.append('profile_pic', file);
                }
            }

            formData.append('type', memberType)

            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            let addNewMember = await axios.post(
                'http://localhost:7777/members/addMember',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            console.log('Member added successfully:', addNewMember.data);
            // close(); // Fecha o modal após sucesso

        } catch (error) {
            console.error('Error adding member:', error);
            alert('Error adding member: ' + error.message);
        }
    }


    useEffect(() => {
        if (memberType === 'external' && countryList.length === 0) getCountries();
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
            <div>
                <div id='radioDiv'>
                    <Radio.Group
                        value={memberType}
                        options={[
                            { value: 'internal', label: 'Internal' },
                            { value: 'external', label: 'External' },
                        ]}
                        onChange={(e) => {
                            setMemberType(e.target.value); internalForm.resetFields();
                            externalForm.resetFields();
                        }}
                    />
                </div>
                <Divider orientation="left" plain></Divider>
                <div id='internalFormDiv' style={{ display: memberType === 'internal' ? 'block' : 'none' }}>
                    <Form form={internalForm} layout="vertical" variant='filled' wrapperCol={{ offset: 2, span: 22 }}>
                        <Form.Item
                            label="Member name"
                            name="name"
                            rules={[{ required: true, message: 'Please input member username!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Member position"
                            name="position"
                            rules={[{ required: true, message: 'Please input member position!' }]}
                        >
                            <Select>
                                <Select.Option value="professor">Professor</Select.Option>
                                <Select.Option value="phd_student">PhD Student</Select.Option>
                                <Select.Option value="msc_student">MsC Student</Select.Option>
                                <Select.Option value="undergrade_student">Undergrade Student</Select.Option>
                                <Select.Option value="volunteer">Volunteer</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Description" name="description" >
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item name="profile_pic" valuePropName="fileList" getValueFromEvent={(e) => {
                            console.log('getValueFromEvent:', e);
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e && e.fileList;
                        }}>
                            <Upload
                                maxCount={1}
                                beforeUpload={beforeUpload}
                                accept="image/*"
                            >
                                <Button icon={<UploadOutlined />}>Upload profile pic</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </div>
                <div id='externalFormDiv' style={{ display: memberType === 'external' ? 'block' : 'none' }}>
                    <Form form={externalForm} layout="vertical" variant='filled' wrapperCol={{ offset: 2, span: 22 }}>
                        <Form.Item label="Member name" name="name" rules={[{ required: true, message: 'Please input member name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Member country" name="country" rules={[{ required: true, message: 'Please input member country!' }]} >
                            <Select showSearch placeholder="Select a country"
                                filterOption={(input, option) => {
                                    var _a;
                                    return (
                                        (_a = option === null || option === void 0 ? void 0 : option.label) !== null &&
                                            _a !== void 0
                                            ? _a
                                            : ''
                                    )
                                        .toLowerCase()
                                        .includes(input.toLowerCase());
                                }}
                                options={countryList}
                            />
                        </Form.Item>
                        {values?.country === 'Brazil' && (
                            <Form.Item label="Member cpf" name="cpf">
                                <NumericInput />
                            </Form.Item>
                        )}
                        <Form.Item label="Member institution" name="institution" rules={[{ required: true, message: 'Please input member institution!' }]} >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Description" name="description" >
                            <TextArea rows={4} />
                        </Form.Item>
                    </Form>
                </div>
                <Divider orientation="left" plain></Divider>
                <Form.Item style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'end' }}>
                    <Button key="back" type="primary" danger onClick={(e) => { close() }}>
                        Cancel
                    </Button>
                    <Button key="add"
                        style={{ marginLeft: '10px' }}
                        type="primary"
                        onClick={(e) => {
                            if (values) {
                                addMember(values);
                            } else {
                                alert('No form values to submit');
                            }
                        }}
                    >
                        Add Member
                    </Button>
                </Form.Item>
            </div>
        </ConfigProvider>
    );
}
