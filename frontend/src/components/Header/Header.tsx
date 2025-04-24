import { Link, useNavigate } from 'react-router-dom';
import { getUsername } from '../../utils/localStorageUtils';
import { logoutUser } from '../../api/authService';
import styles from './Header.module.scss';

const Header = () => {
  const username = getUsername();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Мероприятия</h1>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Главная</Link> 
        {username ? (
          <>
            <span className={styles.username}>Привет, {username}!</span>
            <button onClick={handleLogout} className={styles.logoutButton}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.link}>Войти</Link>
            <Link to="/register" className={styles.link}>Регистрация</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
