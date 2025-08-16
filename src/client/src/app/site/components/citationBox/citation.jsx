'use client'

import { useEffect, useState } from "react";
import { Card, Typography, Button } from 'antd';
import { IconFileText, IconQuote } from '@tabler/icons-react';
import '@ant-design/v5-patch-for-react-19';

const { Title, Paragraph, Text } = Typography;

export default function citation(text) {



    return (
        <>
            <div>
                <div id="tittle">
                    <Title level={5} style={{ color: '#156D86' }}>Cite Article</Title>
                </div>
                <div id='cittaionArea' className="bg-customGrey pr-10 pl-4 pt-4 pb-10 rounded-md">
                    {text.text}
                </div>
            </div>
        </>
    )
}