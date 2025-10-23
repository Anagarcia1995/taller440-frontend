// import React, { useEffect, useState } from 'react'

// // Función para formatear la fecha para el input de tipo date (YYYY-MM-DD)
// const formatDateForInput = (dateStr) => {
//   if (!dateStr) return '';

//   // Si ya viene en formato YYYY-MM-DD
//   if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
//     return dateStr;
//   }

//   // Si viene como DD/MM/YYYY
//   if (dateStr.includes('/')) {
//     const [day, month, year] = dateStr.split('/');
//     return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
//   }

//   // Si viene como ISO string u otro formato reconocible
//   const date = new Date(dateStr);
//   if (!isNaN(date)) {
//     return date.toISOString().split('T')[0];
//   }

//   return '';
// };

// // Función para mostrar la fecha bonita: "Friday 24.10.2025"
// export const formatDateForDisplay = (dateStr) => {
//   if (!dateStr) return '';
//   const [day, month, year] = dateStr.split('/');
//   const date = new Date(`${year}-${month}-${day}`);
//   const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
//   return date.toLocaleDateString('en-GB', options).replace(/\//g, '.');
// }

// const EventFormComponent = ({ eventToEdit, onSuccess, onCancel }) => {
//   const [name, setName] = useState('');
//   const [date, setDate] = useState('');
//   const [djs, setDjs] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     if (eventToEdit) {
//       setName(eventToEdit.name || '');
//       setDate(formatDateForInput(eventToEdit.date));
//       setDjs(eventToEdit.djs || '');
//       setPrice(eventToEdit.price || '');
//       setImage(null);
//     } else {
//       setName('');
//       setDate('');
//       setDjs('');
//       setPrice('');
//       setImage(null);
//     }
//   }, [eventToEdit]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('date', date);
//       formData.append('djs', djs);
//       formData.append('price', price);
//       if (image) formData.append('image', image);

//       const token = localStorage.getItem('adminToken');
//       const url = eventToEdit
//         ? `http://localhost:3000/events/${eventToEdit._id}`
//         : 'http://localhost:3000/events';
//       const method = eventToEdit ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });

//       if (!response.ok) {
//         alert('Error saving event');
//         return;
//       }

//       const data = await response.json();
//       onSuccess(data);
//     } catch (error) {
//       console.error('Submit error', error);
//       alert('Error saving event');
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />

//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         required
//         min={new Date().toISOString().split('T')[0]} // evita fechas pasadas
//       />
//       {date && (
//         <p>Preview: {formatDateForDisplay(date)}</p>
//       )}

//       <input
//         type="text"
//         placeholder="DJs"
//         value={djs}
//         onChange={(e) => setDjs(e.target.value)}
//         required
//       />

//       <input
//         type="number"
//         placeholder="Price"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//         required
//       />

//       <input
//         type="file"
//         onChange={(e) => setImage(e.target.files[0])}
//       />

//       <button type="submit">{eventToEdit ? 'Update Event' : 'Create Event'}</button>
//       <button type="button" onClick={onCancel}>Cancel</button>
//     </form>
//   )
// }

// export default EventFormComponent;
import React, { useEffect, useState } from 'react';
import { formatDateForInput, formatDateForDisplay } from '../utils/dateUtils';

const EventFormComponent = ({ eventToEdit, onSuccess, onCancel }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [djs, setDjs] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (eventToEdit) {
      setName(eventToEdit.name || '');
      setDate(formatDateForInput(eventToEdit.date));
      setDjs(eventToEdit.djs || '');
      setPrice(eventToEdit.price || '');
    } else {
      setName('');
      setDate('');
      setDjs('');
      setPrice('');
    }
    setImage(null);
  }, [eventToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('date', date);
      formData.append('djs', djs);
      formData.append('price', price);
      if (image) formData.append('image', image);

      const token = localStorage.getItem('adminToken');
      const url = eventToEdit
        ? `http://localhost:3000/events/${eventToEdit._id}`
        : 'http://localhost:3000/events';
      const method = eventToEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        alert('Error saving event');
        return;
      }

      const data = await response.json();
      onSuccess(data);
    } catch (error) {
      console.error('Submit error', error);
      alert('Error saving event');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="event-form"
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        min={new Date().toISOString().split('T')[0]} // evita fechas pasadas
      />

      {date && <p className="date-preview">Preview: {formatDateForDisplay(date)}</p>}

      <input
        type="text"
        placeholder="DJs"
        value={djs}
        onChange={(e) => setDjs(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <div className="form-buttons">
        <button type="submit">{eventToEdit ? 'Update Event' : 'Create Event'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EventFormComponent;
