import styles from "./BaseNotes.module.css";
import homeImg from "../assets/pocketNotes.png";
import lockImg from "../assets/lockSymbol.png";

const BaseNotes = () => {
  return (
    <div className={styles.baseNotesContainer}>
      <div className={styles.imageContainer}>
        <img src={homeImg} alt="notesImg" />
      </div>
      <div className={styles.textContainer}>
        <h1>Pocket Notes</h1>
        <p>
          Send and receive messages without keeping your phone online. Use
          Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
      </div>

      <div className={styles.footerContainer}>
        <img src={lockImg} alt="lockImg" />
        <p>end-to-end encrypted</p>
      </div>
    </div>
  );
};

export default BaseNotes;
