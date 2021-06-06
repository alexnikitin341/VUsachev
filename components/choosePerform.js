import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "../styles/ChoosePerform.module.css";

const ChoosePerform = ({
  setInputPerform,
  inputPerform,
  newScene,
  setNewScene,
  changeState,
  saveNewPerform,
  addNewScene,
  handleBackButton,
}) => {
  const deleteScene = (sceneId) => {
    setInputPerform((perform) => ({
      ...inputPerform,
      scenes: [...perform.scenes].filter((scene) => sceneId !== scene.id),
    }));
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onDrop = useCallback(async (acceptedFiles) => {
    const img = await toBase64(acceptedFiles[0]);

    setInputPerform((perform) => ({
      ...perform,
      src: img,
    }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <input
          value={inputPerform?.name}
          onChange={changeState}
          name={"name"}
          placeholder="Введите название представления"
        />

        <div className={styles.img}>
          <div {...getRootProps()} className={styles.dropZone}>
            <input {...getInputProps()} />
            {inputPerform?.src ? (
              <img style={{ width: "100%" }} src={inputPerform?.src} />
            ) : (
              <div>Выберите изображение</div>
            )}
          </div>
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
          <div key={scene.id} className={styles.containerScene}>
            {scene.name}
            {scene.id !== 1 && scene.id !== 999 && (
              <hr style={{ width: "100%" }} />
            )}
            {scene.description}
            {scene.id !== 1 && scene.id !== 999 && (
              <button
                onClick={() => {
                  deleteScene(scene.id);
                }}
                className={styles.deleteButton}
              >
                Удалить сцену
              </button>
            )}
          </div>
        ))}

        <div className={styles.boxScene}>
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

      <button className={styles.backButton} onClick={handleBackButton}>
        Назад
      </button>
    </div>
  );
};

export default ChoosePerform;
