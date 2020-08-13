<template>
  <div class="hello">
    <input v-model="search" />
    <button @click="searchMusic">Szukaj</button>
    <button @click="searchSpotify">Spotify api</button>
    <div class="artistList">
      <div class="artistBox" v-for="artist of artistsList" :key="artist.id">
        <p>{{artist.name}}</p>
        <img :src="artist.img" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { searchArtists } from "../services/services-spotify.js";
export default {
  name: "Search",
  props: { token: String },
  data() {
    return {
      search: "",
      artistsList: [],
    };
  },
  mounted() {},
  methods: {
    searchSpotify() {
      searchArtists(this.search).then(
        function (data) {
          console.log("Search artists by search", data);
        },
        function (err) {
          console.error(err);
        }
      );
    },
    async searchMusic() {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${this.search}&type=track%2Cartist&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      this.search = "";
      this.artistsList = [];
      response.data.artists.items.forEach((element) => {
        this.artistsList.push({
          name: element.name,
          img:
            element.images.length == 0
              ? "https://www.ajactraining.org/wp-content/uploads/2019/09/image-placeholder.jpg"
              : element.images[0].url,
        });
      });
    },
  },
};
</script>

<style scoped>
.artistList {
  display: flex;
  flex-direction: row;
}
.artistBox {
  width: 300px;
}
.artistList img {
  width: 300px;
}
</style>

