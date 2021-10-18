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

import "./cart-dropdown.styles.scss";

function CartDropdown({ cartItems, total, history, toggleCartHidden }) {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <span className="empty-message">You cart is empty</span>
        )}
      </div>
      {cartItems.length ? (
        <div className="total">
          <span>Total: $ {total}</span>
        </div>
      ) : null}

      <CustomButton
        onClick={() => {
          toggleCartHidden();
          history.push("/checkout");
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
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
