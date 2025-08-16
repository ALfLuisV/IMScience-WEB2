"use client";
import { useState, useEffect } from "react";
import membersData from "@/app/members/membrosinfo.json";
import eventsData from "@/app/events/eventsinfo.json";
import articlesData from "@/app/article/articlesinfo.json";

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export default function AdminPanel() {
    const [isAdding, setIsAdding] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const [editData, setEditData] = useState(null);

    const handleAddClick = (tab) => {
        setActiveTab(tab);
        setEditData(null);
        setIsAdding(true);
    };

    const handleEdit = (tab, data) => {
        setActiveTab(tab);
        setEditData(data);
        setIsAdding(true);
    };

    const handleBackClick = () => {
        setIsAdding(false);
        setActiveTab('');
        setEditData(null);
    };

    function handleDelete(id) {
        console.log("Deletar item com id:", id);
    }

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            {!isAdding ? (
                <div className="space-y-10">
                    <Section
                        title="Members"
                        onAdd={() => handleAddClick('membro')}
                        columns={["Name", "Role", "Email", "Actions"]}
                        data={membersData.map(member => ({
                            Name: member.nome,
                            Role: member.role,
                            Email: member.email,
                            Actions: (
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEdit('membro', member)}>
                                        <EditOutlined />
                                    </button>
                                    <button onClick={() => handleDelete(member.id)}>
                                        <DeleteOutlined />
                                    </button>
                                </div>
                            )
                        }))}
                    />
                    <Section
                        title="Events"
                        onAdd={() => handleAddClick('evento')}
                        columns={["Name", "Date", "Place", "Actions"]}
                        data={eventsData.eventos.map(event => ({
                            Name: event.nome,
                            Date: event.data,
                            Place: event.local,
                            Actions: (
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEdit('evento', event)}>
                                        <EditOutlined />
                                    </button>
                                    <button onClick={() => handleDelete(event.id)}>
                                        <DeleteOutlined />
                                    </button>
                                </div>
                            )
                        }))}
                    />

                    <Section
                        title="Articles"
                        onAdd={() => handleAddClick('artigo')}
                        columns={["Name", "DOI", "Authors", "Actions"]}
                        data={articlesData.artigos.map(article => ({
                            Name: article.title,
                            DOI: article.doi,
                            Authors: article.authors,
                            Actions: (
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEdit('artigo', article)}>
                                        <EditOutlined />
                                    </button>
                                    <button onClick={() => handleDelete(article.id)}>
                                        <DeleteOutlined />
                                    </button>
                                </div>
                            )
                        }))}
                    />

                </div>
            ) : (
                <div>
                    <button
                        onClick={handleBackClick}
                        className="mb-4 text-blue-600 hover:underline text-sm"
                    >
                        ← Voltar
                    </button>
                    <Form activeTab={activeTab} editData={editData} />
                </div>
            )}
        </div>
    );
}




