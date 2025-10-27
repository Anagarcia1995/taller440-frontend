import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateShort } from '../utils/dateUtils';
import '../styles/home.css';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        const data = await response.json();
        const sortedEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleCardClick = (id) => navigate(`/event/${id}`);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="home-page">
      <section className="home-video-section">
        <video
          src="/videos/DRUMSHEDS - September 2023 [AIJwNDnlOxI].f399.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="video-overlay"></div>
      </section>

      <div className="events-grid">
        {events.map(event => (
          <div 
            key={event._id} 
            className="event-card" 
            onClick={() => handleCardClick(event._id)}
          >
            {event.image && (
              <img 
                src={`http://localhost:3000/${event.image}`} 
                alt={event.name} 
                className="event-image"
              />
            )}
            <h2 className="event-date">{formatDateShort(event.date)}</h2>
          </div>
        ))}
      </div>

      {/* === SUBSCRIBE SECTION === */}
      <section className="subscribe-section">
        <p className='subscribe-title'>Subscribe to our mailing list</p>
        <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="subscribe-input" 
            required 
          />
          <button type="submit" className="subscribe-btn">SUBMIT</button>
        </form>
      </section>


    </div>
  );
};

export default HomePage;
