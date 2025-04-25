import React from "react";
import styles from "./NotesDisplay.module.css";

const NotesDisplay = () => {
  const currentTitle = localStorage.getItem("currentTitle");
  const iconColor = localStorage.getItem("currentColor");

  return (
    <div className={styles.notesDisplayContainer}>
      <div className={styles.titleDisplay}>
        <div className={styles.iconDiv}></div>
        <div className={styles.titleDiv}></div>
      </div>

      <div className={styles.messageDisplayDiv}></div>

      <div className={styles.textBoxDiv}></div>
    </div>
  );
};

export default NotesDisplay;
