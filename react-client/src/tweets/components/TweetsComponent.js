import React, { useState } from 'react';

import TweetsList from './TweetsList';
import TweetCreate from './TweetCreate';
export default function TweetsComponent() {
  const [tweets, setTweets] = useState([]);
  return (
    <div>
      <TweetCreate setTweets={setTweets} />
      <TweetsList tweets={tweets} setTweets={setTweets} />
    </div>
  );
}
