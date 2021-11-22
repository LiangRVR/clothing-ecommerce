import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { selectColloctionsForPreview } from "../../redux/shop/shop.selector";

import CollectionPreview from "../collection-preview/collection-preview.component";

import { CollectionsOverviewContainer } from "./collections-overview.styles";

const CollectionsOverview = ({ collections }) => {
  return (
    <CollectionsOverviewContainer>
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </CollectionsOverviewContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  collections: selectColloctionsForPreview,
});

export default connect(mapStateToProps, null)(CollectionsOverview);
