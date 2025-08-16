"use client"

import React from 'react';
import { Layout, Menu, ConfigProvider } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import './style/header.css'

export default function HeaderHP() {

  const { Header: AntdHeader } = Layout;


  const routes = {
    '1': '/',
    '2': '/members',
    '3': '/events',
    '4': '/projects',
    '5': '/codes',
    '6': '/venues',
    '7': '/publications',
    '8': '/opportunities',
    '9': '/tech-talks',
    '10': '/aboutus',
    '11': '/research',
    '12' : '/painelAdmin',
  };

  // const handleMenuClick = (e) => {
  //   const route = routes[e.key];
  //   if (route) router.push(route)
  // };

  const items = [
    { key: '1', 
      label: (
        <a href="/" rel="noopener noreferrer">
          Home
        </a>
      ) },
    { key: '2', 
      label: (
        <a href="/members" rel="noopener noreferrer">
          Team
        </a>
      ) },
    { key: '3', 
      label: (
        <a href="/eventsView" rel="noopener noreferrer">
          Events
        </a>
      ) },
    { key: '4', 
      label: (
        <a href="/projects" rel="noopener noreferrer">
          Projects
        </a>
      ) },
    { key: '5', 
      label: (
        <a href="/codes" rel="noopener noreferrer">
          Codes
        </a>
      ) },
    { key: '6', 
      label: (
        <a href="/venues" rel="noopener noreferrer">
          Venues
        </a>
      ) },
    { key: '7', 
      label: (
      <a href="/publications" rel="noopener noreferrer">
        Publications
      </a>
    ) },
    { key: '8', 
      label: (
        <a href="/Opportunities" rel="noopener noreferrer">
          Opportunities
        </a>
      ) },
    { key: '9', 
      label: (
        <a href="/techTalks" rel="noopener noreferrer">
          Tech Talks
        </a>
      )  },
    { key: '10', 
      label: (
        <a href="/aboutUs" rel="noopener noreferrer">
          About Us
        </a>
      )  },
    { key: '11', 
      label: (
        <a href="/research" rel="noopener noreferrer">
          Research
        </a>
      )  },
    { key: '12',
      label: (
        <a href="/painelAdmin" rel="noopener noreferrer">
          Admin Panel
        </a>
      )  },
  ];

  const pathname = usePathname();
  
  const selectedKey = Object.keys(routes).find(
    (key) => routes[key] === pathname
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#156D86',
        },
      }}
    >
      <Layout>
        <AntdHeader className="custom-header">
          <div className="logo">
            <img src='/imscience_logo.jpeg' alt="Imscience Logo" style={{ width: '150px' }} />
          </div>
          <Menu
            mode="horizontal"
            selectedKeys={[selectedKey]}
            items={items}
            className="custom-menu"/>
        </AntdHeader>
      </Layout>
    </ConfigProvider>
  );
};

