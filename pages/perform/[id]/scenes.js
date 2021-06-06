import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFormContext } from "../../../contex/context";
import styles from "../../../styles/Scenes.module.css";
import axios from "axios";
import Scene from "../../../components/scene";

const Scenes = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useFormContext();
  const [perform, setPerform] = useState();
  const [selctSceneId, setSelctSceneId] = useState();

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
      .put(`https://usachevserver.herokuapp.com/perform/${id}`, {
        ...newPerform,
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const getPerform = () => {
    axios
      .get(`https://usachevserver.herokuapp.com/perform/${id}`)
      .then((response) => {
        setPerform(response.data);
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
      {perform?.scenes.map((scene) => (
        <Scene
          key={scene.id}
          scene={scene}
          selctSceneId={selctSceneId}
          setSelctSceneId={setSelctSceneId}
          changeActiveScene={changeActiveScene}
        />
      ))}

      <button
        className={styles.backButton}
        onClick={() => {
          router.push(`/perform/${id}`);
        }}
      >
        Назад
      </button>
    </div>
  );
};

export default Scenes;
