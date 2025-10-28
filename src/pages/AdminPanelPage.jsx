import React, { useEffect, useState, useRef } from 'react';
import EventFormComponent from '../components/EventFormComponent';
import '../styles/adminPanel.css';

// Componente modular para cada evento
const EventCard = ({ event, isEditing, onEdit, onDelete, onFormSuccess }) => {
  return (
    <div className="admin-event-card">
      {isEditing ? (
        <div className="admin-edit-layout">
          <EventFormComponent
            eventToEdit={event}
            onSuccess={onFormSuccess}
            onCancel={onEdit}
          />
        </div>
      ) : (
        <div className="admin-event-row">
          {event.image && (
            <img
              src={`http://localhost:3000/${event.image}`}
              alt={event.name}
              className="admin-event-image"
            />
          )}
          <div className="admin-event-info">
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            <p>{event.djs}</p>
            <p>{event.price}€</p>
          </div>
          <div className="form-buttons">
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminPanelPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEventId, setEditingEventId] = useState(null);
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const formRef = useRef(null);

  // Traer eventos
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/events');
      const data = await response.json();
      const sorted = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setEvents(sorted);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFormSuccess = () => {
    setEditingEventId(null);
    setShowNewEventForm(false);
    fetchEvents();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setEvents((prev) => prev.filter((event) => event._id !== id));
      } else {
        alert('Error deleting event');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleNewEvent = () => {
    setEditingEventId(null);
    setShowNewEventForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (loading) return <p>Loading admin panel...</p>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <button onClick={handleNewEvent} className="new-event-btn">
          + New Event
        </button>
      </div>

      {showNewEventForm && (
        <div ref={formRef} className="admin-form-section">
          <EventFormComponent
            onSuccess={handleFormSuccess}
            onCancel={() => setShowNewEventForm(false)}
          />
        </div>
      )}

      <div className="admin-event-list">
        {events.map((event, index) => (
          <React.Fragment key={event._id}>
            <EventCard
              event={event}
              isEditing={editingEventId === event._id}
              onEdit={() =>
                setEditingEventId(editingEventId === event._id ? null : event._id)
              }
              onDelete={() => handleDelete(event._id)}
              onFormSuccess={handleFormSuccess}
            />
            {index < events.length - 1 && <hr className="event-separator" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AdminPanelPage;
