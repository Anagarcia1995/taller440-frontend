// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { formatDateShort } from '../utils/dateUtils'

// const HomePage = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/events");
//         const data = await response.json();
//         setEvents(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching events", error);
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const handleCardClick = (id) => {
//     navigate(`/event/${id}`);
//   }

//   if (loading) return <p>Loading events...</p>;

//   return (
//     <div className="events-grid">
//       {events.map((event) => (
//         <div 
//           key={event._id}
//           className="event-card"
//           onClick={() => handleCardClick(event._id)}
//           style={{ cursor: 'pointer' }}
//         >
//           {event.image && (
//             <img 
//               src={`http://localhost:3000/${event.image}`} 
//               alt={event.name} 
//               className="event-image"
//               style={{width: '250px',height:'300px'}}/>)}
//           <h2 className="event-date">{formatDateShort(event.date)}</h2>

//           <button onClick={(e) => {
//             e.stopPropagation();
//           }}
//           >BUY TICKET</button>

//         </div>
//       ))}
//     </div>
//   )
// }

// export default HomePage;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateShort } from '../utils/dateUtils';

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
    <div className="events-grid">
      {events.map((event) => (
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
          <button onClick={(e) => e.stopPropagation()}>BUY TICKET</button>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
