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

const Felocity = () => {
  return <Grid>
    <Title />
    <GithubEvent index={indexes.githubEvents++} />
    <GooglePhoto index={indexes.googlePhotos++} />
    <GithubEvent index={indexes.githubEvents++} />
    <MediumArticle index={indexes.mediumArticles++} />
    <PinterestPin index={indexes.pinterestPins++} />
    <MediumArticle index={indexes.mediumArticles++} />
    <GooglePhoto index={indexes.googlePhotos++} />
    <TwitterTweet index={indexes.twitterTweets++} />
    <GithubEvent index={indexes.githubEvents++} />
    <GithubEvent index={indexes.githubEvents++} />
    <PinterestPin index={indexes.pinterestPins++} />
    <MediumArticle index={indexes.mediumArticles++} />
    <TwitterTweet index={indexes.twitterTweets++} />
    <GithubEvent index={indexes.githubEvents++} />
    <TwitterTweet index={indexes.twitterTweets++} />
  </Grid>
};

export default Felocity;
