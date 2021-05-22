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
      style={{ background: scene.active && "green" }}
      onClick={() => changeActiveScene(scene.id)}
    >
      <div>{scene.name}</div>
      {scene.id === selctSceneId && <div>{scene.description}</div>}
    </div>
  );
};

export default Scene;
