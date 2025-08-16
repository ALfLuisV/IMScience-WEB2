"use client"
// export const dynamic = 'force-dynamic';
import { useEffect, useState, Suspense } from "react";
import { Card, Typography, Button, Divider, Carousel, ConfigProvider, Input, Select, Modal, Slider } from 'antd';
import { IconFileText, IconQuote, IconExternalLink, IconCopy } from '@tabler/icons-react';
import '@ant-design/v5-patch-for-react-19';
import userImage from '../../../public/user.png'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import style from './style/projects.module.css'
import ModalCitation from '@/app/site/components/citationBox/citation'
import Carrossel from '@/app/site/components/carrossel/carrossel.jsx';


const { Title, Paragraph, Text } = Typography;
const { Search } = Input;


export default function ProjectsViewContent({membros, projects}) {
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



    function createProjectCards(array) {
        if (array.length != 0) {
            let cards = array.map((e, i) => (
                <Card key={i} className="w-[30%] mr-8 mb-7"
                    cover={
                        <img src={e.img}  alt="project image"
                            style={{
                                width: '100%',
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
                        <Carrossel />
                    </div>
                    {searchParams.get('keyword') != null &&
                        <div className="flex justify-between pr-7">
                            <Title level={4} style={{ color: '#156D86', marginTop: '20px', marginLeft: '20px' }}>Displaying results for "{searchParams.get('keyword').replace(/_/g, ' ')}"</Title>
                            <Title level={4} style={{ color: '#156D86', marginTop: '20px', marginLeft: '20px' }}>
                                <a href="/projects" style={{ color: '#156D86' }}>Show All</a>
                            </Title>
                        </div>
                    }
                    <Title level={2} style={{ color: '#156D86', textAlign: 'center', marginTop: '30px' }}>Articles</Title>
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
        </>)
}
