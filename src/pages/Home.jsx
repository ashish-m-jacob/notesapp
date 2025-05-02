import { React, useState, useEffect } from "react";
import toast from "react-hot-toast";

import styles from "./Home.module.css";
import BaseNotes from "../components/BaseNotes";
import NotesDisplay from "../components/NotesDisplay";

const Home = () => {
  const mQuery = window.matchMedia("(max-width: 769px)");
  const [modalOpen, setModalOpen] = useState(false);
  const [titles, setTitles] = useState({
    title: [],
    color: [],
  });

  const [notesSelected, setNotesSelected] = useState(false);
  const [notesView, setNotesView] = useState(false);

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

  const updateNotesView = (val) => {
    setNotesView(val);
  };

  const titlesContainer = document.getElementById("titlesContainer");

  const notesContainer = document.getElementById("notesContainer");

  const addButton = document.getElementById("openModal");

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

  mQuery.addEventListener("change", () => {
    mobileView(mQuery);
  });

  const isRepeated = () => {
    let result = false;

    for (let i = 0; i < titles.title.length; i++) {
      if (groupName === titles.title[i]) {
        result = true;
      }
    }
    return result;
  };

  const handleCreate = () => {
    const storedTitles = localStorage.getItem("titles");
    const checkRepeat = isRepeated();

    if (groupName === "" || selectedColor === null) {
      toast.error("Please fill all the fields");
    } else if (checkRepeat === true) {
      toast.error("Duplicate groups cannot be created!");
    } else {
      //add stored titles to the state

      toast.success("Group created!");

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

    setNotesSelected(true);
    setNotesView(true);
    setTitle(title);
    setColor(titles.color[index]);
    setInitials(extractLetters(title));
    setId(index);
  };

  const mobileView = (query) => {
    if (query.matches) {
      if (titlesContainer && notesContainer) {
        if (notesView) {
          titlesContainer.style.display = "none";
          notesContainer.style.display = "block";
          addButton.style.display = "none";
        } else {
          notesContainer.style.display = "none";
          titlesContainer.style.display = "block";
          addButton.style.display = "block";
        }
      }
    } else {
      titlesContainer.style.display = "flex";
      notesContainer.style.display = "block";
      addButton.style.display = "block";
    }
  };
  mobileView(mQuery);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.titlesContainer} id="titlesContainer">
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
      <div className={styles.notesContainer} id="notesContainer">
        {notesSelected ? (
          <NotesDisplay
            id={id}
            title={title}
            color={color}
            initials={initials}
            noteSelect={updateNotesView}
            mQuery={mQuery}
          />
        ) : (
          <BaseNotes />
        )}
      </div>
    </div>
  );
};

export default Home;
