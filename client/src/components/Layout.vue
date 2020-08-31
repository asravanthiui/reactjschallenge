<template>
  <div class="layout">
    <ul class="tabs-headings">
      <li @click="activateFileTab(false)">Athletes</li>
      <li @click="activateFileTab(true)">Upload Athletes</li>
    </ul>
    <div class="tabs">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout',
  methods: {
    activateFileTab(active){
      if(active){
        this.$router.push('/upload')
      }else {
        this.$router.push('/athletics')
      }
    }
  }
}
</script>

<style scoped>
ul{
    background: #f7f8f8;
    padding: 25px 50px 20px;
}

li{
  cursor: pointer;
  display: inline-block;
  margin-right: 40px;
  color: #036CE6;
  font-weight: bold;
}

.active{
  font-weight: bold;
  color: #036CE6;
}

.tabs{
  margin: 50px 50px;
}
</style>
