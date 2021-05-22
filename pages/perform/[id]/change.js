import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useFormContext } from "../../../contex/context";
import styles from "../../../styles/ChangePerform.module.css";
import axios from "axios";
import ChoosePerform from "../../../components/choosePerform";

const ChangePerform = () => {
  const router = useRouter();
  const { id } = router.query;
  const [inputPerform, setInputPerform] = useState({});
  const [newScene, setNewScene] = useState({ name: "", description: "" });

  const { user } = useFormContext();

  const getPerform = () => {
    axios
      .get(`http://localhost:9999/perform/${id}`)
      .then((response) => {
        setInputPerform(response.data);
        console.log("perform", response.data);
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
  const handleBackButton = () => {
    router.push(`/`);
  };

  const saveImg = () => {};

  return (
    <ChoosePerform
    setInputPerform={setInputPerform}
      inputPerform={inputPerform}
      newScene={newScene}
      setNewScene={setNewScene}
      changeState={changeState}
      saveNewPerform={saveNewPerform}
      addNewScene={addNewScene}
      saveImg={saveImg}
      handleBackButton={handleBackButton}
    />
  );
};

export default ChangePerform;
