import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
// import imageToBase64 from "image-to-base64";
import { useFormContext } from "../contex/context";
import styles from "../styles/AddPerform.module.css";

const AddPerform = () => {
  const router = useRouter();

  const [inputPerform, setInputPerform] = useState({ scenes: [] });
  const [newScene, setNewScene] = useState({ name: "", description: "" });

  const { user } = useFormContext();

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

    axios
      .post("http://localhost:9999/perform", { ...inputPerform })
      .then((response) => {
        console.log("perform", response.data);
        router.push(`/`);
      })
      .catch((error) => {
        console.log(error);
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

  const saveImg = (e) => {
    // imageToBase64(e.target.files)
    //   .then((response) => {
    //     setInputPerform((perform) => ({ ...perform, src: response })); // "cGF0aC90by9maWxlLmpwZw=="
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <div className={styles.container}>
      <input
        value={inputPerform?.name}
        onChange={changeState}
        name={"name"}
        placeholder="name"
      />

      <div>
        <img
          style={{ widows: "100%", height: "100px" }}
          src={inputPerform?.src}
        />

        <input onChange={saveImg} accept="image/*" type="file" />
      </div>

      <input
        value={inputPerform?.genre}
        onChange={changeState}
        name={"genre"}
        placeholder="genre"
      />
      <input
        value={inputPerform?.director}
        onChange={changeState}
        name={"director"}
        placeholder="director"
      />
      <textarea
        value={inputPerform?.troupe}
        onChange={changeState}
        name={"troupe"}
        placeholder="troupe"
      />
      <textarea
        value={inputPerform?.description}
        onChange={changeState}
        name={"description"}
        placeholder="description"
      />

      {inputPerform?.scenes?.map((scene) => (
        <div>
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
        сохранить новое представление
      </button>
      <button onClick={() => router.push(`/`)}>назад</button>
    </div>
  );
};

export default AddPerform;
