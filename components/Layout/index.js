import React from "react";
import Header from "./Header";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./index.module.scss";

function Layout({ children, isHomePage }) {
  return (
    <div className={styles.body}>
      {isHomePage ? <Header /> : <div className={styles.header}></div>}
      <div className={styles.img}>
        <Image src="/water.png" alt="watermark" width={"150"} height={"152"} />
      </div>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
