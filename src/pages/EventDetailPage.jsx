import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EventDetailPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${id}`);
        const data = await response.json();
        setEvent(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event', error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>Event not found</p>;


  return (
    <div className="event-detail-container">
      <button 
      onClick={() => navigate ('/')}
      className="back-button">
        BACK TO LISTING
      </button>

      {event.image && (
        <img 
        src={`http://localhost:3000/${event.image}`} 
        alt={event.name}
        className="event-detail-image"
        />
      )}
      <h2>{event.date}</h2>
      <h3>{event.name}</h3>
      <p>{event.djs}</p>
      <p>{event.price}€</p>
    </div>
  )
}

export default EventDetailPage