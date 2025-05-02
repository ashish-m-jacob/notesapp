import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.appContainer}>
      <Home />
      <Toaster
        toastOptions={{
          style: {
            fontFamily: "Roboto",
            margin: 0,
          },
        }}
      />
    </div>
  );
}

export default App;
