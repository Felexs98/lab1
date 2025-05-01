import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { registerThunk } from '@/features/auth/authSlice';
import Notification from '@/components/Notification/Notification';
import styles from './Register.module.scss';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authError = useAppSelector((state) => state.auth.error);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    try {
      await dispatch(registerThunk({ email, name, password })).unwrap();
      setNotification({ message: 'Регистрация прошла успешно!', type: 'success' });

      setTimeout(() => {
        navigate('/login', { state: { successMessage: 'Регистрация прошла успешно!' } });
      }, 1000);
    } catch (error: any) {
      setNotification({ message: error || 'Ошибка регистрации', type: 'error' });
    }
  };

  return (
    <div className={styles.container}>
      <h2>Регистрация</h2>

      {(notification || authError) && (
        <Notification
          message={notification?.message || authError || ''}
          type={notification?.type || 'error'}
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
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>Зарегистрироваться</button>
      </form>

      <p className={styles.loginLink}>
        Уже есть аккаунт? <Link to="/login" className={styles.link}>Войти</Link>
      </p>

      <p className={styles.backToMain}>
        <Link to="/" className={styles.link}>← Вернуться на главную</Link>
      </p>
    </div>
  );
};

export default Register;
