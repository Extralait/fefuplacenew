<template>
  <h1  v-bind:style="styleObject">
    {{text}}
  </h1>
</template>

<script>
export default {
  name: "BaseH1Text",
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
h1{
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #FFFFFF;
}

</style>