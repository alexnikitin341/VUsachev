import { useState } from "react";
import { useRouter } from "next/router";
import { useFormContext } from "../../../contex/context";
import styles from "../../../styles/Scenes.module.css";

const Scenes = () => {
  const router = useRouter();
  const { id } = router.query;

  const { user, performs, setPerforms } = useFormContext();

  const perform = performs.find((perform) => perform.id == id);

  const changeActiveScene = (sceneId) => {
    if (user.role !== "admin") {
      return;
    }
    setPerforms((previous) =>
      [...previous].map((perform) =>
        perform.id != id
          ? { ...perform }
          : {
              ...perform,
              scenes: perform.scenes.map((item) =>
                item.id == sceneId
                  ? { ...item, active: true }
                  : { ...item, active: false }
              ),
            }
      )
    );
  };

  return (
    <div className={styles.container}>
      <div>{perform?.name}</div>
      {perform?.scenes.map((scene) => (
        <div
          key={scene.id}
          style={{ background: scene.active && "green" }}
          onClick={() => changeActiveScene(scene.id)}
        >
          {scene.name}
        </div>
      ))}

      <button
        onClick={() => {
          router.push(`/perform/${id}`);
        }}
      >
        назад
      </button>
    </div>
  );
};

export default Scenes;
