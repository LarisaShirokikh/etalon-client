import React from "react";
 import styles from "./LoadingSpinner.module.css";
import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <Loader className={styles.spinner} />
    </div>
  );
};

export default LoadingSpinner;
