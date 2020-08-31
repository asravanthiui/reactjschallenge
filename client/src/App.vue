<template>
  <div id="page-container">
    <div id="app">
      <FlashMessage :position="'right bottom'"></FlashMessage>
      <layout/>
    </div>
  </div>
</template>

<script>
import Layout from './components/Layout.vue'

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: white;
}

#page-container{
  background: #232C47; 
  height: 100%;
  position: relative;
  padding-top: 50px;
}
</style>
