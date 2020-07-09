import React from "react";
import { useParams } from "react-router-dom";
import { getCommunityById } from "./redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { selectCommunity } from "./redux/actions";

export default function CommunityPage() {
  const { communityId } = useParams();
  const dispatch = useDispatch();
  const community = useSelector(getCommunityById(communityId));

  if (!community) {
    return <h1>ERROR, cannot find community {communityId}</h1>
  }
  else {
    dispatch(selectCommunity(communityId));
  }

  return (
    <div>
      <div style={{ height: "40em" }}></div>
      <h1>Community:</h1>
      <h2>{communityId}</h2>
    </div>
  );
}
