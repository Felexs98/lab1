import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/api/authService';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password); // <-- отправка запроса при клике
      navigate('/events');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as {
          response?: { data?: { message?: string }; status?: number };
        };
        setError(
          `Ошибка: ${axiosError.response?.data?.message || 'Не удалось...'}`,
        );
      } else {
        setError('Неизвестная ошибка');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <ErrorMessage message={error} />}
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
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;
