import Instagram from "@assets/icons/instagram.svg";
import LinkedIn from "@assets/icons/linkedin.svg";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href="https://www.instagram.com/clareejordanart/">
          <img src={Instagram} alt="instagram" />
        </a>
      </div>
      <div className={styles.container}>
        <a href="https://www.linkedin.com/in/clareejordan/">
          <img src={LinkedIn} alt="linkedin" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
