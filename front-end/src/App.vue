<template>
  <div id="app">
    <h1>Pic Share</h1>
    <div id="nav">
      <router-link to="/">Recent Posts</router-link> |
      <router-link to="/NewPost">New Post</router-link> |
      <router-link to="/trending">Trending</router-link>
    </div>
    <router-view/>
    <div class="spacer"><div class="footer"><a href="https://github.com/Kino101/Creative-Project-4">GitHub</a></div></div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  background-color: #EB89B5;
  position: relative;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

h1 {
  width: 100%;
  padding: 10px;
  background-color: #FFD7E9;
}

.spacer {
  height: 40px;
  margin-top: 20px;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  background-color: #FFD7E9;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
}
</style>
