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
    if (login === "1" && password === "1") {
      setUser({ name: "Vadim", role: "user" });
      return router.push("./");
    }
    if (login === "admin" && password === "admin") {
      setUser({ name: "admin", role: "admin" });
      return router.push("./");
    }
    return setError("неверный логин или пароль");
  };
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {error && <div>{error}</div>}
        <input
          className={styles.input}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="login"
        />
        <input
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button onClick={handleClick} className={styles.input}>
          Войти
        </button>
      </div>
    </div>
  );
};

export default Login;
