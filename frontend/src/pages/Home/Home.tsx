import { Link } from 'react-router-dom';
import { getUsername } from '@/utils/localStorageUtils';
import styles from './Home.module.scss';

const Home = () => {
  const username = getUsername();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добро пожаловать в сервис мероприятий!</h1>
      <p className={styles.description}>
        Это приложение позволяет вам легко находить интересные мероприятия и принимать в них участие.
      </p>
      {username && (
        <>
          <p className={styles.userInfo}>
            Вы авторизованы как: <strong>{username}</strong>
          </p>
          <Link to="/events" className={styles.link}>
            Перейти к мероприятиям
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
