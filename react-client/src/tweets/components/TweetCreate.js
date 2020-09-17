import React from 'react';
import { apiTweetCreate } from '../api';

export default function TweetCreate({ setTweets }) {
  const textAreaRef = React.createRef();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const curContent = textAreaRef.current.value;
    // backend api request
    const res = await apiTweetCreate(curContent);
    if (res.status === 201) {
      textAreaRef.current.value = '';
      setTweets((tweets) => [res.data, ...tweets]);
    } else {
      console.log(res);
      alert('An error occured please try again');
    }
    
  };
  return (
    <div className='row'>
      <div className='col-md-6 offset-md-3'>
        <form onSubmit={handleSubmit}>
          <textarea
            ref={textAreaRef}
            required={true}
            className='form-control'
            name='tweet'
          ></textarea>
          <button type='submit' className='btn btn-primary my-3'>
            Tweet
          </button>
        </form>
      </div>
    </div>
  );
}
