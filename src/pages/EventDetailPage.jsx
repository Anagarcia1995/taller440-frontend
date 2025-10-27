import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDateDetail } from '../utils/dateUtils';
import '../styles/eventDetail.css';

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
      } catch (error) {
        console.error('Error fetching event', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>Event not found</p>;

  const [weekday, dateDisplay] = formatDateDetail(event.date);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  
  return (
    <div className="event-detail-page" key={event._id}>
      <button onClick={() => navigate('/')} className="back-button">
        BACK TO LISTING
      </button>

      <div className="event-detail-content">
        {event.image && (
          <img
            src={`http://localhost:3000/${event.image}`}
            alt={event.name}
            className="event-detail-image"
          />
        )}

        <div className="event-info">
          <div className="weekday">{weekday}</div>
          <div className="date-display">{dateDisplay}</div>
          <div className="event-name">{event.name}</div>
          <div className="event-djs">{event.djs}</div>

          <div className='event-extra'>
            <div className="event-extra-info">Doors open at 11 PM</div>
            <div className="event-extra-info">Attention: entry prohibited for anyone under 18</div>
          </div>

          <div className="event-price">{event.price}€</div>

          <button className="buy-btn" onClick={handleCheckout}>BUY TICKET</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
