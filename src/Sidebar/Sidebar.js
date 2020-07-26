import React, { useState, useRef, useEffect } from "react";
import "./Sidebar.css";
import Paper from "@material-ui/core/Paper";
import CommunityCard from "../CommunityCard";
import { useSelector, useDispatch } from "react-redux";
import {
  getCommunities,
  getCommunityByIndex,
  getSelectedCommunityId,
  getStatus,
} from "../redux/selectors";
import { selectCommunity } from "../redux/slices/communities";
import { useHistory, useLocation } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import {Typography, Card } from "@material-ui/core";


const SkeletonItem = () => {
  return (
    <Paper style={{ padding: 10, margin: 20 }} elevation={0}>
      <Card style={{ padding: 10 }}>
        <Skeleton variant="rect" height={180} />{" "}
        <Typography variant="h4" style={{width: "80%"}}>
          <Skeleton />
        </Typography>
        <Typography style={{marginBottom: 12}}>
          <Skeleton />
        </Typography>
        <Skeleton variant="rect" width={80} height={30} />
      </Card>
    </Paper>
  );
};

const SidebarItem = ({ hc, index }) => {
  const community = useSelector(getCommunityByIndex(index));
  const selectedCommunityId = useSelector(getSelectedCommunityId);
  const isSelected = selectedCommunityId === community.id;
  const [raised, setRaised] = useState(isSelected);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();

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
  const loading = useSelector(getStatus) === "WAITING";

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
  }, [loading, selectedCommunityId]);

  const numSkeletons = 10;

  return (
    <div>
      <div style={{ height: "2em" }}></div>
      {loading
        ? [...Array(numSkeletons)].map((a, i) => <SkeletonItem key={i} />)
        : communities.map((c, index) => (
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