function Section({ title, onAdd, columns, data }) {
    const [showAll, setShowAll] = useState(false);

    const itemsToShow = showAll ? data : data.slice(0, 6);

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">{title}</h2>
                <button
                    onClick={onAdd}
                    className="bg-[#156D86] text-white text-sm px-3 py-1 rounded-md"
                >
                    Adicionar
                </button>
            </div>

            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="bg-gray-100">
                        {columns.map((col, index) => (
                            <th key={index} className="px-3 py-2">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {itemsToShow.map((row, idx) => (
                        <tr key={idx} className="even:bg-gray-50 odd:bg-white">
                            {columns.map((col, i) => (
                                <td key={i} className="px-3 py-2">{row[col]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {data.length > 6 && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-[#156D86] text-sm hover:underline"
                    >
                        {showAll ? "Ver menos" : "Ver mais"}
                    </button>
                </div>
            )}
        </div>
    );
}

function Form({ activeTab, editData }) {
    return (
        <div className="border p-4 rounded-lg bg-white max-w-md mx-auto shadow-sm">
            <div className="flex justify-center space-x-2 mb-6">
                <span className="text-lg font-semibold capitalize">{editData ? "Editar" : "Adicionar"} {activeTab}</span>
            </div>


            {activeTab === 'artigo' && <FormArtigo editData={editData} />}
            {activeTab === 'membro' && <FormMembro editData={editData} />}
            {activeTab === 'evento' && <FormEvento editData={editData} />}
        </div>
    );
}



function FormArtigo({ editData }) {
    const [title, setTitle] = useState(editData?.title || '');
    const [authors, setAuthors] = useState(editData?.authors || '');
    const [date, setDate] = useState(editData?.dateOfConference || '');
    const [doi, setDoi] = useState(editData?.doi || '');
    const [abstract, setAbstract] = useState(editData?.abstract || '');
    const [acknowledgments, setAcknowledgments] = useState(editData?.acknowledgments || '');
    const [references, setReferences] = useState(editData?.references || '');
    const [keywords, setKeywords] = useState(editData?.keywords || '');
    const [demo, setDemo] = useState(editData?.demo || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editData) {
            console.log('Salvando edição de artigo:', { title, authors, date, doi, abstract, acknowledgments, references, keywords, demo });
        } else {
            console.log('Adicionando novo artigo:', { title, authors, date, doi, abstract, acknowledgments, references, keywords, demo });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="Authors" value={authors} onChange={(e) => setAuthors(e.target.value)} />
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Input placeholder="DOI" value={doi} onChange={(e) => setDoi(e.target.value)} />
            <Textarea placeholder="Abstract" value={abstract} onChange={(e) => setAbstract(e.target.value)} />
            <Textarea placeholder="Acknowledgments" value={acknowledgments} onChange={(e) => setAcknowledgments(e.target.value)} />
            <Input placeholder="References" value={references} onChange={(e) => setReferences(e.target.value)} />
            <Input placeholder="Keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
            <Input placeholder="Demo" value={demo} onChange={(e) => setDemo(e.target.value)} />
            <Button text={editData ? "Salvar Artigo" : "Adicionar Artigo"} />
        </form>
    );
}


function FormMembro({ editData }) {
    const [name, setName] = useState(editData?.nome || '');
    const [type, setType] = useState(editData?.role || '');
    const [description, setDescription] = useState(editData?.description || '');
    const [github, setGithub] = useState(editData?.github || '');
    const [linkedin, setLinkedin] = useState(editData?.linkedin || '');
    const [researchGate, setResearchGate] = useState(editData?.researchGate || '');
    const [email, setEmail] = useState(editData?.email || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editData) {
            console.log('Salvando edição de membro:', { name, type, description, github, linkedin, researchGate, email });
        } else {
            console.log('Adicionando novo membro:', { name, type, description, github, linkedin, researchGate, email });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="Professor">Professor</option>
                <option value="PhD">PhD Student</option>
                <option value="MSc">MSc Student</option>
                <option value="Undergrad">Undergrad Student</option>
            </Select>
            <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Input placeholder="GitHub" value={github} onChange={(e) => setGithub(e.target.value)} />
            <Input placeholder="LinkedIn" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
            <Input placeholder="ResearchGate" value={researchGate} onChange={(e) => setResearchGate(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button text={editData ? "Salvar Membro" : "Adicionar Membro"} />
        </form>
    );
}

function FormEvento({ editData }) {
    const [name, setName] = useState(editData?.nome || '');
    const [place, setPlace] = useState(editData?.local || '');
    const [description, setDescription] = useState(editData?.descricao || '');
    const [date, setDate] = useState(editData?.data || '');
    const [time, setTime] = useState(editData?.horario || '');
    const [link, setLink] = useState(editData?.link || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editData) {
            console.log('Salvando edição de evento:', { name, place, description, date, time, link });
        } else {
            console.log('Adicionando novo evento:', { name, place, description, date, time, link });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Place" value={place} onChange={(e) => setPlace(e.target.value)} />
            <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <div className="flex space-x-2">
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <Input placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} />
            <Button text={editData ? "Salvar Evento" : "Adicionar Evento"} />
        </form>
    );
}

function Input({ type = "text", placeholder, value, onChange }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border rounded-md px-3 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
    );
}

function Textarea({ placeholder, value, onChange }) {
    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border rounded-md px-3 py-1 text-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
            rows={3}
        />
    );
}


function Button({ text }) {
    return (
        <button
            type="submit"
            className="mt-2 bg-[#156D86] hover:bg-[#0e4c5e] text-white rounded-md py-1 text-sm font-semibold"
        >
            {text}
        </button>
    );
}

function Select({ value, onChange, children }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className="border rounded-md px-3 py-1 text-sm w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
            {children}
        </select>
    );
}