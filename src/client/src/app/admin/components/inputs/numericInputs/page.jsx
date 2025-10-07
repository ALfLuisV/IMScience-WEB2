"use client"
import React from "react";
import { Input } from 'antd';

function NumericInput({ value = '', onChange }) {
    
    const handleChange = (e) => {
        const inputValue = e.target.value;
        const reg = /^-?\d*(\.?\d*)?$/;
        if (reg.test(inputValue) || inputValue === '') {
            onChange(inputValue);
        }
    };

    return (
        <Input
            placeholder="Digite apenas números"
            value={value} 
            onChange={handleChange} 
        />
    );
}

export default NumericInput;