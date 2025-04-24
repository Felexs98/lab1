import { useEffect, useState } from 'react';
import { getEvents } from '@/api/eventService';
import { Event } from '@/types/event';
import { getUsername } from '@/utils/localStorageUtils';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import EventCard from './components/EventCard/EventCard';
import EventFilter from './components/EventFilter/EventFilter';
import EventForm from './components/EventForm/EventForm';
import styles from './Events.module.scss';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const username = getUsername();
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(Array.isArray(data.data) ? data.data : []);
    } catch {
      setError('Не удалось загрузить мероприятия');
    }
  };

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [username, navigate]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) => !selectedCategory || event.category === selectedCategory
  );

  return (
    <div className={styles.container}>
      <h2>Список мероприятий</h2>
      {/*username && <p>Вы авторизованы как: <strong>{username}</strong></p>*/}
      {error && <ErrorMessage message={error} />}

      <EventFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className={styles.grid}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p>Нет мероприятий для отображения.</p>
        )}
      </div>

      <EventForm onSuccess={fetchEvents} />
    </div>
  );
};

export default Events;
