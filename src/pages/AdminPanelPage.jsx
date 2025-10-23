// import React, { useEffect, useState } from 'react'
// import EventFormComponent from '../components/EventFormComponent'

// const AdminPanelPage = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingId, setEditingId] = useState(null);
//   const [eventToEdit, setEventToEdit] = useState(null);
//   const [creatingNew, setCreatingNew] = useState(false);

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/events");
//       const data = await response.json();

//       // ordenar eventos
//       const today = new Date();
//       const startOfWeek = new Date(today);
//       startOfWeek.setDate(today.getDate() - today.getDay());
//       const endOfWeek = new Date(startOfWeek);
//       endOfWeek.setDate(startOfWeek.getDate() + 6);

//       const thisWeek = [];
//       const upcoming = [];
//       const past = [];

//       data.forEach(event => {
//         const eventDate = new Date(event.date);
//         if (eventDate >= startOfWeek && eventDate <= endOfWeek) {
//           thisWeek.push(event);
//         } else if (eventDate > endOfWeek) {
//           upcoming.push(event);
//         } else {
//           past.push(event);
//         }
//       });

//       const sortByDateAsc = arr => arr.sort((a, b) => new Date(a.date) - new Date(b.date));
//       setEvents([...sortByDateAsc(thisWeek), ...sortByDateAsc(upcoming), ...sortByDateAsc(past)]);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching events", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this event?")) return;
//     try {
//       const token = localStorage.getItem('adminToken');
//       const response = await fetch(`http://localhost:3000/events/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       if (response.ok) {
//         setEvents(events.filter(event => event._id !== id));
//       } else {
//         alert("Failed to delete event");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   const handleEdit = (event) => {
//     setEventToEdit(event);
//     setEditingId(event._id);
//     setCreatingNew(false);
//   };

//   const handleAddNew = () => {
//     setEventToEdit(null);
//     setEditingId('new'); // id temporal para nuevo evento
//     setCreatingNew(true); // indicamos que es nuevo
//   };

//   const handleFormSuccess = (updatedEvent) => {
//     const exists = events.some(ev => ev._id === updatedEvent._id);
//     let updatedEvents;

//     if (exists) {
//       updatedEvents = events.map(ev => ev._id === updatedEvent._id ? updatedEvent : ev);
//     } else {
//       updatedEvents = [updatedEvent, ...events]; // nuevo evento arriba
//     }

//     // Reordenar todos por fecha
//     updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

//     setEvents(updatedEvents);
//     setEditingId(null);
//     setEventToEdit(null);
//     setCreatingNew(false);
//   };

//   const handleCancel = () => {
//     setEditingId(null);
//     setEventToEdit(null);
//     setCreatingNew(false);
//   };

//   if (loading) return <p>Loading events...</p>;

//   return (
//     <div>
//       <button onClick={handleAddNew}>New Event</button>

//       <div className="event-list">
//         {/* Mostrar el formulario de nuevo evento arriba si creatingNew */}
//         {creatingNew && editingId === 'new' && (
//           <EventFormComponent
//             eventToEdit={null}
//             onSuccess={handleFormSuccess}
//             onCancel={handleCancel}
//           />
//         )}

//         {events.map(event => (
//           <div key={event._id} className="event-card">
//             {editingId === event._id ? (
//               <EventFormComponent
//                 eventToEdit={eventToEdit}
//                 onSuccess={handleFormSuccess}
//                 onCancel={handleCancel}
//               />
//             ) : (
//               <>
//                 {event.image && (
//                   <img
//                     src={`http://localhost:3000/${event.image}`}
//                     alt={event.name}
//                     className="event-image"
//                     style={{width: '250px',height:'300px'}}
//                   />
//                 )}
//                 <h2>{event.date}</h2>
//                 <h3>{event.name}</h3>
//                 <p>{event.djs}</p>
//                 <p>{event.price}€</p>
//                 <button onClick={() => handleEdit(event)}>EDIT</button>
//                 <button onClick={() => handleDelete(event._id)}>DELETE</button>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminPanelPage;
import React, { useEffect, useState, useRef } from 'react';
import EventFormComponent from '../components/EventFormComponent';

const AdminPanelPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const formRef = useRef(null); // para hacer scroll al formulario

  // 🔹 Traer eventos del backend
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/events');
      const data = await response.json();

      // Ordenar por fecha (más próximos primero)
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

  // 🔹 Crear o actualizar evento
  const handleSuccess = (savedEvent) => {
    setEditingEvent(null);
    fetchEvents(); // vuelve a cargar la lista actualizada
  };

  // 🔹 Eliminar evento
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

  // 🔹 Nuevo evento → scroll al formulario
  const handleNewEvent = () => {
    setEditingEvent(null);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (loading) return <p>Loading admin panel...</p>;

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      <button onClick={handleNewEvent} className="new-event-btn">
        + New Event
      </button>

      {/* Formulario de crear/editar */}
      <div ref={formRef}>
        <EventFormComponent
          eventToEdit={editingEvent}
          onSuccess={handleSuccess}
          onCancel={() => setEditingEvent(null)}
        />
      </div>

      {/* Lista de eventos */}
      <div className="admin-event-list">
        {events.map((event) => (
          <div key={event._id} className="admin-event-card">
            {event.image && (
              <img
                src={`http://localhost:3000/${event.image}`}
                alt={event.name}
              />
            )}
            <div className="admin-event-info">
              <h3>{event.name}</h3>
              <p>{event.date}</p>
              <p>{event.djs}</p>
              <p>{event.price}€</p>
            </div>

            <div className="admin-event-actions">
              <button onClick={() => setEditingEvent(event)}>Edit</button>
              <button onClick={() => handleDelete(event._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanelPage;
