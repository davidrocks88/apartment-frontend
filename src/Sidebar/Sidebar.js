import React from "react";
import "./Sidebar.css";
import Paper from "@material-ui/core/Paper";
import CommunityCard from "../CommunityCard";

function Sidebar({ communities }) {
  const cards = communities.map((community) => {
    return (
      <Paper style={{ width: 200, padding: 20 }} key={community.community_id}>
        <CommunityCard
          community={community}
          key={community.community_id}
          card
        />
      </Paper>
    );
  });

  return <div>{cards}</div>;
}

export default Sidebar;
