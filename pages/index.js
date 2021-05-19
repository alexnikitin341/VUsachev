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
            onClick={() => {
              router.push(`./perform/${perform.id}`);
            }}
          >
            {perform.name}
          </div>
        ))}
      {user?.role === "admin" && (
        <button
          onClick={() => {
            router.push(`/add-perform`);
          }}
        >
          добавить представление
        </button>
      )}

      <button
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
