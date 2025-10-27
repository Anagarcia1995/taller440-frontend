import React, { useState } from 'react';
import '../styles/newEvent.css';

const EventFormComponent = ({ onSuccess, onCancel, eventToEdit }) => {
  const [name, setName] = useState(eventToEdit?.name || '');
  const [date, setDate] = useState(eventToEdit?.date || '');
  const [djs, setDjs] = useState(eventToEdit?.djs || '');
  const [price, setPrice] = useState(eventToEdit?.price || '');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();

      formData.append('name', name);
      formData.append('date', date);
      formData.append('djs', djs);
      formData.append('price', price);
      if (image) formData.append('image', image);

      const method = eventToEdit ? 'PUT' : 'POST';
      const url = eventToEdit
        ? `http://localhost:3000/events/${eventToEdit._id}`
        : 'http://localhost:3000/events';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        onSuccess();
      } else {
        const errorText = await response.text();
        console.error('Error al guardar el evento:', errorText);
        alert('Error al guardar el evento');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('Error al guardar el evento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="new-event-form" onSubmit={handleSubmit}>
      {/* Parte de inputs */}
      <div className="new-event-form-fields">
        <label>Name </label>
        <input
          type="text"
          placeholder="name event"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>DJs</label>
        <input
          type="text"
          placeholder="DJs invitados"
          value={djs}
          onChange={(e) => setDjs(e.target.value)}
        />

        <label>Price</label>
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
        />

        <label>Flyer</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      {/* Preview de imagen */}
      <div className="new-event-image-preview">
        {image ? (
          <img src={URL.createObjectURL(image)} alt="Preview" />
        ) : eventToEdit?.image ? (
          <img
            src={`http://localhost:3000/${eventToEdit.image}`}
            alt="Evento existente"
          />
        ) : null}
      </div>

      {/* Botones */}
      <div className="new-event-buttons">
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Update'}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EventFormComponent;
