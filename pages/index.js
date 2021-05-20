import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormContext } from "../contex/context";
import styles from "../styles/Home.module.css";

const Home = () => {
  const { user, setUser, performs } = useFormContext();
  const router = useRouter();

  return (
    <div className={styles.container}>
      {performs &&
        performs.map((perform) => (
          <div
            key={perform.id}
            className={styles.perform}
            onClick={() => {
              router.push(`./perform/${perform.id}`);
            }}
          >
            {perform.name}
          </div>
        ))}
      {user?.role === "admin" && (
        <button
          className={styles.buttonAdd}
          onClick={() => {
            router.push(`/add-perform`);
          }}
        >
          добавить представление
        </button>
      )}

      <button
        className={styles.buttonLogin}
        onClick={() => {
          router.push(`/login`);
        }}
      >
        разлогин
      </button>
    </div>
  );
};
export default Home;
