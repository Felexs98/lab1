import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchEvents } from '@/features/events/eventsSlice';
import EventCard from '@/pages/Events/components/EventCard/EventCard';
import EventFilter from '@/pages/Events/components/EventFilter/EventFilter';
import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useAppDispatch();
  const { events, status } = useAppSelector((state) => state.events);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const filteredEvents = events.filter(
    (event) => !selectedCategory || event.category === selectedCategory
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Добро пожаловать в сервис мероприятий!</h2>
      <p className={styles.description}>
        Здесь вы можете просматривать мероприятия. Для добавления, редактирования или удаления — авторизуйтесь.
      </p>

      <EventFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className={styles.grid}>
        {status === 'loading' ? (
          <p>Загрузка мероприятий...</p>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p className={styles.empty}>Мероприятия пока не добавлены.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
