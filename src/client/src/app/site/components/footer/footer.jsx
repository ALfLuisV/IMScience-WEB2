"use client"
import React from 'react';
import { Layout, Menu, theme, Breadcrumb, } from 'antd';
import './style/team.css'
const { Footer } = Layout;
import { Typography } from 'antd';
import { IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react';

const { Title } = Typography;


export default function FooterHP() {
    return (
        <Layout>
            <Footer
                style={{
                    textAlign: 'center',
                    height: '15rem',
                    backgroundColor: '#000000',
                    paddingLeft: '0px',
                    paddingRight: '0px',
                    paddingTop: '20px',
                    paddingBottom: '5px'
                }}
                // className='footerrrr'
                >
                <div className='footerContent'>
                    <div className='infoDiv'>
                        <div className=''>
                            <img src='/imscience_logo.jpeg' alt="Imscience Logo" className='w-[200px] h-[110px] mr-3' />
                        </div>
                        <div className='contactDiv'>
                            <div className='infoComponent' style={{ width: '350px' }}>
                                <Title level={4} style={{ color: '#fafafa' }}>Endereço:</Title>
                                <Title level={5} style={{ color: '#fafafa', marginTop: '10px' }}>Computer Science Department, Av. Dom José Gaspar, 500 - Coração Eucarístico - BH/MG/Brazil - CEP: 30535-901</Title>
                            </div>
                            <div className='infoComponent' style={{ width: '250px' }}>
                                <Title level={4} style={{ color: '#fafafa' }}>Contato:</Title>
                                <Title level={5} style={{ color: '#fafafa', marginBottom: '4px', marginTop: '10px' }}>+55(31)3319–4613</Title>
                                <Title level={5} style={{ color: '#fafafa', marginTop: '0px' }}>sjamil@pucminas.br</Title>
                            </div>
                            <div className='infoComponent' style={{ width: '160px' }}>
                                <Title level={4} style={{ color: '#fafafa' }}>Redes Sociais:</Title>
                                <div className='flex'>
                                    <a href='https://www.instagram.com/imscience_lab/'>
                                        <IconBrandInstagram stroke={1.5} style={{ color: '#fafafa', width: '39px', height: '39px' }} />
                                    </a>
                                    <a href='https://br.linkedin.com/company/imsciencelab'>
                                        <IconBrandLinkedin stroke={1.5} style={{ color: '#fafafa', width: '35px', height: '35px', marginTop: '2px' }} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-[10px]'>
                        <Title level={4} style={{ color: '#fafafa' }}>Apoio:</Title>
                        <div className='flex justify-center'>
                            <img src='/logo-puc-minasss.png' alt="Imscience Logo" style={{ width: '50px', height: '50px', marginRight: '15px', marginLeft: '15px' }} />
                            <img src='/logo-horizontal-capes.png' alt="Imscience Logo" style={{ width: '130px', height: '40px', marginRight: '15px' }} />
                            <img src='/cnpq-logo.png' alt="Imscience Logo" style={{ width: '130px', height: '50px', marginRight: '15px' }} />
                            <img src='/fapemig-logo.png' alt="Imscience Logo" style={{ width: '60px', height: '40px', marginRight: '15px' }} />
                        </div>
                    </div>
                </div>
            </Footer>
        </Layout>
    );

}