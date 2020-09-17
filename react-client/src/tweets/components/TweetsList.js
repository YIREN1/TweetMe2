import React, { useEffect, useState } from 'react';
import Tweet from './Tweet';
import { motion } from 'framer-motion';
import { apiTweetList } from '../api';

export default function TweetsList({ setTweets, tweets }) {
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiTweetList();
      setTweets(res.data);
    };
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <motion.div layout>
        {tweets.map((tweet) => {
          return <Tweet tweet={tweet} setTweets={setTweets} />;
        })}
      </motion.div>
    </React.Fragment>
  );
}
