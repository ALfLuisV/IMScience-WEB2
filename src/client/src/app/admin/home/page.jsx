"use client"
import { useEffect, useState, Suspense } from "react";
import axios from 'axios';
export default function loginPage() {

    const [userCredentials, setUserCredentials] = useState(null);

    async function getUserInformation() {
        try {
            const response = await axios.get('http://localhost:7777/user/getUserInfo', {
                rememberMe: true
            }, {
                withCredentials: true // IMPORTANTE: Para enviar/receber cookies
            });

            console.log(response.data);
        } catch (error) {
            console.error('Erro ao enviar token:', error);
            alert('Erro de conexão com o servidor');
        }
    }

    

    useEffect(() => {
            // getUserInformation();
        }, []);
    

    return (
        <>
            <p1>Voce está logado</p1>
        </>
    )
}