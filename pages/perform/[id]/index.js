import { useState } from "react";
import { useRouter } from "next/router";
import { useFormContext } from "../../../contex/context";
import styles from "../../../styles/Perform.module.css";

const Perform = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user, performs, setPerforms } = useFormContext();
  

  const perform = performs.find((perform) => perform.id == id);
  const dedeletePerform = () => {
    router.push("/");
    setPerforms((previous) =>
      [...previous].filter((perform) => perform.id != id)
    );
  };

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
