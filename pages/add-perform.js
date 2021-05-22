import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
// import imageToBase64 from "image-to-base64";
import { useFormContext } from "../contex/context";
import styles from "../styles/AddPerform.module.css";
import ChoosePerform from "../components/choosePerform";

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

  const handleBackButton = () => {
    router.push(`/`);
  };

  return (
    <ChoosePerform
      inputPerform={inputPerform}
      newScene={newScene}
      setNewScene={setNewScene}
      changeState={changeState}
      saveNewPerfor={saveNewPerform}
      addNewScene={addNewScene}
      saveImg={saveImg}
      handleBackButton={handleBackButton}
    />
  );

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <input
          value={inputPerform?.name}
          onChange={changeState}
          name={"name"}
          placeholder="Введите название представления"
        />

        <div>
          <img style={{ widows: "100%" }} src={inputPerform?.src} />

          <input
            onChange={saveImg}
            accept="image/*"
            type="file"
            placeholder="11"
          />
        </div>

        <input
          value={inputPerform?.genre}
          onChange={changeState}
          name={"genre"}
          placeholder="Введите жанр"
        />

        <input
          value={inputPerform?.director}
          onChange={changeState}
          name={"director"}
          placeholder="Введите режиссера"
        />

        <textarea
          value={inputPerform?.troupe}
          onChange={changeState}
          name={"troupe"}
          placeholder="Введите актеров и роли"
        />

        <textarea
          value={inputPerform?.description}
          onChange={changeState}
          name={"description"}
          placeholder="Введите описание"
        />

        {inputPerform?.scenes?.map((scene) => (
          <div className={styles.containerScene}>
            {scene.name}
            <hr style={{ width: "100%" }} />
            {scene.description}
            <button className={styles.deleteButton}>Удалить</button>
          </div>
        ))}

        <div className={styles.boxScene}>
          {/* <div className={styles.boxSceneInput}> */}
          <input
            value={newScene.name}
            placeholder="Введите название сцены"
            onChange={(e) =>
              setNewScene((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <textarea
            placeholder="Введите описнаие сцены"
            value={newScene.description}
            onChange={(e) =>
              setNewScene((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          {/* </div> */}
          <button onClick={() => addNewScene()}>Добавить сцену</button>
        </div>
      </div>

      <button
        className={styles.saveButton}
        onClick={() => {
          saveNewPerform();
        }}
      >
        Сохранить новое представление
      </button>

      <button className={styles.backButton} onClick={() => router.push(`/`)}>
        Назад
      </button>
    </div>
  );
};

export default AddPerform;
