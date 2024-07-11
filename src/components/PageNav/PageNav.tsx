import Logo from "@components/Logo/Logo";
import PageLinks from "@components/PageLinks/PageLinks";
import { useState } from "react";
import { FaBars, FaX } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

function PageNav() {
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((s) => !s);
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/">
          <Logo />
        </NavLink>
        {isMobile ? (
          <div onClick={handleClick}>
            {!isOpen ? (
              <FaBars className={styles.menu} />
            ) : (
              <FaX className={styles.menu} />
            )}
            {isOpen && <PageLinks isMobile={isMobile} />}
          </div>
        ) : (
          <PageLinks isMobile={isMobile} />
        )}
      </nav>
    </header>
  );
}

export default PageNav;
