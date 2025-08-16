"use client"
import { Card, Select, Typography, Row, Col } from 'antd';
import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { useState } from 'react';
import { ConfigProvider } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

const mockMembers = [
  {
    id: 1,
    name: 'Alice',
    entryDate: '15/01/2025',
    projects: [
      { label: 'Projeto X', value: 'proj-x' },
      { label: 'Projeto Y', value: 'proj-y' }
    ]
  },
  {
    id: 2,
    name: 'Bob',
    entryDate: '10/01/2025',
    projects: [
      { label: 'Projeto X', value: 'proj-x' }
    ]
  },
  {
    id: 3,
    name: 'Carol',
    entryDate: '25/11/2024',
    projects: [
      { label: 'Projeto Z', value: 'proj-z' },
      { label: 'Projeto Y', value: 'proj-y' }
    ]
  }
];

const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split('/');
  return new Date(year, month - 1, day);
};

const groupProjectsByPeriod = (members, period) => {
  const now = new Date();
  const timeData = [];
  const projectsMap = new Map();

  const startDate = new Date();
  switch(period) {
    case 'month':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case '6months':
      startDate.setMonth(now.getMonth() - 6);
      break;
    case 'year':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
  }

  if (!Array.isArray(members)) return { timeData: [], projects: [] };

  const intervals = period === 'month' ? 4 : period === '6months' ? 6 : 12;
  const intervalSize = period === 'month' ? 7 : period === '6months' ? 30 : 30;

  // Primeiro, coletamos todos os projetos únicos
  const allProjects = new Set();
  members.forEach(member => {
    member.projects.forEach(project => {
      allProjects.add(project.value);
    });
  });

  // Para cada intervalo de tempo
  for (let i = 0; i < intervals; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + (i * intervalSize));
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

    const activeProjects = new Set();
    const currentProjectsMap = new Map();

    // Verificamos quais projetos estavam ativos neste período
    members.forEach(member => {
      const entryDate = parseDate(member.entryDate);
      if (entryDate <= date) {
        member.projects.forEach(project => {
          activeProjects.add(project.value);
          if (!currentProjectsMap.has(project.value)) {
            currentProjectsMap.set(project.value, {
              id: project.value,
              name: project.label,
              count: 1
            });
          } else {
            currentProjectsMap.get(project.value).count++;
          }
        });
      }
    });

    timeData.push({
      date: formattedDate,
      projects: activeProjects.size
    });

    // Atualizamos o mapa de projetos com os dados mais recentes
    currentProjectsMap.forEach((value, key) => {
      projectsMap.set(key, value);
    });
  }

  return {
    timeData,
    projects: Array.from(projectsMap.values())
  };
};

const ProjectAnalytics = () => {
  const [timePeriod, setTimePeriod] = useState('month');
  const { timeData, projects } = groupProjectsByPeriod(mockMembers, timePeriod);

  const chartData = timeData.map(item => ({
    date: item.date,
    pubs: item.projects
  }));

  return (
    <Row gutter={[16, 16]} style={{ padding: '24px' }}>
      <Col span={24}>
        <Card
          title={
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={4} style={{ color: '#156D86', margin: 0 }}>Projetos Publicados</Title>
              </Col>
              <Col>
                <Select
                  defaultValue="month"
                  style={{ width: 120 }}
                  onChange={setTimePeriod}
                >
                  <Option value="month">1 Month</Option>
                  <Option value="6months">6 Months</Option>
                  <Option value="year">1 Year</Option>
                </Select>
              </Col>
            </Row>
          }
        >
          <div style={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <LineChart
              width={1000}
              height={400}
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <YAxis domain={[0, Math.max(...chartData.map(item => item.pubs), 1) + 1]} />
              <XAxis dataKey="date" />
              <Tooltip
                content={({ payload, label }) => {
                  if (payload && payload.length) {
                    return (
                      <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '5px' }}>
                        <p><strong>Data:</strong> {label}</p>
                        <p><strong>Projetos:</strong> {payload[0].value}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line type="monotone" dataKey="pubs" stroke="#156D86" strokeWidth={2} />
            </LineChart>
          </div>
        </Card>
      </Col>

      <Col span={24}>
        <Card
          title={
            <Title level={4} style={{ color: '#156D86', margin: 0 }}>
              Projetos ({projects.length})
            </Title>
          }
        >
          <Row gutter={[16, 16]}>
            {projects.map(project => (
              <Col xs={24} sm={12} key={project.id}>
                <Card
                  size="small"
                  style={{
                    borderLeft: '4px solid #156D86',
                    backgroundColor: '#f5f5f5'
                  }}
                >
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Text strong>{project.name}</Text>
                      <br />
                      <Text type="secondary">
                        {project.count} membro{project.count !== 1 ? 's' : ''}
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ProjectAnalytics;