import { categories } from '@/constants/categories';
import styles from './EventFilter.module.scss';

interface EventFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const EventFilter: React.FC<EventFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.title}>Фильтр по категориям:</h3>
      <div className={styles.buttonGroup}>
        <button
          className={!selectedCategory ? `${styles.button} ${styles.active}` : styles.button}
          onClick={() => onSelectCategory(null)}
        >
          Все категории
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? `${styles.button} ${styles.active}` : styles.button}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventFilter;
