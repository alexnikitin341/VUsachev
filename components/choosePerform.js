import styles from "../styles/ChoosePerform.module.css";

const ChoosePerform = ({
  inputPerform,
  newScene,
  setNewScene,
  changeState,
  saveNewPerform,
  addNewScene,
  saveImg,
  handleBackButton,
}) => {
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
          <img
            value={inputPerform?.img}
            style={{ width: "100%" }}
            src={inputPerform?.src}
          />

          <input onChange={saveImg} accept="image/*" type="file" />
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
