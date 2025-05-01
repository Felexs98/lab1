import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logoutUser } from '../../api/authService';
import styles from './Header.module.scss';
import Logo from './Logo';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const username = useAppSelector((state) => state.auth.user?.username); // <-- из Redux
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    logoutUser(dispatch); // <-- передаёшь dispatch
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Все мероприятия</Link>
        {isAuthenticated ? (
          <>
            <Link to="/profile" className={styles.link}>Профиль</Link>
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
