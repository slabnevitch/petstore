<template>
  <div id="app">
    <!-- <transition name="fade"> -->
      <!-- <keep-alive> -->
        <router-view/>
      <!-- </keep-alive> -->
    <!-- </transition>   -->
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active{
  transition: opacity .5s ease-out;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
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

</style>
