<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import FramePage from './views/framePage'
import './assets/css/global.css'
export default {
  name: 'App',
  components: {
    FramePage,
  },
}
</script>
<style>


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
