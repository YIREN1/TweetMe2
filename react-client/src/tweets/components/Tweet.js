import React, { useState } from 'react';
import TweetButton from './TweetButtons';
import { motion } from 'framer-motion';

export default function Tweet({ tweet = null, hideActions, isRetweet, retweeter, setTweets }) {
  const [actionTweet, setActionTweet] = useState(tweet);
  let className = 'col-10 mx-auto col-md-6';
  // border
  className = isRetweet === true ? `${className} p-2 rounded` : className;
  const isDetail = false;
  const handleLink = (event) => {
    event.preventDefault();
    window.location.href = `/${tweet.id}`;
  };

  const handlePerformAction = (newActionTweet, status) => {
    if (status === 200) {
      setActionTweet(newActionTweet);
    } else if (status === 201) {
      if (setTweets) {
        setTweets((tweets) => [newActionTweet, ...tweets]);
      }
    }
  };
  function ParentTweet({ tweet, retweeter }) {
    return tweet.parent ? (
      <Tweet isRetweet retweeter={retweeter} hideActions className={' '} tweet={tweet.parent} />
    ) : null;
  }
  return (
    <div className={className}>
      {isRetweet === true && (
        <div className='mb-2'>
          <span className='small text-muted'>
            Retweet via{/* Retweet via <UserDisplay user={retweeter} /> */}
          </span>
        </div>
      )}
      <div className='d-flex'>
        <div className='col-11'>
          <p>
            {tweet.id} - {tweet.content}
          </p>

          <ParentTweet tweet={tweet} retweeter={tweet.user} />

          <div className='btn btn-group px-0'>
            {!hideActions && (
              <React.Fragment>
                <TweetButton
                  tweet={actionTweet}
                  didPerformAction={handlePerformAction}
                  action={{ type: 'like', display: 'Likes' }}
                />
                <TweetButton
                  tweet={actionTweet}
                  didPerformAction={handlePerformAction}
                  action={{ type: 'unlike', display: 'Unlike' }}
                />
                <TweetButton
                  tweet={actionTweet}
                  didPerformAction={handlePerformAction}
                  action={{ type: 'retweet', display: 'Retweet' }}
                />
              </React.Fragment>
            )}
            {isDetail ? null : (
              <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>
                View
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
