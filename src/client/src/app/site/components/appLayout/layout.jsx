'use client'

import React from 'react';
import { Layout } from 'antd';
import HeaderPH from '../header/header';
import FooterPH from '../footer/footer';

const LayoutApp = ({ children }) => {
    const { Header, Footer, Content } = Layout;
    
    return( 
        <Layout style={{ minHeight: '100vh'}}>
            <Header style={{ padding: '0px', height: '6rem' }}>
                <HeaderPH/>
            </Header>

            <Content>
                {children}
            </Content>

            <Footer style={{ padding: '0px', height: '15rem' }}>
                <FooterPH/>
            </Footer>
        </Layout>
    )
}

export default LayoutApp;
