import { useRef } from "react";
import styles from "../styles/Scene.module.css";
import useOutsideClick from "../hooks/useOutsideClick";

const Scene = ({ scene, selctSceneId, setSelctSceneId, changeActiveScene }) => {
  const ref = useRef();
  useOutsideClick(ref, () => setSelctSceneId());

  return (
    <div
      className={styles.container}
      key={scene.id}
      ref={ref}
      style={{
        background: scene.active && " #ac9a81",
        color: scene.active && " black",
      }}
      onClick={() => changeActiveScene(scene.id)}
    >
      <div>{scene.name}</div>
      {scene.id === selctSceneId && (
        <div>
          <hr />
          {scene.description}
        </div>
      )}
    </div>
  );
};

export default Scene;
