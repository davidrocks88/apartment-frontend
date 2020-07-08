import React, { useState, useRef, useEffect } from "react";
import "./Sidebar.css";
import Paper from "@material-ui/core/Paper";
import CommunityCard from "../CommunityCard";
import { useSelector, useDispatch } from "react-redux";
import {
  getCommunities,
  getCommunityByIndex,
  getSelectedCommunityId,
} from "../redux/selectors";
import { selectCommunity } from "../redux/actions";

const SidebarItem = ({ hc, index }) => {
  const community = useSelector(getCommunityByIndex(index));
  const selectedCommunityId = useSelector(getSelectedCommunityId);
  const isSelected = selectedCommunityId === community.community_id;
  const [raised, setRaised] = useState(isSelected);

  const dispatch = useDispatch();
  return (
    <Paper
      style={{ width: "auto", padding: 10, margin: 20 }}
      key={community.community_id}
      onMouseEnter={() => setRaised(true)}
      onMouseLeave={() => {
        if (!isSelected) setRaised(false);
      }}
      elevation={raised || isSelected ? 3 : 0}
      onClick={() => dispatch(selectCommunity(community.community_id))}
    >
      <CommunityCard community={community} key={community.community_id} card />
    </Paper>
  );
};

function Sidebar() {
  const communities = useSelector(getCommunities);
  const selectedCommunityId = useSelector(getSelectedCommunityId);

  const refList = {};
  communities.map((c) => (refList[c.community_id] = React.createRef()));

  const refs = useRef(refList);

  useEffect(() => {
    if (selectedCommunityId) {
      refs.current[selectedCommunityId].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });

  return communities.map((c, index) => (
    <div ref={refs.current[c.community_id]}>
      <SidebarItem
        isSelected={selectedCommunityId === c.community_id}
        index={index}
        key={c.community_id}
      />
    </div>
  ));
}

export default Sidebar;
