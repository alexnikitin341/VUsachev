import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useFormContext } from "../../../contex/context";
import styles from "../../../styles/Scenes.module.css";
import axios from "axios";
import useOutsideClick from "../../../hooks/useOutsideClick";

const Scenes = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useFormContext();
  const [perform, setPerform] = useState();
  const [selctSceneId, setSelctSceneId] = useState();
  const ref = useRef();
  useOutsideClick(ref, () => setSelctSceneId());

  const changeActiveScene = (sceneId) => {
    setSelctSceneId(sceneId);
    if (user.role !== "admin") {
      return;
    }

    const newPerform = {
      ...perform,
      scenes: perform.scenes.map((item) =>
        item.id == sceneId
          ? { ...item, active: true }
          : { ...item, active: false }
      ),
    };
    delete newPerform._id;

    setPerform(newPerform);

    axios
      .put(`http://localhost:9999/perform/${id}`, { ...newPerform })
      .then((response) => {
        console.log("perform", response.data);
      });
  };

  const getPerform = () => {
    axios.get(`http://localhost:9999/perform/${id}`).then((response) => {
      setPerform(response.data);
      console.log("perform", response.data);
    });
  };

  useEffect(() => {
    if (id) {
      getPerform();
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <div>{perform?.name}</div>
      {perform?.scenes.map((scene) => (
        <div
          key={scene.id}
          ref={ref}
          style={{ background: scene.active && "green" }}
          onClick={() => changeActiveScene(scene.id)}
        >
          <div>{scene.name}</div>
          {scene.id === selctSceneId && <div>{scene.description}</div>}
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
