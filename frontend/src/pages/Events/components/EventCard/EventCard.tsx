import { Event } from '../../types/event';
import styles from '@/pages/Events/Events.module.scss';
import CopyableId from '@/components/CopyableId/CopyableId';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <div className={styles.card}>
    <h3>{event.title}</h3>
    <p>{event.description}</p>
    <p><strong>Дата:</strong> {event.date}</p>
    <p><strong>Категория:</strong> {event.category}</p>
    <CopyableId id={event.id} />
  </div>
);

export default EventCard;
