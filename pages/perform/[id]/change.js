import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useFormContext } from "../../../contex/context";
import styles from "../../../styles/ChangePerform.module.css";
import axios from "axios";

const ChangePerform = () => {
  const router = useRouter();
  const { id } = router.query;
  const [inputPerform, setInputPerform] = useState({});
  const [newScene, setNewScene] = useState({ name: "", description: "" });

  const { user } = useFormContext();

  const getPerform = () => {
    axios.get(`http://localhost:9999/perform/${id}`).then((response) => {
      setInputPerform(response.data);
      console.log("perform", response.data);
    });
  };

  useEffect(() => {
    if (id) {
      getPerform();
    }
  }, [id]);

  const changeState = (e) => {
    setInputPerform((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const saveNewPerform = () => {
    if (user.role !== "admin") {
      return;
    }
    
    const newPerform = { ...inputPerform };
    delete newPerform._id;
    console.log("---newPerform", newPerform);
    axios
      .put(`http://localhost:9999/perform/${id}`, { ...newPerform })
      .then((response) => {
        console.log("perform", response.data);
      });
  };

  const addNewScene = () => {
    if (newScene.name && newScene.description) {
      setInputPerform((perform) => ({
        ...inputPerform,
        scenes: [
          ...perform.scenes,
          {
            id: perform.scenes.length + 2,
            active: false,
            ...newScene,
          },
        ],
      }));

      setNewScene({});
    }
  };

  return (
    <div className={styles.container}>
      <input value={inputPerform?.name} onChange={changeState} name={"name"} />

      <div>
        <img
          style={{ widows: "100%", height: "100px" }}
          src={inputPerform?.src}
        />
      </div>

      <input
        value={inputPerform?.genre}
        onChange={changeState}
        name={"genre"}
      />
      <input
        value={inputPerform?.director}
        onChange={changeState}
        name={"director"}
      />
      <textarea
        value={inputPerform?.troupe}
        onChange={changeState}
        name={"troupe"}
      />
      <textarea
        value={inputPerform?.description}
        onChange={changeState}
        name={"description"}
      />

      {inputPerform?.scenes?.map((scene) => (
        <div key={scene.id}>
          {scene.name} <button>удалить</button>
          {scene.description} <button>удалить</button>
        </div>
      ))}

      <div>
        <input
          value={newScene.name}
          placeholder="name"
          onChange={(e) =>
            setNewScene((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <textarea
          placeholder="description"
          value={newScene.description}
          onChange={(e) =>
            setNewScene((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <button onClick={() => addNewScene()}>добавить сцену</button>
      </div>

      <button
        onClick={() => {
          saveNewPerform();
        }}
      >
        сохранить изменения
      </button>
      <button onClick={() => router.push(`/perform/${id}`)}>назад</button>
    </div>
  );
};

export default ChangePerform;
