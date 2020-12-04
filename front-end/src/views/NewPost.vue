<template>
<div>
  <h2>Create A Post</h2>
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
        <input class="fileButton" type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
    </div>
    <div class="uploaded" v-if="addPost">
      <h3>Successfully Posted!</h3>
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
    align-items: center;
    justify-content: center;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .inputBoxes {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: auto;
  }
  .inputBoxes textarea, input{
    width: 250px;
  }
  .inputBoxes input {
    margin-top: 10px;
  }

  .uploadButton {
    display: flex;
    margin-top: 10px;
    margin-left: -5px;
  }
  .uploadButton input {
    width: 195px;
  }

  .uploaded {
    margin-left: 8%;
    margin-right: 8%;
  }
</style>
