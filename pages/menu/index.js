/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { connect } from "react-redux";
import MenuList from "../../components/MenuList";
import MenuBox from "../../components/MenuBox";
import Layout from "../../components/Layout";
import Mfooter from "../../components/Mfooter";
import Location from "../../components/Location";
import actionContainer from "../../reducer/actions/app";
import useGeoLocation from "../../hooks/Geolocation";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import Geocode from "react-geocode";

import ItemList from "../../components/ItemList";

function Menu({
  onAddMenuList,
  onAddItemsQuantity,
  onRemoveItemsQuantity,
  menuData,
  onVegFilterResult,
  totalPrice,
  cartList,
}) {
  const [addQuantity, setAddQuantity] = useState(0);
  const [showList, setShowList] = useState(false);
  const [checkLocation, setCheckLocation] = useState(false);
  const [distance, setDistance] = useState(0);
  const [district, setDistrict] = useState("");
  const location = useGeoLocation();

  async function fetchUsers(API_URL) {
    const response = await fetch(API_URL);
    const users = await response.json();
    return users;
  }

  console.log(location);

  useEffect(() => {
    const collectionRef = collection(db, "rasoi");
    const unsubscribe = onSnapshot(collectionRef, (q) =>
      q.docs.map((doc) => {
        onAddMenuList(doc.data());
      })
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (
      isEmpty(location.error) &&
      location?.coordinates?.lat &&
      location?.coordinates?.lng
    ) {
      setDistance(
        calcCrow(
          location?.coordinates?.lat,
          location?.coordinates?.lng,
          25.601844974241303,
          85.15627426754729
        ).toFixed(1)
      );

      fetchUsers(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${
          location?.coordinates?.lat + "," + location?.coordinates?.lng
        }6&lang=en-US&apiKey=Xciqt24i0ffFMlw7v0JIY3tWZ81do4gFN3NmB_rmtB8`
      ).then((item) => {
        if (item?.items?.length > 0) {
          setDistrict(item?.items[0]?.address?.district);
        }
      });
    }
  }, [location]);

  useEffect(() => {
    if (cartList.length === 0) {
      setShowList(false);
    }
  }, [cartList]);

  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(deg) {
    return deg * (Math.PI / 180);
  }

  function handleVegFilter(value) {
    onVegFilterResult(value);
  }

  function handleAddClick(type, id, menuId) {
    if (type === "add") {
      setAddQuantity((prev) => prev + 1);
      onAddItemsQuantity({ id, menuId });
    } else {
      setAddQuantity((prev) => prev - 1);
      onRemoveItemsQuantity({ id, menuId });
    }
  }

  function handleCartList() {
    setShowList(!showList);
  }

  function handleLocation() {
    setCheckLocation(true);
  }

  return (
    <Layout isHomePage={false}>
      <Location
        // handleLocation={handleLocation}
        district={district}
        distance={distance}
      />
      <div className={styles.content}>
        {menuData?.length > 0 ? (
          <MenuBox
            handleVegFilter={handleVegFilter}
            handleAddClick={handleAddClick}
          />
        ) : null}
      </div>
      {totalPrice > 0 ? (
        <Mfooter
          totalPrice={totalPrice}
          cartList={cartList}
          handleCartList={handleCartList}
        />
      ) : null}
      {showList ? (
        <ItemList
          cartList={cartList}
          handleAddClick={handleAddClick}
          onClose={handleCartList}
        />
      ) : null}
    </Layout>
  );
}

Menu.propTypes = {};

const mapStateToProps = ({ app }) => {
  return { ...app };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddMenuList: (params) => dispatch(actionContainer.addMenuList(params)),
    onAddItemsQuantity: (params) =>
      dispatch(actionContainer.addItemsQuantity(params)),
    onRemoveItemsQuantity: (params) =>
      dispatch(actionContainer.removeItemsQuantity(params)),
    onVegFilterResult: (params) =>
      dispatch(actionContainer.vegFilterResult(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
