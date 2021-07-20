<template>
  <p  v-bind:class="classObject">
    {{text}}
  </p>
</template>

<script>
export default {
  name: "BaseDescriptionText",
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
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #FFFFFF;
}

.white-text{
  color: white;
}


</style>