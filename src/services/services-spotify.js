import spotifyApi from "./api-spotify";

function getAccessToken() {
  if (!window.location.hash) return;
  const splittedURL = window.location.href.split("access_token=");
  if (splittedURL.length <= 1) return; // should have at least two parts, URL + token so that the token exists
  const accessToken = splittedURL[splittedURL.length - 1]; // last item
  return accessToken;
}

function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const getUserPlaylists = async (userId) =>
  await spotifyApi.getUserPlaylists(userId, { limit: 50 });

const getAlbumTracks = async (albumId) =>
  await spotifyApi.getAlbumTracks(albumId);

const getArtistTopTracks = async (artistId, region = "US") =>
  await spotifyApi.getArtistTopTracks(artistId, region);

const searchArtists = async (search, opts = { limit: 20 }) =>
  await spotifyApi.searchArtists(search, opts);

const getArtistAlbums = async (artistId, opts = { limit: 50, country: "DE" }) =>
  await spotifyApi.getArtistAlbums(artistId, opts);

const changePlaylistName = async (userId, playlistId, name) =>
  await spotifyApi.changePlaylistDetails(userId, playlistId, { name });

export {
  spotifyApi,
  getAccessToken,
  generateRandomString,
  getAlbumTracks,
  getArtistTopTracks,
  searchArtists,
  getArtistAlbums,
  getUserPlaylists,
  changePlaylistName,
};
