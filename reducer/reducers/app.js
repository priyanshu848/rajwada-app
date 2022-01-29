import { actionTypes } from "../actionTypes";

export const exampleInitialState = {
  menuData: [],
  navList: [],
  data: [],
  storeNavList: [],
  cartList: [],
  totalPrice: 0,
};

function reducer(state = exampleInitialState, { payload, type }) {
  switch (type) {
    case actionTypes.ADD_MENU_LIST: {
      const array = payload.menuList;
      const navList = array.map((item, index) => {
        const container = {};

        container.name = item.name;
        container.count = item.count;

        return container;
      });
      // console.log(navList, "lalla");
      return {
        ...state,
        menuData: payload.menuList,
        navList,
        data: payload.menuList,
        storeNavList: navList,
      };
    }
    case actionTypes.ADD_ITEMS_QUANTITY: {
      const id = payload.id;
      const menuId = payload.menuId;
      const addQuantity = state.menuData;
      var total = state.totalPrice;
      const appendList = state.cartList;
      // addQuantity = addQuantity.filter((item) => ite)
      for (let i = 0; i < addQuantity.length; i++) {
        if (addQuantity[i].id === menuId) {
          for (let j = 0; j < addQuantity[i].Items.length; j++) {
            if (addQuantity[i].Items[j].itemId === id) {
              if (addQuantity[i].Items[j].quantity) {
                addQuantity[i].Items[j].quantity += 1;
                total = total + parseInt(addQuantity[i].Items[j].price);
              } else {
                addQuantity[i].Items[j].quantity = 1;
                total = total + parseInt(addQuantity[i].Items[j].price);
              }
              if (addQuantity[i].Items[j].quantity == 1) {
                appendList.push(addQuantity[i].Items[j]);
              }
            }
          }
        }
      }
      return {
        ...state,
        menuData: addQuantity,
        totalPrice: total,
        cartList: appendList,
      };
    }
    case actionTypes.REMOVE_ITEMS_QUANTITY: {
      const id = payload.id;
      const menuId = payload.menuId;
      const addQuantity = state.menuData;
      var total = state.totalPrice;
      var removeCart = state.cartList;
      // addQuantity = addQuantity.filter((item) => ite)
      for (let i = 0; i < addQuantity.length; i++) {
        if (addQuantity[i].id === menuId) {
          for (let j = 0; j < addQuantity[i].Items.length; j++) {
            if (addQuantity[i].Items[j].itemId === id) {
              if (addQuantity[i].Items[j].quantity) {
                addQuantity[i].Items[j].quantity -= 1;
                total = total - parseInt(addQuantity[i].Items[j].price);
              } else {
                addQuantity[i].Items[j].quantity = 1;
                total = total - parseInt(addQuantity[i].Items[j].price);
              }
              // console.log(addQuantity[i].Items[j].quantity, "lopp");
              if (addQuantity[i].Items[j].quantity == 0) {
                // console.log(state.cartList, "lopp");

                removeCart = state.cartList.filter(
                  (item) => item.itemId !== addQuantity[i].Items[j].itemId
                );
                console.log(removeCart, "loop");
              }
            }
          }
        }
      }
      return {
        ...state,
        menuData: addQuantity,
        totalPrice: total,
        cartList: removeCart,
      };
    }
    case actionTypes.VEG_FILTER_RESULT: {
      // console.log(state);
      let filterData;
      let filterNavList;
      let arrayItem = state.data;
      if (payload === true) {
        filterData = arrayItem?.filter((item) => item?.allNonVeg === false);
        filterNavList = filterData.map((item, index) => {
          const container = {};
          container.name = item.name;
          container.count = item.count;

          return container;
        });
        for (let i = 0; i < filterData?.length; i++) {
          const newArray = [];
          for (let j = 0; j < filterData[i]?.Items?.length; j++) {
            if (filterData[i]?.Items[j].type === "veg") {
              newArray.push(filterData[i]?.Items[j]);
            }
          }
          filterData[i].Items = newArray;
        }
      } else {
        filterData = state.data;
        filterNavList = state.storeNavList;
      }

      return {
        ...state,
        menuData: filterData,
        navList: filterNavList,
      };
    }
    default:
      return state;
  }
}

export default reducer;
