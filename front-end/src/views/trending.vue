<template>
  <div class="trending">
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
        <div class="editing" v-if="post.editing">
          <input v-model="post.heading" placeholder="Heading">
          <p></p>
          <textarea v-model="post.description" placeholder="Description"></textarea>
          <div>
            <button @click="edit(post)">Submit Changes</button>
            <button @click="deletePost(post)">Delete Post</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'trending',
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

    async incrementUpvotes(post) {
      try {
        let response = await axios.put("/api/posts/" + post._id + "/upvote", {
          upvotes: post.upvotes + 1,
        });
        post.upvotes = response.data.upvotes;
        this.posts.sort((a, b) => {
          if(a.upvotes < b.upvotes) return 1;
          if(b.upvotes < a.upvotes) return -1;
          return 0;
        });
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

    async edit(post) {
      try {
        await axios.put("/api/posts/" + post._id, {
          heading: post.heading,
          description: post.description,
        });
        this.getPosts();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async deletePost(post) {
      try {
        await axios.delete('/api/posts/' + post._id + '/delete');
        this.getPosts();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.trending {
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
  min-width: 90px;
  justify-content: space-between;
  height: 20px;
}

.editing {
  display: flex;
  flex-direction: column;
}
</style>
