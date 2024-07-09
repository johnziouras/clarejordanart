import { NavLink } from "react-router-dom";
import styles from "./PageLinks.module.css";

interface PageLinkProps {
  isMobile: boolean;
}

function PageLinks({ isMobile }: PageLinkProps) {
  return (
    <div className={`${styles.links} ${isMobile ? styles.mobile : ""}`}>
      <ul role="list">
        <li className={styles.orange0}>
          <NavLink to="/paintings">Paintings</NavLink>
        </li>
        <li className={styles.yellow0}>
          <NavLink to="/photography">Photography</NavLink>
        </li>
        <li className={styles.blue0}>
          <NavLink to="/watercolors">Watercolors</NavLink>
        </li>
        <li className={styles.orange1}>
          <NavLink to="/publications">Publication</NavLink>
        </li>
        <li className={styles.teal0}>
          <NavLink to="/about">About</NavLink>
        </li>
        <li className={styles.blue1}>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default PageLinks;
