import Img from "@assets/icons/logo.svg";
import styles from "./Logo.module.css";

function Logo() {
  return <img src={Img} alt="Logo" className={styles.logo} />;
}

export default Logo;
