<template>
  <div id="app">
    <div class="mainHeading">
      <h1><img src="/Pic_Share_Logo.png" class="logo">Pic Share</h1>
    </div>
    <div id="nav">
      <router-link to="/NewPost">New Post</router-link>
      <router-link to="/">Recent Posts</router-link>
      <router-link to="/trending">Trending</router-link>
      <router-link to="/Search">Search</router-link>
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
  background: linear-gradient(to bottom right, #E7717D, #C2CAD0);
  position: relative;
  min-height: 100vh;
}

.logo {
  width: 40px;
  position: absolute;
  left: 50px;
  top: 5px;
}
.mainHeading {
  margin-bottom: 0px;
  background-color: #AFD275;
}

#nav {
  padding: 15px;
  display: flex;
  justify-content: space-around;
  background-color: white;
  margin-bottom: 20px;
}

#nav a {
  font-weight: bold;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #AFD275;
}

#nav a:hover {
  color: gray;
}

h1 {
  width: 100%;
  padding: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
}

button {
  background-color: #E7717D;
  background: linear-gradient(to bottom right, #C2717D, #E7717D);
  border-radius: 5px;
  border-style: double;
  border-color: #C2CAD0;
}

input, textarea {
  padding: 2px 5px 2px 5px;
}

h2 {
  text-decoration: underline;
  margin-bottom: 20px;
  font-style: italic;
}

h3 {
  font-size: 20px;
}

.spacer {
  height: 50px;
  margin-top: 30px;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  background-color: #AFD275;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
}

a {
  text-decoration: none;
  color: inherit;
}

.footer > a:hover {
  color: white;
  text-decoration: none;
}
</style>
