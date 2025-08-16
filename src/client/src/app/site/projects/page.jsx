"use client"

import { useEffect, useState, Suspense } from "react";
import { Card, Typography, Button, Divider, Carousel, ConfigProvider, Input, Select, Modal, Slider } from 'antd';
import { IconFileText, IconQuote, IconExternalLink, IconCopy } from '@tabler/icons-react';
import '@ant-design/v5-patch-for-react-19';
import userImage from '../../../public/user.png'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import style from './style/projects.module.css'
import ModalCitation from '@/app/site/components/citationBox/citation'

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;


export default function projects() {
    const [recentArticles, setRecentArticles] = useState(null)
    const [allArticles, setAllArticles] = useState(null)
    const [projectBackup, setPorjectBackup] = useState(null)
    const [slideSearch, setSlideSearch] = useState(null)
    const [selectList, setSelectList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copyButtonText, setCopyButtonText] = useState('Copy')
    const [enableCopyButton, setEnableCopyButton] = useState(false)
    const [citationText, setCitationText] = useState('')

    const searchParams = useSearchParams()

    //este array é a base para todo o processamento dos dados, a partir dele serão gerados todos os 
    // cards e etc, os dados puxados do bd, devem possuir este formato
    const projects = [
        {
            label: "Introduzindo teoria dos grafos no processamento de imagens",
            value: "1",
            conferencia: "Conferência Internacional de Processamento de Imagens",
            dataConferencia: "2023-11-15",
            local: "São Paulo, Brasil",
            img: '/imgGrafo.jpg',
            link: "https://www.google.com",
            keywords: ["grafos", "processamento de imagens", "teoria dos grafos"],
            abstract: "Este trabalho aborda a aplicação da teoria dos grafos no processamento de imagens, destacando segmentação, detecção, reconhecimento e soluções híbridas com avanços em visão computacional.",
            doi: '10.1109/ISSREW55968.2022.00071',
            authors: [
                {
                    nome: "Maria Silva",
                    role: "Pesquisador(a)",
                    description: "Maria Silva é doutoranda em inteligência artificial aplicada à linguística. Seu trabalho foca no desenvolvimento de assistentes virtuais que melhoram a comunicação humana. Maria é uma entusiasta da interseção entre tecnologia e linguagem e já publicou artigos em conferências renomadas. Ela também é ativa em comunidades de código aberto, contribuindo para projetos voltados à educação. Sua paixão é tornar a tecnologia mais intuitiva e acessível.",
                    profilePic: userImage,
                    id: '6',
                    entryDate: "11/02/2016",
                },
                {
                    nome: "Ricardo Lopes",
                    role: "Orientador",
                    description: "Ricardo Lopes é professor com foco em inteligência artificial para diagnósticos médicos. Ele trabalha em projetos que buscam automatizar a análise de exames complexos. Ricardo colabora com hospitais e laboratórios para validar suas pesquisas. Além disso, é mentor de estudantes interessados em saúde digital. Ele acredita que a tecnologia deve sempre buscar melhorar a qualidade de vida das pessoas.",
                    profilePic: userImage,
                    id: '13',
                    entryDate: "09/08/2019",
                },
                {
                    nome: "Paula Castro",
                    role: "Pesquisador(a)",
                    description: "Paula Castro é doutoranda em blockchain e segurança de dados. Sua pesquisa busca integrar tecnologias de segurança em sistemas descentralizados. Paula já publicou artigos em conferências de segurança cibernética e é reconhecida por sua criatividade. Ela também organiza eventos para popularizar o uso ético da tecnologia blockchain. Em seu tempo livre, gosta de explorar novos conceitos na área de computação quântica.",
                    profilePic: userImage,
                    id: '14',
                    entryDate: "25/07/2022",
                },
                {
                    nome: "Tiago Oliveira",
                    role: "Pesquisador(a)",
                    description: "Tiago Oliveira é mestrando em computação e desenvolve algoritmos para otimizar operações logísticas. Seu trabalho ajuda empresas a planejar rotas e reduzir custos operacionais. Tiago já recebeu prêmios por sua pesquisa e inovação tecnológica. Ele também se dedica a ensinar técnicas de programação para iniciantes. Fora da academia, Tiago gosta de explorar soluções tecnológicas para mobilidade urbana.",
                    profilePic: userImage,
                    id: '15',
                    entryDate: "11/01/2023",
                },
                {
                    nome: "Isabela Martins",
                    role: "Bolsista",
                    description: "Isabela Martins é estudante de graduação com interesse em inteligência artificial aplicada à educação. Ela desenvolve ferramentas que ajudam estudantes a aprender de maneira personalizada. Isabela já participou de hackathons e ganhou prêmios por sua inovação. Em sua universidade, ela é uma das líderes de um grupo de estudos sobre tecnologia educacional. Fora dos estudos, gosta de criar conteúdo educativo para redes sociais.",
                    profilePic: userImage,
                    id: '16',
                    entryDate: "19/03/2020",
                },
                {
                    nome: "Victor Teixeira",
                    role: "Coorientador",
                    description: "Victor Teixeira é um especialista em sistemas distribuídos e computação em nuvem. Ele lidera projetos que buscam aumentar a eficiência de processamento em redes complexas. Victor é autor de diversos artigos acadêmicos e frequentemente ministra palestras em eventos internacionais. Ele acredita que a computação em nuvem é essencial para o futuro da tecnologia. Em seu tempo livre, ele participa de iniciativas que promovem a inclusão digital.",
                    profilePic: userImage,
                    id: '17',
                    entryDate: "27/05/2018",
                }
            ]
        },
        {
            label: "Utilizando IA generativa na recuperação hormonal",
            value: "2",
            conferencia: "Simpósio de Inteligência Artificial em Saúde",
            dataConferencia: "2023-09-20",
            local: "Lisboa, Portugal",
            img: '/grafoInterativo.jpg',
            link: "https://www.google.com",
            keywords: ["IA generativa", "recuperação hormonal", "saúde"],
            abstract: "Investigação sobre o uso de IA generativa para otimizar protocolos de recuperação hormonal em terapias personalizadas.",
            doi: '10.1109/ISSREW55968.2022.00071',
            authors: [
                {
                    nome: "Ana Ribeiro",
                    role: "Pesquisador(a)",
                    description: "Ana Ribeiro é doutoranda em computação e desenvolve sistemas que melhoram a eficiência energética em dispositivos IoT. Sua pesquisa já foi apresentada em importantes conferências internacionais. Ana também colabora com startups para integrar tecnologia sustentável em produtos do mercado. Em seu tempo livre, ela organiza eventos de divulgação científica para inspirar jovens a entrarem no mundo da tecnologia. Sua dedicação é reconhecida tanto dentro quanto fora do meio acadêmico.",
                    profilePic: userImage,
                    id: '2',
                    entryDate: "28/06/2024",
                },
                {
                    nome: "Pedro Costa",
                    role: "Orientador",
                    description: "Pedro Costa é professor e pesquisador dedicado à modelagem matemática em sistemas complexos. Ele aplica seus conhecimentos para resolver problemas na engenharia e no meio ambiente. Pedro orienta estudantes em projetos inovadores e promove workshops para disseminar conhecimento. Seus interesses acadêmicos incluem otimização e análise preditiva. Fora da universidade, ele gosta de participar de eventos sobre tecnologia e sustentabilidade.",
                    profilePic: userImage,
                    id: '5',
                    entryDate: "23/09/2021",
                },
                {
                    nome: "Juliana Mendes",
                    role: "Bolsista",
                    description: "Juliana Mendes é estudante de graduação interessada em ciência de dados e big data. Ela trabalha em projetos que analisam grandes volumes de dados para prever tendências. Juliana é conhecida por sua curiosidade e vontade de aprender, sendo destaque em sua turma. Ela também participa de grupos de estudos sobre inteligência artificial aplicada. Fora da faculdade, gosta de criar visualizações de dados interativas para plataformas online.",
                    profilePic: userImage,
                    id: '8',
                    entryDate: "18/11/2017",
                },
                {
                    nome: "Lara Nunes",
                    role: "Bolsista",
                    description: "Lara Nunes é estudante de graduação fascinada pelo design e desenvolvimento de jogos digitais. Ela já criou protótipos de jogos interativos e participa de competições de game design. Lara acredita que jogos podem ser uma poderosa ferramenta educacional e de inclusão. Em sua universidade, colabora com colegas para criar experiências imersivas e inovadoras. Fora dos estudos, gosta de explorar novas tecnologias gráficas e motores de jogos.",
                    profilePic: userImage,
                    id: '12',
                    entryDate: "03/12/2020",
                },
                {
                    nome: "Tiago Oliveira",
                    role: "Pesquisador(a)",
                    description: "Tiago Oliveira é mestrando em computação e desenvolve algoritmos para otimizar operações logísticas. Seu trabalho ajuda empresas a planejar rotas e reduzir custos operacionais. Tiago já recebeu prêmios por sua pesquisa e inovação tecnológica. Ele também se dedica a ensinar técnicas de programação para iniciantes. Fora da academia, Tiago gosta de explorar soluções tecnológicas para mobilidade urbana.",
                    profilePic: userImage,
                    id: '15',
                    entryDate: "11/01/2023",
                },
                {
                    nome: "Camila Farias",
                    role: "Pesquisador(a)",
                    description: "Camila Farias é doutoranda em estatística aplicada, com foco em métodos avançados de análise de dados. Sua pesquisa busca criar modelos preditivos que possam ser aplicados a problemas reais, como previsão de doenças. Camila já recebeu prêmios por sua abordagem inovadora e é uma defensora do uso ético da ciência de dados. Fora do meio acadêmico, ela organiza eventos para capacitar jovens na área de dados.",
                    profilePic: userImage,
                    id: '18',
                    entryDate: "12/09/2021",
                }
            ]
        },
        {
            label: "Análise de redes sociais utilizando grafos",
            value: "3",
            conferencia: "Workshop de Análise de Redes Sociais",
            dataConferencia: "2024-02-10",
            local: "Nova York, EUA",
            img: '/redesSociaisGrafos.png',
            link: "https://www.google.com",
            keywords: ["redes sociais", "análise de dados", "teoria dos grafos"],
            abstract: "Discussão sobre a aplicação de grafos para analisar interações e padrões em redes sociais.",
            doi: '10.1109/ISSREW55968.2022.00071',
            authors: [
                {
                    nome: "Carla Ferreira",
                    role: "Bolsista",
                    description: "Carla Ferreira é estudante de graduação apaixonada por design de interfaces e experiência do usuário. Ela já participou de competições estudantis, onde apresentou projetos de aplicativos para inclusão digital. Seu foco é criar soluções acessíveis que possam transformar vidas. Carla é membro de um grupo de estudos sobre acessibilidade digital e colabora com ONGs locais. Ela acredita que tecnologia e inclusão devem caminhar juntas.",
                    profilePic: userImage,
                    id: '4',
                    entryDate: "14/07/2022",
                },
                {
                    nome: "Pedro Costa",
                    role: "Orientador",
                    description: "Pedro Costa é professor e pesquisador dedicado à modelagem matemática em sistemas complexos. Ele aplica seus conhecimentos para resolver problemas na engenharia e no meio ambiente. Pedro orienta estudantes em projetos inovadores e promove workshops para disseminar conhecimento. Seus interesses acadêmicos incluem otimização e análise preditiva. Fora da universidade, ele gosta de participar de eventos sobre tecnologia e sustentabilidade.",
                    profilePic: userImage,
                    id: '5',
                    entryDate: "23/09/2021",
                },
                {
                    nome: "Beatriz Souza",
                    role: "Pesquisador(a)",
                    description: "Beatriz Souza é doutoranda em visão computacional aplicada à robótica autônoma. Sua pesquisa explora formas de tornar os robôs mais conscientes de seu ambiente. Beatriz já participou de projetos interdisciplinares envolvendo engenheiros e cientistas de dados. Ela acredita que a robótica pode ser uma ferramenta para melhorar a qualidade de vida das pessoas. Em seu tempo livre, Beatriz participa de eventos de divulgação científica.",
                    profilePic: userImage,
                    id: '10',
                    entryDate: "30/06/2023",
                },
                {
                    nome: "Tiago Oliveira",
                    role: "Pesquisador(a)",
                    description: "Tiago Oliveira é mestrando em computação e desenvolve algoritmos para otimizar operações logísticas. Seu trabalho ajuda empresas a planejar rotas e reduzir custos operacionais. Tiago já recebeu prêmios por sua pesquisa e inovação tecnológica. Ele também se dedica a ensinar técnicas de programação para iniciantes. Fora da academia, Tiago gosta de explorar soluções tecnológicas para mobilidade urbana.",
                    profilePic: userImage,
                    id: '15',
                    entryDate: "11/01/2023",
                }
            ]
        },
        {
            label: "Otimização de rotas de entrega com algoritmos de grafos",
            value: "4",
            conferencia: "Conferência de Logística e Transporte",
            dataConferencia: "2023-08-25",
            local: "Berlim, Alemanha",
            img: '/grafoInterativo.jpg',
            link: "https://www.google.com",
            keywords: ["rotas de entrega", "algoritmos de grafos", "logística"],
            abstract: "Este estudo aborda o uso de algoritmos baseados em grafos para otimizar rotas de entrega, reduzindo custos e melhorando a eficiência.",
            doi: '10.1109/ISSREW55968.2022.00071',
            authors: [
                {
                    nome: "João Almeida",
                    role: "Pesquisador(a)",
                    description: "João Almeida é mestre em computação com foco no desenvolvimento de algoritmos para medicina. Atualmente, ele pesquisa formas de usar redes neurais para diagnosticar doenças raras. Ele acredita no potencial da computação para salvar vidas e trabalha para conectar ciência e saúde. João participa de grupos de pesquisa multidisciplinares que reúnem médicos e engenheiros. Fora do trabalho, gosta de compartilhar seus conhecimentos em workshops e cursos de programação.",
                    profilePic: userImage,
                    id: '3',
                    entryDate: "01/10/2018",
                },
                {
                    nome: "Lucas Lima",
                    role: "Pesquisador(a)",
                    description: "Lucas Lima é mestrando em ciência da computação e trabalha com integração de IoT em ambientes urbanos. Ele desenvolve soluções para cidades inteligentes, combinando eficiência e sustentabilidade. Lucas já apresentou seus projetos em feiras acadêmicas e recebeu prêmios por sua inovação. Além disso, é mentor de estudantes interessados na área de computação. Ele acredita que a tecnologia pode transformar cidades em espaços mais humanos.",
                    profilePic: userImage,
                    id: '7',
                    entryDate: "07/05/2019",
                },
                {
                    nome: "Beatriz Souza",
                    role: "Pesquisador(a)",
                    description: "Beatriz Souza é doutoranda em visão computacional aplicada à robótica autônoma. Sua pesquisa explora formas de tornar os robôs mais conscientes de seu ambiente. Beatriz já participou de projetos interdisciplinares envolvendo engenheiros e cientistas de dados. Ela acredita que a robótica pode ser uma ferramenta para melhorar a qualidade de vida das pessoas. Em seu tempo livre, Beatriz participa de eventos de divulgação científica.",
                    profilePic: userImage,
                    id: '10',
                    entryDate: "30/06/2023",
                },
                {
                    nome: "Fernando Rocha",
                    role: "Pesquisador(a)",
                    description: "Fernando Rocha é mestrando em engenharia computacional, com foco em simulações de estruturas mecânicas. Ele desenvolve modelos que ajudam engenheiros a prever falhas estruturais. Fernando já apresentou seus projetos em conferências de engenharia ao redor do mundo. Ele também é membro ativo de um laboratório de inovação tecnológica em sua universidade. Fora do ambiente acadêmico, gosta de ensinar programação a jovens estudantes.",
                    profilePic: userImage,
                    id: '11',
                    entryDate: "15/04/2021",
                },
                {
                    nome: "Lara Nunes",
                    role: "Bolsista",
                    description: "Lara Nunes é estudante de graduação fascinada pelo design e desenvolvimento de jogos digitais. Ela já criou protótipos de jogos interativos e participa de competições de game design. Lara acredita que jogos podem ser uma poderosa ferramenta educacional e de inclusão. Em sua universidade, colabora com colegas para criar experiências imersivas e inovadoras. Fora dos estudos, gosta de explorar novas tecnologias gráficas e motores de jogos.",
                    profilePic: userImage,
                    id: '12',
                    entryDate: "03/12/2020",
                }
            ]
        },
        {
            label: "Detecção de comunidades em redes complexas",
            value: "5",
            conferencia: "Encontro de Ciência de Redes",
            dataConferencia: "2024-03-05",
            local: "Tóquio, Japão",
            img: '/redesGrafos.png',
            link: "https://www.google.com",
            keywords: ["comunidades", "redes complexas", "teoria dos grafos"],
            abstract: "Teoria dos grafos aplicada ao processamento de imagens melhora segmentação, detecção, reconhecimento e eficiência em visão computacional e inteligência artificial.",
            doi: '10.1109/ISSREW55968.2022.00071',
            authors: [
                {
                    nome: "Marcelo Souza Cunha da Silva",
                    role: "Orientador",
                    description: "Marcelo Souza é um professor com vasta experiência em inteligência artificial e aprendizado de máquina. Ele lidera projetos acadêmicos que conectam ciência e indústria, explorando soluções inovadoras. É autor de diversos artigos publicados em revistas internacionais e mentor de jovens pesquisadores. Marcelo acredita na tecnologia como uma ferramenta poderosa para resolver desafios globais. Seu trabalho também inclui palestras sobre ética e impacto da IA na sociedade.",
                    profilePic: userImage,
                    id: '1',
                    entryDate: "17/03/2020"
                },
                {
                    nome: "Ana Ribeiro",
                    role: "Pesquisador(a)",
                    description: "Ana Ribeiro é doutoranda em computação e desenvolve sistemas que melhoram a eficiência energética em dispositivos IoT. Sua pesquisa já foi apresentada em importantes conferências internacionais. Ana também colabora com startups para integrar tecnologia sustentável em produtos do mercado. Em seu tempo livre, ela organiza eventos de divulgação científica para inspirar jovens a entrarem no mundo da tecnologia. Sua dedicação é reconhecida tanto dentro quanto fora do meio acadêmico.",
                    profilePic: userImage,
                    id: '2',
                    entryDate: "28/06/2024",
                },
                {
                    nome: "Juliana Mendes",
                    role: "Bolsista",
                    description: "Juliana Mendes é estudante de graduação interessada em ciência de dados e big data. Ela trabalha em projetos que analisam grandes volumes de dados para prever tendências. Juliana é conhecida por sua curiosidade e vontade de aprender, sendo destaque em sua turma. Ela também participa de grupos de estudos sobre inteligência artificial aplicada. Fora da faculdade, gosta de criar visualizações de dados interativas para plataformas online.",
                    profilePic: userImage,
                    id: '8',
                    entryDate: "18/11/2017",
                },
                {
                    nome: "Paula Castro",
                    role: "Pesquisador(a)",
                    description: "Paula Castro é doutoranda em blockchain e segurança de dados. Sua pesquisa busca integrar tecnologias de segurança em sistemas descentralizados. Paula já publicou artigos em conferências de segurança cibernética e é reconhecida por sua criatividade. Ela também organiza eventos para popularizar o uso ético da tecnologia blockchain. Em seu tempo livre, gosta de explorar novos conceitos na área de computação quântica.",
                    profilePic: userImage,
                    id: '14',
                    entryDate: "25/07/2022",
                }
            ]
        },
        {
            label: "Aplicação de grafos na bioinformática para análise de sequências genéticas",
            value: "6",
            conferencia: "Congresso de Bioinformática",
            dataConferencia: "2023-10-12",
            local: "Londres, Reino Unido",
            img: '/grafoInterativo.jpg',
            link: "https://www.google.com",
            keywords: ["bioinformática", "grafos", "sequências genéticas"],
            abstract: "Exploração do uso de teoria dos grafos na análise de sequências genéticas para avanços em bioinformática.",
            doi: '10.1109/ISSREW55968.2022.00071',
            authors: [
                {
                    nome: "Maria Silva",
                    role: "Pesquisador(a)",
                    description: "Maria Silva é doutoranda em inteligência artificial aplicada à linguística. Seu trabalho foca no desenvolvimento de assistentes virtuais que melhoram a comunicação humana. Maria é uma entusiasta da interseção entre tecnologia e linguagem e já publicou artigos em conferências renomadas. Ela também é ativa em comunidades de código aberto, contribuindo para projetos voltados à educação. Sua paixão é tornar a tecnologia mais intuitiva e acessível.",
                    profilePic: userImage,
                    id: '6',
                    entryDate: "11/02/2016",
                },
                {
                    nome: "Ricardo Lopes",
                    role: "Orientador",
                    description: "Ricardo Lopes é professor com foco em inteligência artificial para diagnósticos médicos. Ele trabalha em projetos que buscam automatizar a análise de exames complexos. Ricardo colabora com hospitais e laboratórios para validar suas pesquisas. Além disso, é mentor de estudantes interessados em saúde digital. Ele acredita que a tecnologia deve sempre buscar melhorar a qualidade de vida das pessoas.",
                    profilePic: userImage,
                    id: '13',
                    entryDate: "09/08/2019",
                }

        ]
    },
    {
        label: "Modelagem de redes de transporte público usando teoria dos grafos",
        value: "7",
        conferencia: "Fórum de Mobilidade Urbana",
        dataConferencia: "2023-07-30",
        local: "Paris, França",
        img: '/grafoInterativo.jpg',
        link: "https://www.google.com",
        keywords: ["redes de transporte", "mobilidade urbana", "grafos"],
        abstract: "Modelagem e análise de redes de transporte público utilizando técnicas baseadas em grafos para melhorar a eficiência.",
        doi: '10.1109/ISSREW55968.2022.00071',
        authors: [
            {
                nome: "Lucas Lima",
                role: "Pesquisador(a)",
                description: "Lucas Lima é mestrando em ciência da computação e trabalha com integração de IoT em ambientes urbanos. Ele desenvolve soluções para cidades inteligentes, combinando eficiência e sustentabilidade. Lucas já apresentou seus projetos em feiras acadêmicas e recebeu prêmios por sua inovação. Além disso, é mentor de estudantes interessados na área de computação. Ele acredita que a tecnologia pode transformar cidades em espaços mais humanos.",
                profilePic: userImage,
                id: '7',
                entryDate: "07/05/2019",
            },
            {
                nome: "Fernando Rocha",
                role: "Pesquisador(a)",
                description: "Fernando Rocha é mestrando em engenharia computacional, com foco em simulações de estruturas mecânicas. Ele desenvolve modelos que ajudam engenheiros a prever falhas estruturais. Fernando já apresentou seus projetos em conferências de engenharia ao redor do mundo. Ele também é membro ativo de um laboratório de inovação tecnológica em sua universidade. Fora do ambiente acadêmico, gosta de ensinar programação a jovens estudantes.",
                profilePic: userImage,
                id: '11',
                entryDate: "15/04/2021",
            },
            {
                nome: "Ricardo Lopes",
                role: "Orientador",
                description: "Ricardo Lopes é professor com foco em inteligência artificial para diagnósticos médicos. Ele trabalha em projetos que buscam automatizar a análise de exames complexos. Ricardo colabora com hospitais e laboratórios para validar suas pesquisas. Além disso, é mentor de estudantes interessados em saúde digital. Ele acredita que a tecnologia deve sempre buscar melhorar a qualidade de vida das pessoas.",
                profilePic: userImage,
                id: '13',
                entryDate: "09/08/2019",
            },
            {
                nome: "Victor Teixeira",
                role: "Coorientador",
                description: "Victor Teixeira é um especialista em sistemas distribuídos e computação em nuvem. Ele lidera projetos que buscam aumentar a eficiência de processamento em redes complexas. Victor é autor de diversos artigos acadêmicos e frequentemente ministra palestras em eventos internacionais. Ele acredita que a computação em nuvem é essencial para o futuro da tecnologia. Em seu tempo livre, ele participa de iniciativas que promovem a inclusão digital.",
                profilePic: userImage,
                id: '17',
                entryDate: "27/05/2018",
            }
        ]
    },
    {
        label: "Visualização de dados complexos com grafos interativos",
        value: "8",
        conferencia: "Conferência de Visualização de Dados",
        dataConferencia: "2024-04-18",
        local: "San Francisco, EUA",
        img: '/grafoInterativo.jpg',
        link: "https://www.google.com",
        keywords: ["visualização de dados", "grafos interativos", "dados complexos"],
        abstract: "Uso de grafos interativos para representar e compreender grandes conjuntos de dados complexos.",
        doi: '10.1109/ISSREW55968.2022.00071',
        authors: [
            {
                nome: "João Almeida",
                role: "Pesquisador(a)",
                description: "João Almeida é mestre em computação com foco no desenvolvimento de algoritmos para medicina. Atualmente, ele pesquisa formas de usar redes neurais para diagnosticar doenças raras. Ele acredita no potencial da computação para salvar vidas e trabalha para conectar ciência e saúde. João participa de grupos de pesquisa multidisciplinares que reúnem médicos e engenheiros. Fora do trabalho, gosta de compartilhar seus conhecimentos em workshops e cursos de programação.",
                profilePic: userImage,
                id: '3',
                entryDate: "01/10/2018",
            },
            {
                nome: "Carla Ferreira",
                role: "Bolsista",
                description: "Carla Ferreira é estudante de graduação apaixonada por design de interfaces e experiência do usuário. Ela já participou de competições estudantis, onde apresentou projetos de aplicativos para inclusão digital. Seu foco é criar soluções acessíveis que possam transformar vidas. Carla é membro de um grupo de estudos sobre acessibilidade digital e colabora com ONGs locais. Ela acredita que tecnologia e inclusão devem caminhar juntas.",
                profilePic: userImage,
                id: '4',
                entryDate: "14/07/2022",
            },
            {
                nome: "Rafael Santos",
                role: "Orientador",
                description: "Rafael Santos é professor especializado em segurança cibernética e criptografia. Ele lidera projetos que buscam proteger dados sensíveis em redes distribuídas. Rafael já publicou diversos artigos sobre ataques cibernéticos e métodos de mitigação. Ele também organiza eventos para conscientizar empresas sobre a importância da segurança digital. Fora da academia, Rafael atua como consultor para startups na área de cibersegurança.",
                profilePic: userImage,
                id: '9',
                entryDate: "04/09/2020",
            },
            {
                nome: "Fernando Rocha",
                role: "Pesquisador(a)",
                description: "Fernando Rocha é mestrando em engenharia computacional, com foco em simulações de estruturas mecânicas. Ele desenvolve modelos que ajudam engenheiros a prever falhas estruturais. Fernando já apresentou seus projetos em conferências de engenharia ao redor do mundo. Ele também é membro ativo de um laboratório de inovação tecnológica em sua universidade. Fora do ambiente acadêmico, gosta de ensinar programação a jovens estudantes.",
                profilePic: userImage,
                id: '11',
                entryDate: "15/04/2021",
            },
            {
                nome: "Paula Castro",
                role: "Pesquisador(a)",
                description: "Paula Castro é doutoranda em blockchain e segurança de dados. Sua pesquisa busca integrar tecnologias de segurança em sistemas descentralizados. Paula já publicou artigos em conferências de segurança cibernética e é reconhecida por sua criatividade. Ela também organiza eventos para popularizar o uso ético da tecnologia blockchain. Em seu tempo livre, gosta de explorar novos conceitos na área de computação quântica.",
                profilePic: userImage,
                id: '14',
                entryDate: "25/07/2022",
            },
            {
                nome: "Camila Farias",
                role: "Pesquisador(a)",
                description: "Camila Farias é doutoranda em estatística aplicada, com foco em métodos avançados de análise de dados. Sua pesquisa busca criar modelos preditivos que possam ser aplicados a problemas reais, como previsão de doenças. Camila já recebeu prêmios por sua abordagem inovadora e é uma defensora do uso ético da ciência de dados. Fora do meio acadêmico, ela organiza eventos para capacitar jovens na área de dados.",
                profilePic: userImage,
                id: '18',
                entryDate: "12/09/2021",
            }
        ]
    },
    {
        label: "Algoritmos de grafos para recomendação de produtos em e-commerce",
        value: "9",
        conferencia: "Simpósio de Tecnologia para E-commerce",
        dataConferencia: "2020-06-15",
        local: "Hong Kong, China",
        img: '/grafoInterativo.jpg',
        link: "https://www.google.com",
        keywords: ["e-commerce", "recomendação de produtos", "algoritmos de grafos"],
        abstract: "Desenvolvimento de algoritmos de grafos para melhorar sistemas de recomendação em plataformas de e-commerce.",
        doi: '10.1109/ISSREW55968.2022.00071',
        authors: [
            {
                nome: "Ana Ribeiro",
                role: "Pesquisador(a)",
                description: "Ana Ribeiro é doutoranda em computação e desenvolve sistemas que melhoram a eficiência energética em dispositivos IoT. Sua pesquisa já foi apresentada em importantes conferências internacionais. Ana também colabora com startups para integrar tecnologia sustentável em produtos do mercado. Em seu tempo livre, ela organiza eventos de divulgação científica para inspirar jovens a entrarem no mundo da tecnologia. Sua dedicação é reconhecida tanto dentro quanto fora do meio acadêmico.",
                profilePic: userImage,
                id: '2',
                entryDate: "28/06/2024",
            },
            {
                nome: "João Almeida",
                role: "Pesquisador(a)",
                description: "João Almeida é mestre em computação com foco no desenvolvimento de algoritmos para medicina. Atualmente, ele pesquisa formas de usar redes neurais para diagnosticar doenças raras. Ele acredita no potencial da computação para salvar vidas e trabalha para conectar ciência e saúde. João participa de grupos de pesquisa multidisciplinares que reúnem médicos e engenheiros. Fora do trabalho, gosta de compartilhar seus conhecimentos em workshops e cursos de programação.",
                profilePic: userImage,
                id: '3',
                entryDate: "01/10/2018",
            },
            {
                nome: "Fernando Rocha",
                role: "Pesquisador(a)",
                description: "Fernando Rocha é mestrando em engenharia computacional, com foco em simulações de estruturas mecânicas. Ele desenvolve modelos que ajudam engenheiros a prever falhas estruturais. Fernando já apresentou seus projetos em conferências de engenharia ao redor do mundo. Ele também é membro ativo de um laboratório de inovação tecnológica em sua universidade. Fora do ambiente acadêmico, gosta de ensinar programação a jovens estudantes.",
                profilePic: userImage,
                id: '11',
                entryDate: "15/04/2021",
            },
            {
                nome: "Lara Nunes",
                role: "Bolsista",
                description: "Lara Nunes é estudante de graduação fascinada pelo design e desenvolvimento de jogos digitais. Ela já criou protótipos de jogos interativos e participa de competições de game design. Lara acredita que jogos podem ser uma poderosa ferramenta educacional e de inclusão. Em sua universidade, colabora com colegas para criar experiências imersivas e inovadoras. Fora dos estudos, gosta de explorar novas tecnologias gráficas e motores de jogos.",
                profilePic: userImage,
                id: '12',
                entryDate: "03/12/2020",
            },
            {
                nome: "Isabela Martins",
                role: "Bolsista",
                description: "Isabela Martins é estudante de graduação com interesse em inteligência artificial aplicada à educação. Ela desenvolve ferramentas que ajudam estudantes a aprender de maneira personalizada. Isabela já participou de hackathons e ganhou prêmios por sua inovação. Em sua universidade, ela é uma das líderes de um grupo de estudos sobre tecnologia educacional. Fora dos estudos, gosta de criar conteúdo educativo para redes sociais.",
                profilePic: userImage,
                id: '16',
                entryDate: "19/03/2020",
            },
            {
                nome: "Victor Teixeira",
                role: "Orientador",
                description: "Victor Teixeira é um especialista em sistemas distribuídos e computação em nuvem. Ele lidera projetos que buscam aumentar a eficiência de processamento em redes complexas. Victor é autor de diversos artigos acadêmicos e frequentemente ministra palestras em eventos internacionais. Ele acredita que a computação em nuvem é essencial para o futuro da tecnologia. Em seu tempo livre, ele participa de iniciativas que promovem a inclusão digital.",
                profilePic: userImage,
                id: '17',
                entryDate: "27/05/2018",
            }
        ]
    },
    {
        label: "Análise de vulnerabilidades em redes de computadores usando grafos",
        value: "10",
        conferencia: "Conferência de Segurança Cibernética",
        dataConferencia: "2024-05-20",
        local: "Sydney, Austrália",
        img: '/post-redes.png',
        link: "https://www.google.com",
        keywords: ["segurança cibernética", "redes de computadores", "grafos"],
        abstract: "Aplicação de teoria dos grafos para identificar e mitigar vulnerabilidades em redes de computadores.",
        doi: '10.1109/ISSREW55968.2022.00071',
        authors: [
            {
                nome: "Ana Ribeiro",
                role: "Pesquisador(a)",
                description: "Ana Ribeiro é doutoranda em computação e desenvolve sistemas que melhoram a eficiência energética em dispositivos IoT. Sua pesquisa já foi apresentada em importantes conferências internacionais. Ana também colabora com startups para integrar tecnologia sustentável em produtos do mercado. Em seu tempo livre, ela organiza eventos de divulgação científica para inspirar jovens a entrarem no mundo da tecnologia. Sua dedicação é reconhecida tanto dentro quanto fora do meio acadêmico.",
                profilePic: userImage,
                id: '2',
                entryDate: "28/06/2024",
            },
            {
                nome: "Carla Ferreira",
                role: "Bolsista",
                description: "Carla Ferreira é estudante de graduação apaixonada por design de interfaces e experiência do usuário. Ela já participou de competições estudantis, onde apresentou projetos de aplicativos para inclusão digital. Seu foco é criar soluções acessíveis que possam transformar vidas. Carla é membro de um grupo de estudos sobre acessibilidade digital e colabora com ONGs locais. Ela acredita que tecnologia e inclusão devem caminhar juntas.",
                profilePic: userImage,
                id: '4',
                entryDate: "14/07/2022",
            },
            {
                nome: "Lucas Lima",
                role: "Pesquisador(a)",
                description: "Lucas Lima é mestrando em ciência da computação e trabalha com integração de IoT em ambientes urbanos. Ele desenvolve soluções para cidades inteligentes, combinando eficiência e sustentabilidade. Lucas já apresentou seus projetos em feiras acadêmicas e recebeu prêmios por sua inovação. Além disso, é mentor de estudantes interessados na área de computação. Ele acredita que a tecnologia pode transformar cidades em espaços mais humanos.",
                profilePic: userImage,
                id: '7',
                entryDate: "07/05/2019",
            },
            {
                nome: "Lara Nunes",
                role: "Bolsista",
                description: "Lara Nunes é estudante de graduação fascinada pelo design e desenvolvimento de jogos digitais. Ela já criou protótipos de jogos interativos e participa de competições de game design. Lara acredita que jogos podem ser uma poderosa ferramenta educacional e de inclusão. Em sua universidade, colabora com colegas para criar experiências imersivas e inovadoras. Fora dos estudos, gosta de explorar novas tecnologias gráficas e motores de jogos.",
                profilePic: userImage,
                id: '12',
                entryDate: "03/12/2020",
            }
        ]
    }
]

const membros = [
    {
        label: "Marcelo Souza",
        value: "1"
    },
    {
        label: "Ana Ribeiro",
        value: "2"
    },
    {
        label: "João Almeida",
        value: "3"
    },
    {
        label: "Carla Ferreira",
        value: "4"
    },
    {
        label: "Pedro Costa",
        value: "5"
    },
    {
        label: "Maria Silva",
        value: "6"
    },
    {
        label: "Lucas Lima",
        value: "7"
    },
    {
        label: "Juliana Mendes",
        value: "8"
    },
    {
        label: "Rafael Santos",
        value: "9"
    },
    {
        label: "Beatriz Souza",
        value: "10"
    },
    {
        label: "Fernando Rocha",
        value: "11"
    },
    {
        label: "Lara Nunes",
        value: "12"
    },
    {
        label: "Ricardo Lopes",
        value: "13"
    },
    {
        label: "Paula Castro",
        value: "14"
    },
    {
        label: "Tiago Oliveira",
        value: "15"
    },
    {
        label: "Isabela Martins",
        value: "16"
    },
    {
        label: "Victor Teixeira",
        value: "17"
    },
    {
        label: "Camila Farias",
        value: "18"
    },
    {
        label: "André Moreira",
        value: "19"
    },
    {
        label: "Helena Alves",
        value: "20"
    },
    {
        label: "Gabriel Pinto",
        value: "21"
    },
    {
        label: "Sofia Gomes",
        value: "22"
    },
    {
        label: "Rodrigo Dias",
        value: "23"
    },
    {
        label: "Elaine Vieira",
        value: "24"
    },
    {
        label: "Daniel Barros",
        value: "25"
    },
    {
        label: "Luiza Melo",
        value: "26"
    },
    {
        label: "Eduardo Xavier",
        value: "27"
    },
    {
        label: "Alice Fonseca",
        value: "28"
    },
    {
        label: "Matheus Antunes",
        value: "29"
    },
    {
        label: "Renata Carvalho",
        value: "30"
    }
]


    function keywordsGenerator(array) {

        let keyword = []

        for (let x = 0; x <= 2; x++) {
            keyword.push(
                <div key={x} className="flex">
                    <a href={`/projects?keyword=${array[x].replace(/ /g, '_')}`} rel="noopener noreferrer">
                        {array[x]}
                    </a>
                    {x < 2 &&
                        <p>&nbsp;&bull;&nbsp;</p>
                    }
                </div>
            )
        }

        return keyword
    }


    const showModal = () => {
        setIsModalOpen(true);
        setEnableCopyButton(false)
        setCopyButtonText('Copy')
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function citationGenerator(project) {
        console.log(project)
        let textAuthors = []
        let citation = ''
        for (const e of project.authors) {
            textAuthors.push(e.nome.split(' '))
        }

        console.log(textAuthors)

        for (const z of textAuthors) {
            z.reverse()
            citation = citation + z[0].toUpperCase() + ', '
            z.reverse()
            citation = citation + z[0] + '; '
        }

        citation = citation.slice(0, -2) + '. '

        let ano = project.dataConferencia.split('-')
        let local = project.local.split(' ')
        citation += project.label + '. In: ' + project.conferencia.toUpperCase() + ', ' + ano[0] + ', ' + local[0] + '  DOI:' + project.doi + '.'

        console.log(citation)
        setCitationText(citation)
        showModal()
    }

    function copyText(text) {
        navigator.clipboard.writeText(text).then(() => {
            setCopyButtonText('Coppied!')
            setEnableCopyButton(true)
        })
    }

    function sortByDate(a, b) {
        let dataA = a.dataConferencia.split('-') //verificar se a data da conferencia, é a data de lançamento do artigo
        let dataB = b.dataConferencia.split('-')


        let entryDataA = new Date(
            parseInt(dataA[0]), //ano
            parseInt(dataA[1]) - 1, //mês
            parseInt(dataA[2]) //dia
        );

        let entryDataB = new Date(
            parseInt(dataB[0]), //ano
            parseInt(dataB[1]) - 1, //mês
            parseInt(dataB[2]) //dia
        );

        return entryDataB - entryDataA;
    }

    const onSearch = (value, _e, info) => {
        setNameSearch(value)

        let arrayAux = creatInitialArray()


        let projectsFiltredByName = projects.filter(projeto => projeto.label.includes(value))

        arrayJoiner(arrayAux, projectsFiltredByName)
    }

    const onSearchAbstract = (value, _e, info) => {
        setAbstractSearch(value)

        let arrayAux = creatInitialArray()


        let projectsFiltredByName = projects.filter(projeto => projeto.abstract.includes(value)) //o abstract deve ser incluido nos objetos do array
        //atualmente, so possui uma breve descrição, que é a que esta inclusa nos cards

        arrayJoiner(arrayAux, projectsFiltredByName)
    }

    const onSearchSlider = (value) => {
        setSlideSearch(value)
    };

    const handleChange = (value) => {
        setSelectList(value)
    }


    function handleFilters() {
        let array = creatInitialArray()

        let filtredArray = projects.filter((projeto) => {
            let findByYear = false
            let findBymember = false

            if (slideSearch != null) {
                let ano = projeto.dataConferencia.split('-')
                if (parseInt(ano) >= slideSearch[0] && parseInt(ano) <= slideSearch[1]) {
                    findByYear = true
                }
            }

            if (selectList.length != 0) {
                for (const j of projeto.authors) {
                    if (selectList.includes(j.id)) {
                        findBymember = true
                    }
                }
            }

            return (slideSearch == null || findByYear) &&
                (selectList.length == 0 || findBymember)

        })

        arrayJoiner(array, filtredArray)
    }

    function clearFilters() {
        setSlideSearch(null)
        let arrayAux = []
        setSelectList(arrayAux)
        setAllArticles(projectBackup)
    }


    function creatInitialArray() {
        let arrayAux = []

        for (const e of projectBackup) {
            let line = { ano: e.ano, projetos: [] }
            arrayAux.push(line)
        }

        return arrayAux
    }

    function arrayJoiner(yearArray, projects) {

        let arrayAux = []

        for (const e of yearArray) {
            for (const j of projects) {
                let ano = j.dataConferencia.split('-')
                if (ano[0] == e.ano) {
                    e.projetos.push(j)
                }
            }
        }

        for (const k of yearArray) {
            arrayAux.push(k)
        }

        setAllArticles(arrayAux)

    }



    function arraySort() {
        //função para ordenar os projetos por ordem de lançamento, e inserir os mais recentes no array do carrossel de projetos
        let arrayAux = []
        projects.sort(sortByDate)

        for (let e = 0; e < 5; e++) {
            arrayAux.push(projects[e])
        }

        setRecentArticles(arrayAux)
    }

    function carouselCardGenerator() {
        if (recentArticles != null) {
            let cards = []

            for (let step = 0; step < 5; step++) {
                cards.push(
                    <div key={step} className="h-[32rem] bg-cover bg-center">
                        <div
                            className="h-[32rem]"
                            style={{
                                zIndex: '15',
                                backgroundSize: "100% 100%",
                                backgroundPosition: "0px 0px",
                                backgroundImage: "radial-gradient(200% 200% at 129% 22%, #073AFF00 29%, #156d86 54%)",
                                paddingTop: '220px'
                            }}
                        >
                            <div className="w-[30%] ml-14">
                                <div className="flex" style={{ marginBottom: '4px', color: 'white', fontWeight: "400" }}>
                                    {keywordsGenerator(recentArticles[step].keywords)}
                                </div>
                                <Title level={2} className="z-40" style={{ color: 'white', marginTop: '4px', marginBottom: '10px' }}>{recentArticles[step].label}</Title>
                                <Paragraph style={{ color: 'white' }} className="text-md">{recentArticles[step].abstract}</Paragraph>
                                <Link href={`/articleView?articleID=${recentArticles[step].value}`} passHref>
                                    <Button style={{ color: '#156d86', fontSize: '17px' }} className="w-[200px] h-[40px] rounded-2xl">Veja o Artigo <IconFileText stroke={1.25} style={{ width: '30px', height: "34px", color: '#156d86' }} /></Button>
                                </Link>
                            </div>
                            <img
                                id='backgroundImage'
                                src={recentArticles[step].img}
                                alt="backgroundImage"
                                className="h-[32rem]"
                                style={{
                                    position: "absolute",
                                    top: "0",
                                    left: "0",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    zIndex: "-1",
                                }}
                            />
                        </div>
                    </div >
                )
            }

            return cards
        }
    }

    function createProjectCards(array) {
        if (array.length != 0) {
            let cards = array.map((e, i) => (
                <Card key={i} className="w-[30%] mr-8 mb-7"
                    cover={
                        <img src={e.img} alt="project image"
                            style={{
                                width: '350px',
                                height: '140px'
                            }}
                        />}
                    hoverable
                    actions={[
                        <IconQuote className='text-[#e6e6e6] ml-[40%]' key="quote" onClick={(j) => { citationGenerator(e) }} />,
                        <Link href={`/articleView?articleID=${e.value}`} passHref>
                            <IconFileText className='text-[#e6e6e6] ml-[40%]' key="access" />
                        </Link>,
                        <a href={e.link} target="_blank" rel="noopener noreferrer">
                            <IconExternalLink className='text-[#e6e6e6] ml-[40%]' key="goTo" />
                        </a>
                    ]}
                >
                    <div id="project info">
                        <div style={{ fontSize: '11px', display: 'flex' }}>
                            {keywordsGenerator(e.keywords)}
                        </div>
                        <div className="h-[72px]">
                            <Title level={5} className="border-b mb-3 border-[#e6e6e6] pb-2">{e.label}</Title>
                        </div>
                        <div className="h-[100px]">
                            <Paragraph className="mt-5">{e.abstract}</Paragraph>
                        </div>
                    </div>
                </Card>
            ))


            return cards

        } else {
            return <Text style={{ width: '100%', textAlign: 'center', marginBottom: '15px' }}>Não foram encontrados projetos</Text>

        }
    }

    function generateProjectGroups() {
        if (allArticles != null) {
            const groups = allArticles.map((project, i) => (
                <div key={i}>
                    <div id="topDiv">
                        <Divider orientation="left" plain>
                            <Text className={style.customFont}>{project.ano}</Text>
                        </Divider>
                        <div id="projects" className="flex flex-wrap">
                            {createProjectCards(project.projetos)}
                        </div>
                    </div>
                </div>
            ))

            return groups
        } else {
            return <Text style={{ width: '100%', textAlign: 'center', marginBottom: '15px' }}>Não foram encontrados projetos</Text>

        }
    }

    function createProjectsArray() {
        if (searchParams.get('keyword') == null) {

            let arrayAux = []

            for (const e of projects) {
                let anoLançamento = e.dataConferencia.split('-')
                let line = { ano: anoLançamento[0], projetos: [] }
                if (!arrayAux.some(item => item.ano === line.ano)) arrayAux.push(line)
            }


            for (const e of arrayAux) {
                for (const j of projects) {
                    let data = j.dataConferencia.split("-")

                    if (data[0] == e.ano) {
                        e.projetos.push(j)
                    }
                }
            }

            setAllArticles(arrayAux)
            setPorjectBackup(arrayAux)

        } else {

            let filtredArray = projects.filter((projeto) => {
                for (const e of projeto.keywords) {
                    if (e == searchParams.get('keyword').replace(/_/g, ' ')) {
                        return true
                    }
                }
                return false
            })

            let arrayAux = []

            for (const e of filtredArray) {
                let anoLançamento = e.dataConferencia.split('-')
                let line = { ano: anoLançamento[0], projetos: [] }
                if (!arrayAux.some(item => item.ano === line.ano)) arrayAux.push(line)
            }


            for (const e of arrayAux) {
                for (const j of filtredArray) {
                    let data = j.dataConferencia.split("-")

                    if (data[0] == e.ano) {
                        e.projetos.push(j)
                    }
                }
            }

            setAllArticles(arrayAux)
            setPorjectBackup(arrayAux)
        }
    }


    useEffect(() => {
        if (projects.length != 0) {
            arraySort()
            createProjectsArray()
        } else {
            console.log("array inicial vazio")
        }
    }, [])
    return (
        <Suspense>
            <>
                <ConfigProvider
                    theme={{
                        components: {
                            Carousel: {
                                arrowSize: 32,
                                dotWidth: 48,
                                dotHeight: 8
                            },
                            Card: {
                                actionsBg: '#156D86'
                            },
                        },
                        token: {
                            colorPrimary: '#156D86',
                        },
                    }}
                >
                    <div>
                        <div id="carousel">
                            <Carousel effect="fade" autoplay arrows speed={900} autoplaySpeed={4000}>
                                {carouselCardGenerator()}
                            </Carousel>
                        </div>
                        {searchParams.get('keyword') != null &&
                            <div className="flex justify-between pr-7">
                                <Title level={4} style={{ color: '#156D86', marginTop: '20px', marginLeft: '20px' }}>Displaying results for "{searchParams.get('keyword').replace(/_/g, ' ')}"</Title>
                                <Title level={4} style={{ color: '#156D86', marginTop: '20px', marginLeft: '20px' }}>
                                    <a href="/projects" style={{ color: '#156D86' }}>Show All</a>
                                </Title>
                            </div>
                        }
                        <Title level={2} style={{ color: '#156D86', textAlign: 'center', marginTop: '30px' }}>ARTICLES</Title>
                        <div id={style.mainContent}>
                            <div className='filterArea'>
                                <Title level={4} className='memberTypeTitle' style={{ color: '#156D86' }}>Filters</Title>
                                <div className='filterInputs'>
                                    <div className='filterDiv'>
                                        <Title level={5} style={{ color: '#156D86', marginTop: "10px" }}>Title:</Title>
                                        <Search placeholder="type articles's Title..."
                                            onSearch={onSearch}
                                            enterButton
                                            allowClear
                                            onClear={(e) => { setAllArticles(projectBackup) }} />

                                        <Title level={5} style={{ color: '#156D86', marginTop: "10px" }}>Abstract:</Title>
                                        <Search placeholder="type articles's abstract..."
                                            onSearch={onSearchAbstract}
                                            enterButton
                                            allowClear
                                            onClear={(e) => { setAllArticles(projectBackup) }} />
                                    </div>
                                    <div id='slider' className='filterDiv'>
                                        <Title level={5} style={{ color: '#156D86', marginTop: "10px" }}>Year:</Title>
                                        <Slider
                                            range
                                            min={2000}
                                            max={new Date().getFullYear()}
                                            onChange={onSearchSlider}
                                            value={slideSearch}
                                        />
                                    </div>
                                    <div id='selectDiv' className='filterDiv'>
                                        <Title level={5} style={{ color: '#156D86', marginTop: "10px" }}>Member:</Title>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{
                                                width: '100%',
                                            }}
                                            placeholder="Select members..."
                                            onChange={handleChange}
                                            options={membros}
                                            showSearch
                                            value={selectList}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                        // onClear={() => {setAllArticles(projectBackup)}}
                                        />
                                    </div>
                                    <div>
                                        <Button type="primary" id='filterButton' onClick={(e) => { handleFilters() }} style={{ marginTop: '10px', width: '100%' }}>Apply Filters</Button>
                                        <Button type="primary" danger={true} id='filterButton' onClick={(e) => { clearFilters() }} style={{ marginTop: '10px', width: '100%' }}>Clear Filters</Button>

                                    </div>

                                    <div>

                                    </div>
                                </div>
                            </div>
                            <div id="projects">
                                {generateProjectGroups()}
                            </div>
                        </div>
                        <Modal open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="back" onClick={handleCancel}>
                                    Cancel
                                </Button>,
                                <Button key='copy' className="bg-customBlueGreen text-white"
                                    onClick={(e) => { copyText(citationText) }}
                                    disabled={enableCopyButton}
                                >
                                    {copyButtonText}
                                    {copyButtonText == 'Copy' && <IconCopy style={{ width: '22px', height: "26px" }} />}
                                </Button>,
                            ]}
                        >
                            <ModalCitation text={citationText} />
                        </Modal>
                    </div>
                </ConfigProvider>
            </>
        </Suspense>)
}