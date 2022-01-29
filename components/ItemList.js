import React from "react";
import Modal from "../shared/Modal";
import PropTypes from "prop-types";
import styles from "./ItemList.module.scss";

function ItemList({ cartList, handleAddClick, onClose }) {
  return (
    <Modal className={styles.modal} onRequestClose={onClose}>
      <div>
        <div className={styles.titleBox}>
          <h3 className={styles.title}>Your Order</h3>
        </div>
        <div className={styles.list}>
          {cartList.map((item, index) => {
            return (
              <div key={index} className={styles.box}>
                <div className={styles.type}>
                  {item?.type === "veg" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#3AB757"
                      width="13"
                      height="13"
                      viewBox="0 0 20 20"
                      aria-labelledby="icon-svg-title- icon-svg-desc-"
                      role="img"
                    >
                      <g clipPath="url(#clip0_835:69868)">
                        <path d="M15 10C15 12.74 12.76 15 10 15C7.24 15 5 12.74 5 10C5 7.26 7.26 5 10 5C12.74 5 15 7.24 15 10ZM20 4V16C20 18.26 18.26 20 16 20H4C1.76 20 0 18.26 0 16V4C0 1.74 1.76 0 4 0H16C18.26 0 20 1.74 20 4V4ZM18.34 4C18.34 2.74 17.26 1.66 16 1.66H4C2.76 1.66 1.66 2.74 1.66 4V16C1.66 17.26 2.76 18.34 4 18.34H16C17.26 18.34 18.34 17.26 18.34 16V4V4Z"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_835:69868">
                          <rect width="20" height="20"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#BF4C43"
                      width="13"
                      height="13"
                      viewBox="0 0 20 20"
                      aria-labelledby="icon-svg-title- icon-svg-desc-"
                      role="img"
                    >
                      <g clipPath="url(#clip0_835:69870)">
                        <path d="M20 4V16C20 18.26 18.26 20 16 20H4C1.76 20 0 18.26 0 16V4C0 1.74 1.76 0 4 0H16C18.26 0 20 1.74 20 4ZM18.34 4C18.34 2.74 17.26 1.66 16 1.66H4C2.76 1.66 1.66 2.74 1.66 4V16C1.66 17.26 2.76 18.34 4 18.34H16C17.26 18.34 18.34 17.26 18.34 16V4Z"></path>
                        <path d="M9.99996 3.75L15.8333 14.5833H4.16663L9.99996 3.75Z"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_835:69870">
                          <rect width="20" height="20"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                  <div className={styles.heading}>{item?.itemName}</div>
                </div>
                <div className={styles.rightBox}>
                  <div className={styles.price}>₹ {item?.price}</div>
                  <div className={styles.qBtn}>
                    <div className={styles.qBtnBox}>
                      <button
                        tabIndex="0"
                        className={styles.minBtn}
                        type="button"
                        onClick={() =>
                          handleAddClick(
                            "sub",
                            item?.itemId,
                            Math.floor(item?.itemId / 10)
                          )
                        }
                      >
                        <span className={styles.minusIcon}>
                          <svg
                            className={styles.icon}
                            focusable="false"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M19 13H5v-2h14v2z"></path>
                            <path fill="none" d="M0 0h24v24H0z"></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                    <div className={styles.qText}>{item?.quantity}</div>
                    <div className={styles.qBtnBox}>
                      <button
                        tabIndex="0"
                        className={styles.minBtn}
                        type="button"
                        onClick={() =>
                          handleAddClick(
                            "add",
                            item?.itemId,
                            Math.floor(item?.itemId / 10)
                          )
                        }
                      >
                        <span className={styles.minusIcon}>
                          <svg
                            className={styles.icon}
                            focusable="false"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                            <path fill="none" d="M0 0h24v24H0z"></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

ItemList.propTypes = {};

export default ItemList;
