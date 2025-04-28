import styles from './EventCard.module.scss';
import { Event } from '../types/event';
import EventParticipants from './EventParticipants';

interface EventCardProps {
  event: Event;
  onDelete?: () => void;
  onEdit?: () => void;
  currentUserId: string;
  onRefresh?: () => void;
}

const EventCard = ({ event, onDelete, onEdit, currentUserId, onRefresh }: EventCardProps) => {
  const isMyEvent = event.createdBy === currentUserId;

  const handleDeleteClick = () => {
    if (onDelete) onDelete();
  };

  const handleEditClick = () => {
    if (onEdit) onEdit();
  };

  return (
    <div className={styles.card}>
      {onDelete && (
        <button className={styles.deleteButton} onClick={handleDeleteClick}>×</button>
      )}
      <div className={styles.titleWrapper}>
        <h3>{event.title}</h3>
      </div>
      <p className={styles.description}>{event.description}</p>
      <p className={styles.date}>
        <strong>Дата:</strong> {event.date}
      </p>

      {/* Компонент для участников, без модалки */}
      <EventParticipants
        eventId={event.id}
        createdBy={event.createdBy}
        participantsCount={event.participantsCount || 0}
        onRefresh={onRefresh} // Пробрасываем onRefresh
      />

      {isMyEvent && onEdit && (
        <button className={styles.editButton} onClick={handleEditClick}>
          Редактировать
        </button>
      )}
    </div>
  );
};

export default EventCard;
