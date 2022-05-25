export const addItemToCart = (cartItems, cartItemToAdd, quantityToAdd = 1) => {
  const cartItemExist = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (cartItemExist) {
    return cartItems.map((cartItem) => {
      if (cartItem.id === cartItemToAdd.id) {
        return { ...cartItem, quantity: cartItem.quantity + quantityToAdd };
      }
      return cartItem;
    });
  }

  return [...cartItems, { ...cartItemToAdd, quantity: quantityToAdd }];
};

export const addItemsToCart = (cartItems, cartItemsToAdd) =>{
  let cartItemsNew = [...cartItems]
  cartItemsToAdd.forEach(({quantity,...cartItem}) => {
    cartItemsNew = addItemToCart(cartItemsNew, cartItem, quantity)
  });
  return cartItemsNew;
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const cartItemExist = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (cartItemExist.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
