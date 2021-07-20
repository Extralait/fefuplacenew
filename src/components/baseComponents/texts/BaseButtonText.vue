<template>
  <p  v-bind:class="classObject">
    {{text}}
  </p>
</template>

<script>
export default {
  name: "BaseButtonText",
  props: {
    text: {
      type: String,
      default: null
    },
    theme: {
      type: String,
      default: null
    },
  },
  computed:{
    classObject: function (){
      return {
        'white-text':this.theme==='white'
      }
    }
  }
}
</script>

<style scoped>
p{
  font-family: Roboto;
  font-size: 16px;
  line-height: 20px;
  transition: all 0.3s;
}

.white-text{
  color: white;
}





</style>