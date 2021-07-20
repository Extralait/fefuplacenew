<template>
  <h2  v-bind:style="styleObject">
    {{text}}
  </h2>
</template>

<script>
export default {
  name: "BaseH2Text",
  props: {
    text: {
      type: String,
      default: null
    },
    styleObject: {
      type: Object,
      default: function () {
        return {
        }
      }
    },
  },
}
</script>

<style scoped>
h2{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 120%;
  color: #FFFFFF;
}

</style>