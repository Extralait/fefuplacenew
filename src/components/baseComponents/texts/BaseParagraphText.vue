<template>
  <p  v-bind:style="styleObject">
    {{ text }}
  </p>
</template>

<script>
export default {
  name: "BaseParagraphText",
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
p {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 143%;
  color: #FFFFFF;
}
</style>