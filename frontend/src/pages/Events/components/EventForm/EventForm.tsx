import { useState } from 'react';
import { createEvent, updateEvent, deleteEvent } from "@/api/eventService";
import { categories } from '@/constants/categories';
import styles from './EventForm.module.scss';

interface EventFormProps {
  onSuccess: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [eventId, setEventId] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleCreate = async () => {
    try {
      await createEvent({ title, description, date, category });
      setMessage('Мероприятие успешно создано!');
      onSuccess();
    } catch {
      setMessage('Ошибка при создании.');
    }
  };

  const handleUpdate = async () => {
    try {
      await updateEvent(eventId, { title, description, date, category });
      setMessage('Мероприятие успешно обновлено!');
      onSuccess();
    } catch {
      setMessage('Ошибка при обновлении.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(eventId);
      setMessage('Мероприятие успешно удалено!');
      onSuccess();
    } catch {
      setMessage('Ошибка при удалении.');
    }
  };

  return (
    <div className={styles.management}>
      <h3>Управление мероприятиями</h3>
      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.inputGroup}>
        <input type="text" placeholder="ID (для обновления / удаления)" value={eventId} onChange={(e) => setEventId(e.target.value)} />
        <input type="text" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Выберите категорию</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input type="text" placeholder="Дата (например: 2024-06-10)" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div className={styles.buttons}>
        <button className={styles.create} onClick={handleCreate}>Создать</button>
        <button className={styles.update} onClick={handleUpdate}>Обновить</button>
        <button className={styles.delete} onClick={handleDelete}>Удалить</button>
      </div>
    </div>
  );
};

export default EventForm;
