import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useFormContext } from "../contex/context";
import ChoosePerform from "../components/choosePerform";

const AddPerform = () => {
  const router = useRouter();
  const initialScene = [
    { id: 1, name: "Представление еще не началось", active: true },
    { id: 999, name: "Представление закончилось", active: false },
  ];

  const [inputPerform, setInputPerform] = useState({
    scenes: [...initialScene],
  });
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
        router.push(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewScene = () => {
    if (newScene.name && newScene.description) {
      setInputPerform((perform) => {
        let newScenes = [...perform.scenes];
        const lastScene = newScenes.pop();
        return {
          ...inputPerform,
          scenes: [
            ...newScenes,
            {
              id: perform.scenes.length + 2,
              active: false,
              ...newScene,
            },
            lastScene,
          ],
        };
      });

      setNewScene({ name: "", description: "" });
    }
  };

  const handleBackButton = () => {
    router.push(`/`);
  };

  return (
    <ChoosePerform
      setInputPerform={setInputPerform}
      inputPerform={inputPerform}
      newScene={newScene}
      setNewScene={setNewScene}
      changeState={changeState}
      saveNewPerform={saveNewPerform}
      addNewScene={addNewScene}
      handleBackButton={handleBackButton}
    />
  );
};

export default AddPerform;
