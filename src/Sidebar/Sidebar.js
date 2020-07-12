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
import { selectCommunity } from "../redux/slices/communities";
import {useHistory, useLocation} from 'react-router-dom';


const SidebarItem = ({ hc, index }) => {
  const community = useSelector(getCommunityByIndex(index));
  const selectedCommunityId = useSelector(getSelectedCommunityId);
  const isSelected = selectedCommunityId === community.id;
  const [raised, setRaised] = useState(isSelected);
  const dispatch = useDispatch();
  const history = useHistory();
  const {pathname} = useLocation();

  return (
    <Paper
      style={{ width: "auto", padding: 10, margin: 20 }}
      key={community.id}
      onMouseEnter={() => setRaised(true)}
      onMouseLeave={() => {
        if (!isSelected) setRaised(false);
      }}
      elevation={raised || isSelected ? 4 : 0}
      onClick={() => {
        dispatch(selectCommunity(community.id));
        if (pathname.includes("/communities")) {
          history.replace(`/communities/${community.id}`);
        }
      }}
    >
      <CommunityCard community={community} key={community.id} card />
    </Paper>
  );
};

function Sidebar() {
  const communities = useSelector(getCommunities);
  const selectedCommunityId = useSelector(getSelectedCommunityId);

  const refList = {};
  communities.map((c) => (refList[c.id] = React.createRef()));

  const refs = useRef(refList);

  useEffect(() => {
    if (selectedCommunityId) {
      refs.current[selectedCommunityId].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  });

  return (
    <div>
      <div style={{ height: "1em" }}></div>
      {communities.map((c, index) => (
        <div ref={refs.current[c.id]} key={c.id}>
          <SidebarItem
            isSelected={selectedCommunityId === c.id}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
