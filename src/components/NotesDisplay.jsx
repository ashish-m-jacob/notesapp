import { React, useState, useEffect } from "react";
import styles from "./NotesDisplay.module.css";

const NotesDisplay = () => {
  const [disabled, setDisabled] = useState(true);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState({
    text: [],
    date: [],
    time: [],
  });

  useEffect(() => {
    const storedNotes = localStorage.getItem(id);

    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);

      setNotes({
        text: [parsedNotes.text],
        date: [parsedNotes.date],
        time: [parsedNotes.time],
      });
    }
  });

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentTitle = localStorage.getItem("currentTitle");
  const iconColor = localStorage.getItem("currentColor");
  const letters = localStorage.getItem("extractedLetters");
  const id = JSON.parse(localStorage.getItem("currentID")).toString();

  const handleChange = (e) => {
    setNote(e.target.value);
    note.length > 1 ? setDisabled(false) : setDisabled(true);
  };

  const convertHours = (hour) => {
    if (hour === 0) {
      return "12";
    } else if (hour > 12) {
      let result = hour - 12;
      return result;
    } else {
      let result = hour;
      return result;
    }
  };

  const handleSubmit = () => {
    const date = new Date();
    const storedNotes = localStorage.getItem(id);

    const dateStamp = `${date.getDay()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;

    const timeStamp = `${convertHours(date.getHours())}:${date.getMinutes()} ${
      date.getHours() >= 12 ? `PM` : `AM`
    }`;

    localStorage.setItem(
      id,
      JSON.stringify({
        text: [...notes.text, note],
        date: [...notes.date, dateStamp],
        time: [...notes.time, timeStamp],
      })
    );

    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);

      setNotes({
        text: [...parsedNotes.text],
        date: [...parsedNotes.date],
        time: [...parsedNotes.time],
      });
    } else {
      setNotes({
        text: [note],
        date: [dateStamp],
        time: [timeStamp],
      });
    }
    document.getElementById("textBox").value = "";
    setNote("");
    setDisabled(true);
  };

  return (
    <div className={styles.notesDisplayContainer}>
      <div className={styles.titleDisplay}>
        <div className={styles.iconDiv} style={{ backgroundColor: iconColor }}>
          <h2>{letters}</h2>
        </div>
        <div className={styles.titleDiv}>
          <h2>{currentTitle}</h2>
        </div>
      </div>

      <div className={styles.messageDisplayDiv}>
        {notes.text.map((note, index) => (
          <div className={styles.noteContainer} key={index}>
            <div className={styles.note}>{note}</div>
          </div>
        ))}
      </div>

      <div className={styles.textBoxDiv}>
        <div className={styles.textBoxContainer}>
          <textarea
            type="text"
            placeholder="Enter your text here......."
            onChange={handleChange}
            id="textBox"
          />
        </div>
        <div className={styles.sendButtonContainer}>
          <button
            className={styles.sendButton}
            disabled={disabled}
            onClick={handleSubmit}
          >
            {" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesDisplay;
