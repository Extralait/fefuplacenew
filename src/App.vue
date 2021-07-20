<template>
  <div id="app">
    <RegPopup
        v-if="$route.hash==='#auth'"
    />
    <Navbar/>
      <router-view
      />
  </div>
</template>

<script>

import Navbar from "@/components/common/Navbar";
import RegPopup from "@/components/common/RegPopup";

export default {
  name: 'App',
  components: {
    Navbar,
    RegPopup
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
}
#app{
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  position: relative;
}

.no-scroll{
  overflow-y: hidden;
  overflow-ч: hidden;
  display: block;
}

::-webkit-scrollbar {
  width: 0;
}


</style>
