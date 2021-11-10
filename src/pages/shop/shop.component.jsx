import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { updateCollections } from "../../redux/shop/shop.actions";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import WhitSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "../collection/collection.component";

import { getDocs } from "firebase/firestore";

import {
  collectionRef,
  convertCollectionSnapShotToMap,
} from "../../firebase/firebase.utils";

const CollectionsOverviewWithSpinner = WhitSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WhitSpinner(CollectionPage);

class SopPage extends Component {
  state = {
    loading: true,
  };
  unSubscribeFromSnapShot = null;

  componentDidMount() {
    const { updateCollection } = this.props;
    const collectionsRef = collectionRef("collections");
    const getCollections = async () => {
      try {
        const getCollectionsData = await getDocs(collectionsRef);
        const collectionMap =
          convertCollectionSnapShotToMap(getCollectionsData);
        updateCollection(collectionMap);
        this.setState({
          loading: false,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getCollections();
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollection: (collectionMap) =>
    dispatch(updateCollections(collectionMap)),
});

export default connect(null, mapDispatchToProps)(SopPage);
