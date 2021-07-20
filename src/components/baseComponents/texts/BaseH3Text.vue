<template>
  <h3  v-bind:style="styleObject">
    {{text}}
  </h3>
</template>

<script>
export default {
  name: "BaseH3Text",
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
h3{
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
  color: #FFFFFF;
}

</style>