import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useFormContext } from "../../../contex/context";
import styles from "../../../styles/ChangePerform.module.css";

const ChangePerform = () => {
  const router = useRouter();
  const { id } = router.query;
  const [inputPerform, setInputPerform] = useState({});
  const [newScene, setNewScene] = useState("");

  const { user, performs, setPerforms } = useFormContext();
  console.log("---performs", performs);
  const perform = useMemo(
    () => performs?.find((perform) => perform.id == id),
    [performs]
  );

  useEffect(() => {
    if (perform) {
      setInputPerform(perform);
    }
  }, [perform]);

  const changeState = (e) => {
    setInputPerform((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const saveNewPerform = (sceneId) => {
    if (user.role !== "admin") {
      return;
    }
    setPerforms((previous) =>
      [...previous].map((perform) =>
        perform.id != id
          ? { ...perform }
          : {
              ...inputPerform,
            }
      )
    );
  };

  const addNewScene = () => {
    if (newScene) {
      setPerforms((previous) =>
        [...previous].map((perform) =>
          perform.id != id
            ? { ...perform }
            : {
                ...inputPerform,
                scenes: [
                  ...perform.scenes,
                  {
                    id: perform.scenes.length + 2,
                    name: newScene,
                    active: false,
                  },
                ],
              }
        )
      );
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
        <div>
          {scene.name} <button>удалить</button>
        </div>
      ))}

      <div>
        <input value={newScene} onChange={(e) => setNewScene(e.target.value)} />
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
