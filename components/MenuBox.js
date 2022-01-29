import React from "react";
import PropTypes from "prop-types";
import MenuList from "./MenuList";
import styles from "./MenuBox.module.scss";

function MenuBox({ handleVegFilter, handleAddClick }) {
  return (
    <div className={styles.container}>
      <MenuList
        handleVegFilter={handleVegFilter}
        handleAddClick={handleAddClick}
      />
    </div>
  );
}

MenuBox.propTypes = {};

export default MenuBox;
