import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { loginUser } from '@/api/authService';
import Notification from '@/components/Notification/Notification';
import styles from './Login.module.scss';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotification(null);

    try {
      await loginUser(email, password, dispatch); // <-- напрямую через loginUser
      navigate('/profile'); // после успешного логина
    } catch (error: any) {
      setNotification({ message: error?.message || 'Ошибка авторизации', type: 'error' });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Вход в аккаунт</h2>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>Войти</button>
      </form>

      <p className={styles.loginLink}>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
      <p className={styles.backToMain}>
        <Link to="/">← Вернуться на главную</Link>
      </p>
    </div>
  );
};

export default Login;
