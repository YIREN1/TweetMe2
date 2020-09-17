import React, { useState } from 'react';

import { apiTweetAction } from '../api';

export default function ActionBtn(props) {
  const { tweet, action, didPerformAction } = props;
  const className = props.className ? props.className : 'btn btn-primary btn-sm';
  const actionDisplay = action.display ? action.display : 'Action';

  const handleActionBackendEvent = (response, status) => {
    console.log(response, status);
    if ((status === 200 || status === 201) && didPerformAction) {
      didPerformAction(response, status);
    }
  };
  const handleClick = async (event) => {
    event.preventDefault();
    const res = await apiTweetAction(tweet.id, action.type);
    handleActionBackendEvent(res.data, res.status);
  };
  const display = action.type === 'like' ? `${tweet.likes} ${actionDisplay}` : actionDisplay;
  return (
    <button className={className} onClick={handleClick}>
      {display}
    </button>
  );
}
