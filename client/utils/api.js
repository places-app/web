import axios from 'axios';

const serverUrl = `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT}`;

const api = {
  followUser(userId, followedId, followed) {
    return axios({
      url: `/api/users/${userId}/follows`,
      method: 'post',
      baseURL: serverUrl,
      withCredentials: true,
      data: {
        followedId,
        followed,
      },
    });
  },
  getFollows(userId) {
    return axios({
      url: `/api/users/${userId}/follows`,
      method: 'get',
      baseURL: serverUrl,
      withCredentials: true,
    });
  },
  getPlaces(userId) {
    return axios({
      url: `/api/users/${userId}/places`,
      method: 'get',
      baseURL: serverUrl,
      withCredentials: true,
    });
  },
  addFav(userId, placeId, userPlaceId) {
    return axios({
      url: `/api/users/${userId}/favs`,
      method: 'post',
      baseURL: serverUrl,
      withCredentials: true,
      data: {
        placeId,
        userPlaceId,
      },
    });
  },
  getFollowPlaces(followedId) {
    return axios({
      url: `/api/follows/${followedId}/places`,
      method: 'get',
      baseURL: serverUrl,
      withCredentials: true,
    });
  },
};

export default api;
