import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormContext } from "../contex/context";
import styles from "../styles/Home.module.css";
import axios from "axios";

const Home = () => {
  const { user } = useFormContext();
  const router = useRouter();

  const [performs, setPerforms] = useState();

  const getPerforms = () => {
    axios
      .get("https://usachevserver.herokuapp.com/performs")
      .then((response) => {
        setPerforms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPerforms();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Список представлений</div> 
      {performs &&
        performs.map((perform) => (
          <div
            key={perform._id}
            className={styles.perform}
            onClick={() => {
              router.push(`./perform/${perform._id}`);
            }}
          >
            {perform.name}
          </div>
        ))}
      {user?.role === "admin" && (
        <button
          className={styles.buttonAdd}
          onClick={() => {
            router.push(`/add-perform`);
          }}
        >
          Добавить представление
        </button>
      )}

      <button
        className={styles.buttonLogin}
        onClick={() => {
          router.push(`/login`);
        }}
      >
        Выйти
      </button>
    </div>
  );
};
export default Home;
