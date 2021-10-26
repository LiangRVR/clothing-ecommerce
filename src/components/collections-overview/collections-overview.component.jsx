import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { selectColloctionsForPreview } from "../../redux/shop/shop.selector";

import CollectionPreview from "../collection-preview/collection-preview.component";

function CollectionOverview({ collections }) {
  return (
    <div className="collection-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  collections: selectColloctionsForPreview,
});

export default connect(mapStateToProps, null)(CollectionOverview);
