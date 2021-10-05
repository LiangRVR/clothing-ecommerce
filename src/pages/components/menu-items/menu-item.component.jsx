import React from "react";
import "./menu-item.styles.scss";
import { withRouter } from "react-router";

function MenuItem({ title, imageUrl, size, linkUrl, history, match }) {
  console.log(match)
  return (
    <div className={`menu-item ${size}`} onClick={()=> history.push(`${match.url}${linkUrl}`)}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="content">
        <div className="title">{title}</div>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
}

export default withRouter(MenuItem);
