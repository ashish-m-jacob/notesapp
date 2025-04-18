import { React, useEffect, useState } from "react";
import styles from "./Titles.module.css";

const Titles = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [titles, setTitles] = useState({
    title: [],
    color: [],
  });

  const [groupName, setGroupName] = useState("");
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
  });

  const handleCreate = () => {
    const storedTitles = localStorage.getItem("titles");
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

  const selectTitle = (e) => {};

  return (
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
            onClick={selectTitle}
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
          <div className={styles.overlay}></div>
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
  );
};

export default Titles;
