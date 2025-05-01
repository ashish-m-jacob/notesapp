import { React, useState, useEffect } from "react";
import styles from "./NotesDisplay.module.css";

const NotesDisplay = (props) => {
  const [disabled, setDisabled] = useState(true);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState({
    text: [],
    date: [],
    time: [],
  });
  const textBox = document.getElementById("textBox");

  if (textBox) {
    textBox.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        note === null ? console.log("Cannot add") : handleSubmit();
      }
    });
  }

  useEffect(() => {
    const storedNotes = localStorage.getItem(props.id);

    console.log(props.id);

    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);

      setNotes({
        text: [...parsedNotes.text],
        date: [...parsedNotes.date],
        time: [...parsedNotes.time],
      });
    } else {
      setNotes({
        text: [],
        date: [],
        time: [],
      });
    }
  }, [props.id]);

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

  const handleChange = (e) => {
    setNote(e.target.value);

    note === null || note.length <= 1 ? setDisabled(true) : setDisabled(false);

    console.log(note.length);
  };

  const addZero = (num) => {
    if (num === 0) {
      return "12";
    } else if (num > 12) {
      let result = num - 12;

      if (result < 10) {
        return "0" + result;
      } else {
        return result;
      }
    } else {
      let result = num;
      if (result < 10) {
        return "0" + result;
      } else {
        return result;
      }
    }
  };

  const handleSubmit = () => {
    const date = new Date();
    const dateStamp = `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;

    const timeStamp = `${addZero(date.getHours())}:${addZero(
      date.getMinutes()
    )} ${date.getHours() >= 12 ? `PM` : `AM`}`;

    if (disabled === false) {
      localStorage.setItem(
        props.id,
        JSON.stringify({
          text: [...notes.text, note],
          date: [...notes.date, dateStamp],
          time: [...notes.time, timeStamp],
        })
      );
      setNotes({
        text: [...notes.text, note],
        date: [...notes.date, dateStamp],
        time: [...notes.time, timeStamp],
      });
    }

    document.getElementById("textBox").value = "";
    setNote("");
    setDisabled(true);
  };

  return (
    <div className={styles.notesDisplayContainer}>
      <div className={styles.titleDisplay}>
        <div
          className={styles.iconDiv}
          style={{ backgroundColor: props.color }}
        >
          <h2>{props.initials}</h2>
        </div>
        <div className={styles.titleDiv}>
          <h2>{props.title}</h2>
        </div>
      </div>

      <div className={styles.messageDisplayDiv}>
        {notes.text.map((note, index) => (
          <div className={styles.noteContainer} key={index}>
            <div className={styles.note}>{note}</div>
            <div className={styles.dateTime}>
              <p className={styles.date}>{notes.date[index]}</p>
              <ul>
                <li className={styles.time}>{notes.time[index]}</li>
              </ul>
            </div>
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
