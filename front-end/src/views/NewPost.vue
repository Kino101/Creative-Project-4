<template>
<div>
  <h1>Create A Post</h1>
  <div class="newPost">
    <div class="form">
      <div class="inputBoxes">
        <input v-model="heading" placeholder="Heading">
        <p></p>
        <textarea v-model="description" placeholder="Description"></textarea>
        <input v-model="passcode" placeholder="Editing Password">
        <p></p>
      </div>
      <div class="uploadButton">
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
    </div>
    <div class="uploaded" v-if="addPost">
      <h2>Successfully Posted!</h2>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'newpost',
  data() {
    return {
      heading: "",
      description: "",
      passcode: "",
      file: null,
      addPost: null,
    }
  },

  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },

    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/posts', {
          heading: this.heading,
          description: this.description,
          upvotes: 0,
          path: r1.data.path,
          passcode: this.passcode,
        });
        this.addPost = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
  .newPost {
    display: flex;
    flex-wrap: wrap;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10%;
  }

  .inputBoxes {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: auto;
  }
  .inputBoxes textarea, input{
    width: 200px;
  }
  .inputBoxes input {
    margin-top: 10px;
  }

  .uploadButton {
    display: flex;
    margin-top: 10px;
  }

  .uploaded {}
</style>
