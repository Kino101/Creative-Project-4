<template>
  <div class="editing">
    <input v-model="post.heading" placeholder="Heading">
    <p></p>
    <textarea v-model="post.description" placeholder="Description"></textarea>
    <input v-model="passcode" placeholder="Password">
    <p></p>
    <div>
      <button @click="edit(post)">Submit Changes</button>
      <button @click="deletePost(post)">Delete Post</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Editing',
  props: {
    post: {},
    posts: Array,
    getPosts: {type: Function},
  },
  mounted() {
    this.getPosts();
  },
  data() {
    return {
      passcode: "",
    }
  },
  methods: {
    async edit(post) {
      try {
        let response = await axios.put("/api/posts/" + post._id, {
          heading: post.heading,
          description: post.description,
          passcode: this.passcode,
        });
        if(response.data === "Incorrect Password") {
          this.passcode = response.data;
        }
        this.getPosts();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async deletePost(post) {
      try {
        if(this.passcode == "") {
          this.passcode = "Password Needed";
          return;
        }
        let response = await axios.delete('/api/posts/' + post._id + '/delete/' + this.passcode);
        if(response.data === "Incorrect Password") {
          this.passcode = response.data;
        }
        this.getPosts();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style>
.editing {
  display: flex;
  flex-direction: column;
}

.editing input {
  margin-top: 10px;
}
</style>
