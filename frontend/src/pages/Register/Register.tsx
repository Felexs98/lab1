import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '@/api/authService';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import styles from './Register.module.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');        // ← переменная для name
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Отправляю:', { email, name, password }); // ← для проверки
      await registerUser(email, name, password);            // ← правильный порядок!
      navigate('/login');
    } catch (err) {
      setError('Ошибка регистрации');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Регистрация</h2>
      {error && <ErrorMessage message={error} />}
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
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
    </div>
  );
};

export default Register;
