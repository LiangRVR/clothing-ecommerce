import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentuser } from "../../redux/user/user.selector";

import { signOutStart } from "../../redux/user/user.actions";

import CartIcon from "../cart-icon/cart-icon.component";

import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsConatiner,
} from "./header.styles";

const Header = () => {
  const currentUser = useSelector(selectCurrentuser);
  const hidden = useSelector(selectCartHidden);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(signOutStart());
  };

  return (
    <Fragment>
      <HeaderContainer>
        <LogoContainer to="/">
          <Logo className="logo" />
        </LogoContainer>
        <OptionsConatiner>
          <OptionLink to="shop">SHOP</OptionLink>
          <OptionLink to="shop">CONTACT</OptionLink>
          {currentUser ? (
            <OptionLink as="div" onClick={handleClick}>
              SIGN OUT
            </OptionLink>
          ) : (
            <OptionLink to="auth">SIGN IN</OptionLink>
          )}
          <CartIcon />
        </OptionsConatiner>
        {hidden ? null : <CartDropdown />}
      </HeaderContainer>
      <Outlet />
    </Fragment>
  );
};

export default Header;
