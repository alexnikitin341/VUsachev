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
    axios.get(`http://localhost:9999/perform/${id}`).then((response) => {
      setPerform(response.data);
      console.log("perform", response.data);
    });
  };

  const dedeletePerform = () => {
    axios.delete(`http://localhost:9999/perform/${id}`).then((response) => {
      console.log("perform", response.data);
      router.push("/");
    });
  };

  useEffect(() => {
    getPerform();
  }, [id]);

  return (
    <div className={styles.container}>
      <div>{perform?.name}</div>
      <div>
        <img style={{ widows: "100%", height: "100px" }} src={perform?.src} />
      </div>
      <div>{perform?.genre}</div>
      <div>{perform?.director}</div>
      <div>{perform?.troupe}</div>
      <div>{perform?.description}</div>

      {user.role === "admin" && (
        <div>
          <button
            onClick={() => {
              router.push(`./${id}/change`);
            }}
          >
            изменить
          </button>
          <button onClick={() => dedeletePerform()}>удалить</button>
        </div>
      )}

      <button
        onClick={() => {
          router.push(`./${id}/scenes`);
        }}
      >
        перейти к сценам
      </button>
      <button onClick={() => router.push("/")}>назад</button>
    </div>
  );
};

export default Perform;
