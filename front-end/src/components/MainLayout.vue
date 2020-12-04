<template>
  <div class="mainLayout">
    <div class="Feed">
      <div class="post" v-for="post in posts" :key="post.id">
        <h3 class="postText">{{post.heading}}</h3>
        <img :src="post.path"/>
        <p class="postText">{{post.description}}</p>
        <div class="upvoteAndEdit">
          <div class="upvotes">
            <span class="glyphicon glyphicon-thumbs-up" v-on:click="incrementUpvotes(post)"></span>
            <p>{{post.upvotes}} Upvotes</p>
          </div>
          <button @click="toggle(post)">Edit</button>
        </div>
        <Editing :post="post" :posts="posts" :getPosts="getPosts" v-if="post.editing"></Editing>
        <SubPosts :post="post"></SubPosts>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import Editing from '@/components/Editing.vue'
import SubPosts from '@/components/SubPosts.vue'

export default {
  name: 'mainLayout',
  components: {
    Editing,
    SubPosts
  },
  props: {
    posts: Array,
    getPosts: {type: Function}
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async incrementUpvotes(post) {
      try {
        let response = await axios.put("/api/posts/" + post._id + "/upvote", {
          upvotes: post.upvotes + 1,
        });
        post.upvotes = response.data.upvotes;
      } catch (error) {
        console.log(error);
      }
    },

    async toggle(post) {
      try {
        await axios.put("/api/posts/" + post._id + "/editing");
        this.getPosts();
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.mainLayout {
  display: flex;
  justify-content: center;
}

.Feed {
  display: flex;
  flex-direction: column;
  background-color: #FFFDD0;
  background: black;
  border-radius: 20px;
  padding-left: 6px;
  padding-right: 6px;
}

.post {
  padding: 5px;
  border-style: ridge;
  border-color: black;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 20px;
  background-color: #FFFBF3;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post img {
  width: 300px;
  padding: 2px;
  border: 5px;
  border-style: double;
  border-radius: 20px;
  border-color: white;
  background-color: black;
}

.postText {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  min-height: 30px;
  max-height: 100px;
  overflow-y: auto;
  margin-bottom: 5px;
  margin-top: 10px;
}

.upvoteAndEdit {
  display: flex;
  width: 250px;
  justify-content: space-between;
  align-items: center;
}

.upvoteAndEdit button {
  height: 22px;
}

.upvotes {
  display: flex;
  min-width: 85px;
  justify-content: space-between;
  height: 20px;
}
</style>
