"use client"
import React, { useState } from 'react';
import { Layout, ConfigProvider } from 'antd';
import MenuComponent from '../menu/page';

const LayoutApp = ({ children }) => {
    const { Content, Sider } = Layout;
    const [collapsed, setCollapsed] = useState(true);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        siderBg: '#156D86',
                        triggerBg: '#000000'
                    },
                },
            }}
        >
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                    <MenuComponent collapsed={collapsed} setCollapsed={setCollapsed} />
                </Sider>
                <Content style={{ margin: '0 16px' }}>
                    {children}
                </Content>
            </Layout>
        </ConfigProvider>
    )
}

export default LayoutApp;
