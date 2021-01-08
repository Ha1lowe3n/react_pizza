const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0
}

const getTotalPriceItem = arr => arr.reduce((sum, obj) => obj.price + sum, 0);

const getTotalCount = obj => Object.keys(obj).reduce(
  (sum, key) => obj[key].items.length + sum, 0
);

const getTotalPrice = obj => Object.keys(obj).reduce(
  (sum, key) => obj[key].totalPrice + sum, 0
);


const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPriceItem(currentPizzaItems),
        }
      };

      const totalCount = getTotalCount(newItems);
      const totalPrice = getTotalPrice(newItems);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'CLEAR_CART':
      return {
        items: {},
        totalPrice: 0,
        totalCount: 0
      }

    case 'PLUS_CART_ITEM': {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPriceItem(newObjItems),
        },
      };

      const totalCount = getTotalCount(newItems);
      const totalPrice = getTotalPrice(newItems);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'MINUS_CART_ITEM': {
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPriceItem(newObjItems),
        },
      };

      const totalCount = getTotalCount(newItems);
      const totalPrice = getTotalPrice(newItems);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case 'REMOVE_CART_ITEM':
      const newItems = { ...state.items };
      const priceNewItems = newItems[action.payload].totalPrice;
      const countNewItems = newItems[action.payload].items.length;

      delete newItems[action.payload];

      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - priceNewItems,
        totalCount: state.totalCount - countNewItems
      }

    default:
      return state;
  }
}

export default cart;