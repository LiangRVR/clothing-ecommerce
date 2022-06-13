import {
  addCartsItemsFromFirebase,
  addItem,
  removeItem,
  clearCartOnState,
  clearItemFromCart,
  toggleCartHidden,
} from "../cart.actions";
import cartReducer from "../cart.reducer";
const initialState = {
  hidden: true,
  cartItems: [],
};

describe("testing cartReducer", () => {
  const mockItem = {
    id: 1,
    quantity: 1,
  };

  const newMockItem = {
    id: 2,
    quantity: 2,
  };

  const mockItemsFromFirebase = [
    {
      id: 1,
      quantity: 1,
    },
    {
      id: 5,
      quantity: 3,
    },
    {
      id: 4,
      quantity: 2,
    },
    {
      id: 2,
      quantity: 1,
    },
  ];
  const mockPreviousState = {
    ...initialState,
    cartItems: initialState.cartItems.concat(mockItem),
  };

  it("should return initial state", () => {
    expect(cartReducer(undefined, {})).toEqual(initialState);
  });

  it("should toggle cart hidden", () => {
    expect(cartReducer(initialState, toggleCartHidden()).hidden).toBe(false);
  });

  describe("add an item", () => {
    it("should add a new item", () => {
      expect(
        cartReducer(initialState, addItem(mockItem)).cartItems[0]
      ).toStrictEqual(mockItem);
    });

    it("should increase quantity by 1 if id exist in currentState", () => {
      expect(
        cartReducer(mockPreviousState, addItem(mockItem)).cartItems[0].quantity
      ).toBe(mockItem.quantity + 1);
    });

    it("should add a new item if id does not exist in current cartItems", () => {
      expect(
        cartReducer(mockPreviousState, addItem(newMockItem)).cartItems.length
      ).toBe(mockPreviousState.cartItems.length + 1);
    });
  });

  describe("add Items", () => {
    it("should add the items to cart", () => {
      expect(
        cartReducer(
          initialState,
          addCartsItemsFromFirebase(mockItemsFromFirebase)
        ).cartItems.length
      ).toBe(mockItemsFromFirebase.length);
    });
    it("mix existing items with added items", () => {
      const { cartItems } = cartReducer(
        mockPreviousState,
        addCartsItemsFromFirebase(mockItemsFromFirebase)
      );
      const filterItem = cartItems.filter(
        (item) => item.id === mockPreviousState.cartItems[0].id
      );
      expect(filterItem[0].quantity).toBe(2);
    });
  });

  describe("remove Item from cart", () => {
    it("should decrease quantity by 1 if id exist in currentState", () => {
      const mockPreviousStateIncreased = cartReducer(
        mockPreviousState,
        addItem(mockItem)
      );
      expect(
        cartReducer(mockPreviousStateIncreased, removeItem(mockItem))
          .cartItems[0].quantity
      ).toBe(mockPreviousState.cartItems[0].quantity);
    });

    it("should remove item from cart if quantity is 1", () => {
      expect(
        cartReducer(mockPreviousState, removeItem(mockItem)).cartItems.length
      ).toBe(0);
    });

    it("should remove an item from cart", () => {
      expect(
        cartReducer(mockPreviousState, clearItemFromCart(mockItem)).cartItems
          .length
      ).toBe(mockPreviousState.cartItems.length - 1);
    });
  });

  describe("Empty cart", () => {
    it("should clear cart", () => {
      expect(
        cartReducer(mockPreviousState, clearCartOnState()).cartItems.length
      ).toBe(0);
    });
  });
});
