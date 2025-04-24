import styles from './Login.module.scss';
import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <div className={styles.container}>
      <h2>Вход в систему</h2>
      <LoginForm />

    </div>

  );
};

export default Login;
