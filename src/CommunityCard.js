import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Carousel from 'react-material-ui-carousel'
import {useHistory} from 'react-router-dom';
import { useSelector } from "react-redux";
import { getStatus } from "./redux/selectors";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    paddingBottom: 0
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 180,
  },
});

export function ImageCarousel({images}) {
  const classes = useStyles();
  images = images.slice(0, 5);
  return (
    <Carousel
      autoPlay={false}
      indicators={true}
      animation={"fade"}>
      {images.map(i => 
        (<CardMedia
        className={classes.media}
        image={i}
        title="Community Image"
        key={i}
      />)
      )}
    </Carousel>
  )
}

export default function CommunityCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const loading = useSelector(getStatus) === "WAITING";

  const goToCommunityPage = communityId => {
    history.replace(`/communities/${communityId}`)
  }
  return (
    <Card className={classes.root}>
      {loading ? "hello" : <ImageCarousel images={props.community.images} />}
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.community.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.community.address}
        </Typography>
        {/* <Typography variant="body2" component="p">
          {props.community.count} units
        </Typography> */}
        <Button size="small" onClick={()=>goToCommunityPage(props.community.id)}>
          {/* <a href={props.community.url}>Go to Site</a> */}
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}
