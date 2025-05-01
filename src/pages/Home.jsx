import { React, useState, useEffect } from "react";

import styles from "./Home.module.css";
import BaseNotes from "../components/BaseNotes";
import NotesDisplay from "../components/NotesDisplay";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [titles, setTitles] = useState({
    title: [],
    color: [],
  });

  const [notesSelected, isNotesSelected] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [initials, setInitials] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  useEffect(() => {
    const storedTitles = localStorage.getItem("titles");

    if (storedTitles) {
      const parsedTitles = JSON.parse(storedTitles);
      setTitles({
        title: [...parsedTitles.title],
        color: [...parsedTitles.color],
      });
    }
  }, [groupName]);

  const isRepeated = () => {
    return titles.title.includes(note);
  };

  const handleCreate = () => {
    const storedTitles = localStorage.getItem("titles");
    if (titles && isRepeated) {
      alert("You cannot create groups with the same name!");
    } else {
      if (groupName === "" || selectedColor === null) {
        alert("Please fill all the fields");
      } else {
        //add stored titles to the state

        alert("Group Created!");

        localStorage.setItem(
          "titles",
          JSON.stringify({
            title: [...titles.title, groupName],
            color: [...titles.color, selectedColor],
          })
        );

        if (storedTitles) {
          const parsedTitles = JSON.parse(storedTitles);

          setTitles({
            title: [...parsedTitles.title],
            color: [...parsedTitles.color],
          });
        } else {
          setTitles({
            title: [groupName],
            color: [selectedColor],
          });
        }

        setGroupName("");
        setSelectedColor(null);
        setModalOpen(false);
      }
    }
  };

  const extractLetters = (title) => {
    //get letters from first two words of title
    const words = title.split(" ");

    const letters = words.map((word) => word.charAt(0).toUpperCase()).join("");

    return letters.length > 2 ? letters.slice(0, 2) : letters;
  };

  const selectColor = (color) => {
    const colorBoxes = document.querySelectorAll(`.${styles.colorBox}`);

    colorBoxes.forEach((box) => {
      box.classList.remove(styles.selected);
    });

    document.getElementById(color).classList.add(styles.selected);

    setSelectedColor(color);
  };

  const selectTitle = (title, index) => () => {
    document.querySelectorAll(`.${styles.titleContainer}`).forEach((box) => {
      box.classList.remove(styles.selectedTitle);
    });

    document.getElementById(index).classList.add(styles.selectedTitle);

    isNotesSelected(true);

    setTitle(title);
    setColor(titles.color[index]);
    setInitials(extractLetters(title));
    setId(index);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.titlesContainer}>
        <div className={styles.titlesHeading}>
          <h1>Pocket Notes</h1>
        </div>

        <div className={styles.titlesList}>
          {titles.title.map((title, index) => (
            <div
              className={styles.titleContainer}
              key={index}
              id={index}
              onClick={selectTitle(title, index)}
            >
              <div className={styles.logoContainer}>
                <div
                  className={styles.titleColor}
                  style={{ backgroundColor: titles.color[index] }}
                >
                  <h4>{extractLetters(title)}</h4>
                </div>
              </div>

              <div key={index} className={styles.titleBox}>
                <h4>{title}</h4>
              </div>
            </div>
          ))}
        </div>

        {modalOpen && (
          <div className={styles.modal}>
            <div
              className={styles.overlay}
              onClick={() => setModalOpen(false)}
            ></div>
            <div className={styles.modalContent}>
              <h3>Create New Group</h3>

              <div className={styles.groupName}>
                <h4>Group Name</h4>
                <input
                  type="text"
                  placeholder="Enter group name"
                  onChange={(e) => {
                    setGroupName(e.target.value);
                  }}
                />
              </div>

              <div className={styles.chooseColor}>
                <h4>Choose colour</h4>
                <div className={styles.colorChoice}>
                  {colors.map((color) => (
                    <div
                      key={color}
                      id={color}
                      className={styles.colorBox}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        selectColor(color);
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={handleCreate}>Create</button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.titlesAdd}>
          <button
            id="openModal"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.notesContainer}>
        {notesSelected ? (
          <NotesDisplay
            id={id}
            title={title}
            color={color}
            initials={initials}
          />
        ) : (
          <BaseNotes />
        )}
      </div>
    </div>
  );
};

export default Home;
