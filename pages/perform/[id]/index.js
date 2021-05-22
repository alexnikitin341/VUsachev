import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormContext } from "../../../contex/context";
import styles from "../../../styles/Perform.module.css";
import axios from "axios";

const Perform = () => {
  const router = useRouter();
  const { id } = router.query;
  const [perform, setPerform] = useState();

  const { user } = useFormContext();

  const getPerform = () => {
    axios
      .get(`http://localhost:9999/perform/${id}`)
      .then((response) => {
        setPerform(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dedeletePerform = () => {
    axios
      .delete(`http://localhost:9999/perform/${id}`)
      .then((response) => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (id) {
      getPerform();
    }
  }, [id]);

  return (
    <div className={styles.container}>
        <div className={styles.name}>{perform?.name}</div>
      <div className={styles.box}>
        <div className={styles.img}>
          <img style={{ width: "100%", height: "100%" }} src={perform?.src} />
        </div>
        <div>
          <span className={styles.option}>Жанр: </span>
          {perform?.genre}
        </div>
        <div>
          <span className={styles.option}>Режисер: </span>
          {perform?.director}
        </div>
        <div>
          <span className={styles.option}>В ролях: </span>
          {perform?.troupe}
        </div>
        <div>
          <span className={styles.option}>Описание: </span>
          {perform?.description}
        </div>
      </div>
      {user?.role === "admin" && (
        <div className={styles.adminButton}>
          <button
            onClick={() => {
              router.push(`./${id}/change`);
            }}
          >
            Изменить
          </button>
          <button onClick={() => dedeletePerform()}>Удалить</button>
        </div>
      )}

      <button
        className={styles.sceneButton}
        onClick={() => {
          router.push(`./${id}/scenes`);
        }}
      >
        Перейти к сценам
      </button>
      <button className={styles.backButton} onClick={() => router.push("/")}>
        Назад
      </button>
    </div>
  );
};

export default Perform;
