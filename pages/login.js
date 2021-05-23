import { useState } from "react";
import { useRouter } from "next/router";
import { useFormContext } from "../contex/context";
import styles from "../styles/Login.module.css";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { setUser } = useFormContext();

  const handleClick = () => {
    if (login === "admin" && password === "admin") {
      setUser({ name: "admin", role: "admin" });
      return router.push("./");
    }
    return setError("Неверный логин или пароль");
  };

  const handleClickGoToPerforms = () => {
    setUser({ name: "user", role: "user" });
    return router.push("./");
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {error && <div>{error}</div>}
        <input
          className={styles.input}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Логин"
        />
        <input
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />

        <button onClick={handleClick} className={styles.button}>
          Войти как администратор
        </button>

        <button
          onClick={handleClickGoToPerforms}
          className={styles.buttonPerforms}
        >
          Перейти к программке
        </button>
      </div>
    </div>
  );
};

export default Login;
