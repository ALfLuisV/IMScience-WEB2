'use client'

import React, { useState } from 'react';
import { Select, DatePicker, Button, Input, Typography, ConfigProvider } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import eventsData from '../events/eventsinfo.json';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const EventsFilter = () => {
  const [audienceFilter, setAudienceFilter] = useState('any');
  const [dateList, setDateList] = useState([]);
  const [typeFilter, setTypeFilter] = useState('any');
  const [locationFilter, setLocationFilter] = useState('any');
  const [modeFilter, setModeFilter] = useState('any');
  const [filteredEvents, setFilteredEvents] = useState(eventsData.eventos);
  const [nameFilter, setNameFilter] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month}/${year}`;
  };

  const generateGoogleCalendarUrl = (event) => {
    const startDate = new Date(`${event.data}T${event.horario}`).toISOString().replace(/-|:|\.\d\d\d/g, '');    
    const endDate = new Date(new Date(`${event.data}T${event.horario}`).getTime() + 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.nome)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.descricao)}&location=${encodeURIComponent(event.local)}`;  };

  const dateHandle = (value) => {
    setDateList(value);
  };

  function filterByDate(event) {
    if (dateList.length !== 2) return true;

    const [startDate, endDate] = dateList;
    const eventDate = new Date(event.data);

    return eventDate >= startDate && eventDate <= endDate;
  }

  const applyFilters = () => {
    let filtered = eventsData.eventos;

    if (nameFilter) {
      filtered = filtered.filter(evento => evento.nome.toLowerCase().includes(nameFilter.toLocaleLowerCase()));
    }

    if (audienceFilter !== 'any') {
      filtered = filtered.filter(evento => evento.audiencia === audienceFilter);
    }


    if (typeFilter !== 'any') {
      filtered = filtered.filter(evento => evento.tipo === typeFilter);
    }

    if (locationFilter !== 'any') {
      filtered = filtered.filter(evento => evento.local.toLowerCase().includes(locationFilter.toLocaleLowerCase()));
    }

    if (modeFilter !== 'any') {
      filtered = filtered.filter(evento => evento.modo === modeFilter);
    }

    filtered = filtered.filter(filterByDate);

    setFilteredEvents(filtered);
  };

  const clearFilters = () => {
    setAudienceFilter('any');
    setDateList([]);
    setTypeFilter('any');
    setLocationFilter('any');
    setModeFilter('any');
    setNameFilter('');
    setFilteredEvents(eventsData.eventos);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#156D86',
        },
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
        <div style={{
          width: '300px',
          padding: '20px',
          borderRight: '2px solid #eee',
        }}>
          <Title level={4} style={{ color: '#156D86' }}>Filters</Title>

          <div style={{ marginBottom: '16px' }}>
            <Title level={5} style={{ color: '#156D86' }}>Event Name</Title>
            <Input
              value={nameFilter}
              enterButton
              onChange={(e) => setNameFilter(e.target.value)}
              placeholder="Search by event name"
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <Title level={5} style={{ color: '#156D86' }}>Audience</Title>
            <Select
              value={audienceFilter}
              onChange={setAudienceFilter}
              style={{ width: '100%' }}
              options={[
                { value: 'any', label: 'Any' },
                { value: 'general', label: 'General public' },
                { value: 'cern', label: 'CERN community' },
                { value: 'scientists', label: 'Scientists' },
                { value: 'students', label: 'Students' },
                { value: 'educators', label: 'Educators' },
                { value: 'media', label: 'Media' },
                { value: 'industry', label: 'Industry partners' },
                { value: 'policy', label: 'Policymakers' },
              ]}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <Title level={5} style={{ color: '#156D86' }}>Date Range</Title>
            <RangePicker
              value={dateList}
              onChange={dateHandle}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <Title level={5} style={{ color: '#156D86' }}>Event Type</Title>
            <Select
              value={typeFilter}
              onChange={setTypeFilter}
              style={{ width: '100%' }}
              options={[
                { value: 'any', label: 'Any' },
                { value: 'conference', label: 'Conference' },
                { value: 'workshop', label: 'Workshop' },
                { value: 'seminar', label: 'Seminar' },
                { value: 'symposium', label: 'Symposium' },
              ]}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <Title level={5} style={{ color: '#156D86' }}>Location</Title>
            <Select
              value={locationFilter}
              onChange={setLocationFilter}
              style={{ width: '100%' }}
              options={[
                { value: 'any', label: 'Any' },
                { value: 'São Paulo', label: 'São Paulo, Brasil' },
                { value: 'Berlim', label: 'Berlim, Alemanha' },
                { value: 'Paris', label: 'Paris, França' },
                { value: 'Viena', label: 'Viena, Áustria' },
                { value: 'Nova York', label: 'Nova York, EUA' },
                { value: 'Tóquio', label: 'Tóquio, Japão' },
                { value: 'Londres', label: 'Londres, Reino Unido' },
                { value: 'Boston', label: 'Boston, EUA' }
              ]}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <Title level={5} style={{ color: '#156D86' }}>Mode</Title>
            <Select
              value={modeFilter}
              onChange={setModeFilter}
              style={{ width: '100%' }}
              options={[
                { value: 'any', label: 'Any' },
                { value: 'online', label: 'Online' },
                { value: 'presencial', label: 'Presencial' },
              ]}
            />
          </div>

          <Button type="primary" onClick={applyFilters} style={{ marginTop: '10px', width: '100%' }}>Apply Filters</Button>
          <Button type="primary" danger onClick={clearFilters} style={{ marginTop: '10px', width: '100%' }}>Clear Filters</Button>

        </div>


        <div style={{ flex: 1, padding: '20px' }}>
          <Title level={2} style={{ color: '#156D86', textAlign: 'center', marginBottom: '20px' }}>Upcoming and Ongoing Events</Title>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {filteredEvents.map(evento => (
              <div key={evento.id} style={{
                border: '1px solid #e8e8e8',
                padding: '20px',
                borderRadius: '8px',
                position: 'relative',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <div>
                  <div style={{ marginBottom: '15px' }}>
                    <p>{evento.horario}</p>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                      {formatDate(evento.data)} 
                    </div>
                    <div style={{ color: '#666' }}>{evento.sigla}</div>
                  </div>
                  <h3 style={{
                    fontSize: '16px',
                    marginBottom: '10px',
                    color: '#156D86',
                    fontWeight: '500',
                  }}>
                    {evento.nome}
                  </h3>
                  <div style={{ color: '#666', marginBottom: '20px' }}>
                    {evento.local}
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 'auto', 
                }}>
                  <a
                    href={generateGoogleCalendarUrl(evento)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#156D86',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      transition: 'background-color 0.3s ease',
                      marginTop: 'auto',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f4f61'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#156D86'}
                  >
                    <CalendarOutlined style={{ marginRight: '5px' }} />
                    Add to Calendar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ConfigProvider>
  );
};

export default EventsFilter;
