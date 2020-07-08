import React, { useState } from "react";
import "./Sidebar.css";
import Paper from "@material-ui/core/Paper";
import CommunityCard from "../CommunityCard";

const SidebarItem = ({ community, isSelected, setCommunity }) => {
  const [raised, setRaised] = useState(isSelected);

  return (
    <Paper
      style={{ width: "auto", padding: 10, margin: 20}}
      key={community.community_id}
      onMouseEnter={() => setRaised(true)}
      onMouseLeave={() => {
        if (!isSelected) setRaised(false);
      }}
      elevation={raised || isSelected ? 3 : 0}
      onClick={()=>setCommunity(community)}
    >
      <CommunityCard community={community} key={community.community_id} card />
    </Paper>
  );
};

function Sidebar({ communities, selectedCommunity, setCommunity }) {
  return communities.map((c) => (
    <SidebarItem
      isSelected={
        selectedCommunity
          ? selectedCommunity.community_id === c.community_id
          : false
      }
      community={c}
      key={c.community_id}
      setCommunity={setCommunity}
    />
  ));
}

export default Sidebar;
