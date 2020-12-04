<template>
  <div>
    <MainLayout :posts="posts" :getPosts="getPosts"></MainLayout>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import MainLayout from '@/components/MainLayout.vue'

export default {
  name: 'trending',
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
          if(a.upvotes < b.upvotes) return 1;
          if(b.upvotes < a.upvotes) return -1;
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
