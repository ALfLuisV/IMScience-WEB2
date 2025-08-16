"use client"
import '@ant-design/v5-patch-for-react-19';
import axios from 'axios';
import { redirect, RedirectType, useRouter } from 'next/navigation'
import { useEffect, useState, React } from "react";
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import { Input, Typography, Radio, Button } from 'antd';
const { Title, Text } = Typography;
import { auth } from '../../../Auth/firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
axios.defaults.withCredentials = true;

export default function loginPage() {

    const [userCredentials, setUserCredentials] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();


    async function verifyLogin() {
            let isLogged = localStorage.getItem('isLogged');
            if(isLogged){
                router.push('/home');
            }
    }

    async function login(email, password) {
        if (validateEmail(email)) {
            console.log("executando requisição teste 1");
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    userCredential.user.getIdToken()
                        .then((token) => {
                            let logged = sendTokenToAuth(token);
                            if(logged){
                                router.push('/home');
                                 localStorage.setItem('isLogged', true);
                            }
                        })
                })
                .catch((error) => {
                    alert("Usuário não Logado")
                });
        } else {
            alert("Email inválido");
        }
    }


    async function sendTokenToAuth(token) {
        try {
            const response = await axios.post('http://localhost:7777/login', {
                token: token,
                rememberMe: rememberMe
            }, {
                withCredentials: true // IMPORTANTE: Para enviar/receber cookies
            });

            if(response.status === 200){
                return true
            } 
            return false;
        } catch (error) {
            console.error('Erro ao enviar token:', error);
            alert('Erro de conexão com o servidor');
        }
    }


    async function resetPassword(email) {

        try {
            const response = await axios.get('http://localhost:7777/user/getUserInfo', {
                withCredentials: true // IMPORTANTE: Para enviar/receber cookies
            })

            console.log('Resposta da API:', response.data);


        } catch (error) {
            console.error('Erro ao enviar token:', error);
            alert('Erro de conexão com o servidor');
            if (error.status === 401) {
                redirect('/', RedirectType.replace);
            }
        }

        // sendPasswordResetEmail(auth, email)
        //     .then(() => {
        //         alert("Email de recuperação de senha enviado!!!");
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //     });
    }

    function validateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    useEffect(() => {
        (async () => {
            await verifyLogin();
        })();
    }, []);

    return (
        <>
            <div className="flex items-center justify-center flex-nowrap bg-[#156D86] h-full">
                <div id="loginForm" className='w-[400px] h-[450px] bg-[#f2f2f2] flex flex-col items-center justify-center p-8 rounded-md shadow-2xl'>
                    <div id='loginText' className='mb-[50px]'>
                        <Title level={1} style={{ color: '#156D86', marginBottom: "0px" }}>Bem vindo!</Title>
                        <Text style={{ color: '#999999' }}>Insira suas credenciais de acesso</Text>
                    </div>
                    <div className='flex flex-col items-center justify-center w-[385px] gap-3 mb-1'>
                        <Input placeholder="User email"
                            prefix={<UserOutlined />}
                            className='w-4/5'
                            onChange={e => {
                                setUserCredentials({
                                    email: e.target.value,
                                    password: userCredentials?.password || "",
                                });
                            }}
                        />
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="User password"
                            className='w-4/5'
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            onChange={e => {
                                setUserCredentials({
                                    email: userCredentials?.email || "",
                                    password: e.target.value
                                });
                            }}
                        />
                    </div>
                    <div id='loginOptions' className='flex justify-between w-[308px] items-center mb-8'>
                        <Radio style={{ color: '#999999' }}
                            onChange={(e) => {
                                setRememberMe(!rememberMe);
                            }}>Remember me</Radio>
                        <Button type="link"
                            className='p-0'
                            onClick={(e) => {
                                // resetPassword(userCredentials.email);
                                resetPassword();
                            }}>Forgot my password</Button>
                    </div>
                    <Button
                        type="primary"
                        className='bg-[#156D86] w-[280px]'
                        onClick={(e) => {
                            login(userCredentials.email, userCredentials.password);
                        }}>Logar</Button>
                </div>
            </div>
        </>
    )
}