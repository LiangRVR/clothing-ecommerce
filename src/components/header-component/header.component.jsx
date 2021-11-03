import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentuser } from "../../redux/user/user.selector";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsConatiner,
} from "./header.styles";

import { signOutAccount } from "../../firebase/firebase.utils";

function Header({ currentUser, hidden }) {
  const handleClick = () => {
    signOutAccount()
      .then(() => {
        console.log("Sign-out successful");
      })
      .catch((error) => {
        console.log("An error happened", error);
      });
  };

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsConatiner>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/shop">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as='div' onClick={handleClick}>SIGN OUT</OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsConatiner>
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
}

const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentuser,
  hidden: selectCartHidden,
});

export default connect(mapStatetoProps)(Header);
