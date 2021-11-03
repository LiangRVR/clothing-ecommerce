import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import {
  CartDropdownContainer,
  CartItemsContainer,
  EmptyMessage,
  TotalAmount,
} from "./cart-dropdown.styles";


function CartDropdown({ cartItems, total, history, toggleCartHidden }) {
  return (
    <CartDropdownContainer>
      <CartItemsContainer>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <EmptyMessage>You cart is empty</EmptyMessage>
        )}
      </CartItemsContainer>
      {cartItems.length ? (
        <TotalAmount>
          <span>Total: $ {total}</span>
        </TotalAmount>
      ) : null}

      <CustomButton
        onClick={() => {
          toggleCartHidden();
          history.push("/checkout");
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </CartDropdownContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CartDropdown));
