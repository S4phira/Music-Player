<template>
  <div>
    <div id="login" v-if="!token">
      <button @click="login" class="btn btn-primary">Log in with Spotify</button>
      {{token}}
    </div>
    <div v-if="token">
      <Search :token="token" />
    </div>
  </div>
</template>
<script>
import {
  spotifyApi,
  generateRandomString,
  getAccessToken,
} from "../services/services-spotify.js";
import { mapActions } from "vuex";
import Search from "./Search.vue";
export default {
  name: "App",
  components: {
    Search,
  },
  data() {
    return {
      token: "",
    };
  },
  mounted() {
    const accessToken = getAccessToken() || this.accessToken;
    this.token = accessToken;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi
      .getMe()
      .then((me) => {
        return me;
      })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.error("error getting me - e:", e);
        this.$store.dispatch("cleanAccess");
        setTimeout(() => {
          this.login();
        }, 300);
      });
  },
  methods: {
    ...mapActions(["setPageData"]),

    login() {
      const stateKey = "spotify_auth_state";
      const clientId = "2a3343a611fa4c4aadb65a48c6d3a0c2"; // Your client id
      const redirectUri = "http://localhost:8080/home"; // Your redirect uri
      const state = generateRandomString(16);
      window.localStorage.setItem(stateKey, state);
      const scope =
        "user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private";
      let url = "https://accounts.spotify.com/authorize";
      url += "?response_type=token";
      url += "&client_id=" + encodeURIComponent(clientId);
      url += "&scope=" + encodeURIComponent(scope);
      url += "&redirect_uri=" + encodeURIComponent(redirectUri);
      url += "&state=" + encodeURIComponent(state);
      window.location.href = url;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
