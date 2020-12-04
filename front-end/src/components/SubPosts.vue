<template>
  <div class="viewComments">
    <div class="showComments">
      <button @click="toggleComment">Comment</button>
    </div>
    <div v-if="comment">
      <div v-for="subPost in post.subPosts" :key="subPost.id">
        <p class="comment">{{subPost.comment}}</p>
      </div>
      <div class="newComment">
        <textarea v-model="newComment"></textarea>
        <button @click="postComment">Post Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SubPosts',
  props: {
    post: {},
  },
  data () {
    return {
      comment: false,
      newComment: "",
    }
  },
  methods: {
    toggleComment() {
      this.comment = !this.comment;
    },
    async postComment() {
      try {
        if(this.newComment == "") {
          return;
        }
        let response = await axios.put("/api/posts/" + this.post._id + "/comment", {
          comment: this.newComment,
        });
        this.post.subPosts = response.data.subPosts;
        this.newComment = "";
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scope>
.viewComments {
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.showComments {
  align-self: flex-start;
  margin-bottom: 10px;
}
.comment {
  word-wrap: break-word;
  text-align: left;
  padding: 2px;
  border-style: solid;
  background-color: white;
}
.newComment {
  background-color: green;
  display: flex;
  flex-direction: column;
}
.newComment textarea {
  width: inherit;
}
</style>
