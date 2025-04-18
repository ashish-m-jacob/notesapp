import { React, useState } from "react";

import styles from "./Home.module.css";
import BaseNotes from "../components/BaseNotes";
import NotesDisplay from "../components/NotesDisplay";
import Titles from "../components/Titles";

const Home = () => {
  const [notesOpen, setNotesOpen] = useState(false);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.titlesContainer}>
        <Titles />
      </div>
      <div className={styles.notesContainer}>
        {notesOpen ? <BaseNotes /> : <NotesDisplay />}
      </div>
    </div>
  );
};

export default Home;
