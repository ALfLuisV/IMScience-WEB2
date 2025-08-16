'use client'

import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';


const events = [
  {
    date: '27 NOV/24',
    title: 'International Conference on Graph Theory and Applications',
    local: 'São Paulo, Brasil'
  },
  {
    date: '27 NOV/24', 
    title: 'Graph-Based Machine Learning Conference',
    local: 'Berlim, Alemanha'
  },
  {
    date: '27 NOV/24',
    title: 'Workshop on Graph Algorithms',
    local: 'Online'
  }
];

const EventList = () => {

  const handleViewAllEvents = () => {
    window.location.href = '/eventsView';
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '40px' }}>UPCOMING EVENTS</h2>
      
      <div style={{
        display: 'flex',
        gap: '30px',
        overflowX: 'auto',
        paddingBottom: '20px',
      }}>
        {events.map((item, index) => (
          <div key={index} style={{
            minWidth: '300px',
            position: 'relative',
            paddingRight: '30px',
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '12px'
            }}>
              {item.date}
            </div>
            <div style={{
              color: '#0066cc',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              {item.title}
            </div>
            <div style={{ 
              color: '#666',
              fontSize: '12px' 
            }}>
              {item.local}
            </div>
            {index < events.length - 1 && (
              <div style={{
                position: 'absolute',
                right: '0',
                top: '0',
                bottom: '0',
                width: '1px',
                backgroundColor: '#e8e8e8'
              }} />
            )}
          </div>
        ))}
      </div>
      
      <div style={{ 
        textAlign: 'right',
        marginTop: '20px'
      }}>
        <Button 
          type="link" 
          style={{
            color: '#0066cc',
            fontWeight: '500',
            fontSize: '14px'
          }}
          onClick={handleViewAllEvents} 
        >
          View all events <RightOutlined />
        </Button>
      </div>
    </div>
  );
};

export default EventList;
