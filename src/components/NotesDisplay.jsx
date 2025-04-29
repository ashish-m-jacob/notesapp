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

  //details from titles
  const currentTitle = localStorage.getItem("currentTitle");
  const color = localStorage.getItem("currentColor");
  const firstLetters = localStorage.getItem("extractedLetters");
  const id = localStorage.getItem("currentID");

  // const [details, setDetails] = useState({
  //   title: localStorage.getItem("currentTitle"),
  //   bgColor: localStorage.getItem("currentColor"),
  //   initials: localStorage.getItem("extractedLetters"),
  // });

  useEffect(() => {
    const storedNotes = localStorage.getItem(id.toString());

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
  }, [id]);

  // useEffect(() => {
  //   setDetails({
  //     title: currentTitle,
  //     bgColor: color,
  //     initials: firstLetters,
  //   });

  //   console.log("titles useEffect is triggered");
  // }, [currentTitle]);
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
    note.length > 1 ? setDisabled(false) : setDisabled(true);
  };

  const convertHours = (hour) => {
    if (hour === 0) {
      return "12";
    } else if (hour > 12) {
      let result = hour - 12;

      if (result < 10) {
        return "0" + result;
      } else {
        return result;
      }
    } else {
      let result = hour;
      if (result < 10) {
        return "0" + result;
      } else {
        return result;
      }
    }
  };

  const handleSubmit = () => {
    const date = new Date();

    const dateStamp = `${date.getDay()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;

    const timeStamp = `${convertHours(date.getHours())}:${date.getMinutes()} ${
      date.getHours() >= 12 ? `PM` : `AM`
    }`;

    setNotes({
      text: [...notes.text, note],
      date: [...notes.date, dateStamp],
      time: [...notes.time, timeStamp],
    });

    localStorage.setItem(id.toString(), JSON.stringify(notes));
    document.getElementById("textBox").value = "";
    setNote("");
    setDisabled(true);
    console.log(notes);
  };

  return (
    <div className={styles.notesDisplayContainer}>
      <div className={styles.titleDisplay}>
        <div className={styles.iconDiv} style={{ backgroundColor: color }}>
          <h2>{firstLetters}</h2>
        </div>
        <div className={styles.titleDiv}>
          <h2>{currentTitle}</h2>
        </div>
      </div>

      <div className={styles.messageDisplayDiv}>
        {notes.text.map((note, index) => (
          <div className={styles.noteContainer} key={index}>
            <div className={styles.note}>{note}</div>
            <div className={styles.date}>{notes.date[index]}</div>
            <div className={styles.time}>{notes.time[index]}</div>
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
