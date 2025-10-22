import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/event/${id}`);
  }

  if (loading) {
    return <p>loading events...</p>
  }


  return (
    <div className="events-grid">
          {events.map((event) => (
            <div 
            key={event._id}
            className="event-card"
            onClick={() => handleCardClick(event._id)}
            style={{cursor: 'pointer' }}
            >
              {event.image && (
                <img 
                src={`http://localhost:3000/${event.imgage}`} 
                alt={event.name} 
                className="event-image"
                />
              )}
              <h2 className="event-date">{event.date}</h2>
            </div>
          ))}
        </div>
  )
}

export default HomePage