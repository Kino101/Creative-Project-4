<template>
  <div>
    <h2>Recent Posts</h2>
    <MainLayout :posts="posts" :getPosts="getPosts"></MainLayout>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import MainLayout from '@/components/MainLayout.vue'

export default {
  name: 'Home',
  components: {
    MainLayout,
  },
  data() {
    return {
      posts: [],
    }
  },
  created() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      try {
        let response = await axios.get("/api/posts");
        this.posts = response.data;
        this.posts.sort((a, b) => {
          if(a._id < b._id) return 1;
          if(b._id < a._id) return -1;
          return 0;
        });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
