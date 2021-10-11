import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./header.styles.scss";

import { signOutAccount } from "../../firebase/firebase.utils";

function Header({ currentUser }) {
  const handleClick = () => {
    console.log(signOutAccount())
    signOutAccount()
      .then(() => {
        console.log("Sign-out successful");
      })
      .catch((error) => {
        console.log("An error happened", error);
      });
  };

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={handleClick}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
