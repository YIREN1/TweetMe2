
import axios from 'axios'

const csrftoken = getCookie('csrftoken');
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

export async function apiTweetCreate(newTweetContent) {
  const res = await axios.post('api/tweets/create/', { content: newTweetContent });
  return res;
}

export async function apiTweetAction(tweetId, action){
    const data = {id: tweetId, action}
    const res = await axios.post('api/tweets/action/', data);
    return res;
}

export function apiTweetDetail(tweetId, callback) {
    // backendLookup("GET", `/tweets/${tweetId}/`, callback)
}

export async function apiTweetList(username, nextUrl) {
    let endpoint =  "api/tweets/"
    if (username){
        endpoint =  `api/tweets/?username=${username}`
    }
    // if (nextUrl !== null && nextUrl !== undefined) {
    //     endpoint = nextUrl.replace("http://localhost:8000/api", "")
    // }
    const res = await axios(endpoint)
    return res
}