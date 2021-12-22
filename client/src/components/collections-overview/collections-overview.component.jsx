import React from "react";
import { useSelector } from "react-redux";

import { selectColloctionsForPreview } from "../../redux/shop/shop.selector";

import CollectionPreview from "../collection-preview/collection-preview.component";

import { CollectionsOverviewContainer } from "./collections-overview.styles";

const CollectionsOverview = () => {
  const collections = useSelector(selectColloctionsForPreview);
  return (
    <CollectionsOverviewContainer>
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </CollectionsOverviewContainer>
  );
};

export default CollectionsOverview;
