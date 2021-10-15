import React from "react";
import "./collection-preview.styles.scss";
import CollectionItems from "../collection-item/collection-item.component";

function CollectionPreview({ title, items }) {
  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {items
          .filter((item, indx) => indx < 4)
          .map((item) => (
            <CollectionItems key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}

export default CollectionPreview;
