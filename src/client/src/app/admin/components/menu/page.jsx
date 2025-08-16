"use client";
import React from 'react';
import '@ant-design/v5-patch-for-react-19';
import {
    IconNews,
    IconMailbox,
    IconAppWindow,
    IconUsersGroup,
    IconArticle,
    IconUserCog,
    IconSparkles,
    IconFileSearch,
    IconCalendarEvent,
    IconEdit
} from '@tabler/icons-react';
import { Menu, ConfigProvider, Typography, Button } from 'antd';
import IMSciencelogo from '../../../../../public/imscience_logo.jpeg';
import userlogo from '../../../../../public/user.png';
const items = [
    {
        key: '1',
        icon: <IconEdit stroke={1.25} />,
        label: 'Management',
        children: [
            { key: '10', icon: <IconArticle stroke={1.25} />, label: 'Articles' },
            { key: '61', icon: <IconCalendarEvent stroke={1.25} />, label: 'Events' },
            { key: '7', icon: <IconUsersGroup stroke={1.25} />, label: 'Members' },
            { key: '8', icon: <IconFileSearch stroke={1.25} />, label: 'Projects' },
        ],
    },
    {
        key: '2',
        icon: <IconNews stroke={1.25} />,
        label: 'News',
        children: [
            { key: '5', icon: <IconAppWindow stroke={1.25} />, label: 'Site news' },
            { key: '6', icon: <IconMailbox stroke={1.25} />, label: 'Newsletter' },
        ],
    },
    {
        key: '3',
        icon: <IconSparkles stroke={1.25} />,
        label: 'Highlights'
    },
    {
        key: 'sub1',
        label: 'Users',
        icon: <IconUserCog stroke={1.25} />,
    },
];

export default function MenuComponent({ collapsed, setCollapsed }) {

    let collapsedSize = collapsed ? '40px' : '50px';
    const { Title, Text } = Typography;

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        darkSubMenuItemBg: '#156D86',
                        darkPopupBg: '#156D86',
                        darkItemColor: '#ffffff',
                        collapsedIconSize: 27,
                        darkItemHoverBg: '#5b9cadbb',
                    },
                },
            }}
        >
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <img src={IMSciencelogo.src} alt='im_logo' />
                    <Menu
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        items={items}
                        style={{ backgroundColor: '#156D86', }}
                    />
                </div>
                {!collapsed ? (
                    <div className='userDiv' style={{ width: '185px', marginBottom: '10px', marginLeft: '5px', display: "flex" }}>

                        <Button type="text" style={{ width: '185px', height: '55px', borderRadius: '30px', justifyItems: 'flex-start' }}>
                            <img src={userlogo.src} alt='user_logo' style={{ width: '50px' }} />
                            <div style={{ alignItems: 'center', textAlign: 'initial', marginRight: '20px' }}>
                                <Title level={5} style={{ color: '#ffffff', marginBottom: '0px' }}>Nome usuário</Title>
                                <Text style={{ color: '#ffffff' }}>Admin</Text>
                            </div>
                        </Button>
                    </div>) : (
                        <div className='userDiv' style={{ marginBottom: '10px', marginLeft: '13px', display: "flex" }}>
                            <img src={userlogo.src} alt='user_logo' style={{ width: '50px' }} />
                        </div>
                )}
            </div>
        </ConfigProvider>
    );
}
