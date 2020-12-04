<template>
  <div class="searchPage">
    <h2>Search Posts</h2>
    <div class="searchInput">
      <input v-model="findItem" placeholder="Type in a post heading">
      <p></p>
      <button @click="search">Search</button>
    </div>
    <MainLayout :posts="posts" :getPosts="getPosts"></MainLayout>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import MainLayout from '@/components/MainLayout.vue'

export default {
  name: 'Search',
  components: {
    MainLayout,
  },
  data() {
    return {
      posts: [],
      findItem: "",
    }
  },
  created() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      try {
        let response = await axios.get("/api/posts");
        this.posts = response.data.filter( (post) => post.heading.toLowerCase().search(this.findItem.toLowerCase()) >= 0);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    search() {
      this.getPosts();
    }
  }
}
</script>

<style scoped>
.searchPage {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.searchInput {
  display: flex;
  width: 300px;
  justify-content: space-around;
  margin-bottom: 20px;
}
</style>
