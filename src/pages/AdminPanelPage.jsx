import React, { useEffect, useState } from 'react'
import EventFormComponent from '../components/EventFormComponent'


const AdminPanelPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);


  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/events");
      const data = await response.json();

      //ordenar eventos
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      const thisWeek = [];
      const upcoming = [];
      const past = [];

      data.forEach(event => {
        const eventDate = new Date(event.date);
        if (eventDate >= startOfWeek && eventDate <= endOfWeek) {
          thisWeek.push(event);
        } else if (eventDate > endOfWeek) {
          upcoming.push(event);
        } else {
          past.push(event);
        }
      });

      const sortByDateAsc = arr => arr.sort((a, b) => new Date(a.date) - new Date(b.date));

      setEvents([...sortByDateAsc(thisWeek), ...sortByDateAsc(upcoming), ...sortByDateAsc(past)]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events", error);
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchEvents();
  },[]);


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`}
      });

      if (response.ok) {
        setEvents(events.filter(event => event._id !== id));
      } else {
        alert ("Failed to delete event")
      }
    } catch (error) {
      console.error("Delete error:", error)
    }
  };

  const handleEdit = (event) => {
    setEventToEdit(event);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEventToEdit(null);
    setShowForm(true);
  };

  const handleFormSuccess = (updatedEvent) => {
    const exists = events.some(ev => ev._id === updatedEvent._id);
    if (exists) {
      setEvents(events.map(ev => ev._id === updatedEvent._id ? updatedEvent : ev));
    } else {
      setEvents([updatedEvent, ...events]);
    }
    setShowForm(false);
  }

  if (loading) return <p>Loading events...</p>



  return (
    <div>
      {!showForm && (
        <button onClick={handleAddNew}> NEW</button>
      )}

      {showForm && (
        <EventFormComponent
        eventToEdit={eventToEdit}
        onSuccess={handleFormSuccess}
        />
      )}

      <div className="event-list">
        {events.map(event => (
          <div key={event._id} className="event-card">
            {event.image && (
              <img 
              src={`http://localhost:3000/${event.image}`} 
              alt={event.name}
              className="event-image"
              style= {{width:'100%', height: 'auto'}}
              />
            )}
            <h2>{event.date}</h2>
            <h3>{event.name}</h3>
            <p>{event.djs}</p>
            <p>{event.price}€</p>    
            <button onClick={() => handleEdit(event)}>EDIT</button>      
            <button onClick={() => handleDelete(event._id)}>DELETE</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminPanelPage