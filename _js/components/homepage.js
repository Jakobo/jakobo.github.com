import React, { PropTypes } from "react"
import Grid from "./grid"

import Title from "./tiles/title"
import GithubEvent from "./tiles/github_event_from_feed"
import GooglePhoto from "./tiles/google_photo_from_feed"
import MediumArticle from "./tiles/medium_article_from_feed"
import PinterestPin from "./tiles/pinterest_pin_from_feed"
import TwitterTweet from "./tiles/twitter_tweet_from_feed"

let indexes = {
  githubEvents: 0,
  googlePhotos: 0,
  mediumArticles: 0,
  pinterestPins: 0,
  twitterTweets: 0
};

const Homepage = () => {
  return <Grid>
    <Title />
    <GithubEvent index={indexes.githubEvents++} color="minus" variant="light" />
    <GooglePhoto index={indexes.googlePhotos++} color="complement" variant="dark" />
    <GithubEvent index={indexes.githubEvents++} color="minus" variant="light" />
    <MediumArticle index={indexes.mediumArticles++} color="base" variant="plain" />
    <PinterestPin index={indexes.pinterestPins++} color="base" variant="light" />
    <MediumArticle index={indexes.mediumArticles++} color="base" variant="plain" />
    <GooglePhoto index={indexes.googlePhotos++} color="complement" variant="dark" />
    <TwitterTweet index={indexes.twitterTweets++} color="minus" variant="light" />
    <GithubEvent index={indexes.githubEvents++} color="minus" variant="light" />
    <GithubEvent index={indexes.githubEvents++} color="minus" variant="light" />
    <PinterestPin index={indexes.pinterestPins++} color="base" variant="light" />
    <MediumArticle index={indexes.mediumArticles++} color="base" variant="plain" />
    <TwitterTweet index={indexes.twitterTweets++} color="minus" variant="light" />
    <GithubEvent index={indexes.githubEvents++} color="minus" variant="light" />
    <TwitterTweet index={indexes.twitterTweets++} color="minus" variant="light" />
  </Grid>
};

export default Homepage;
