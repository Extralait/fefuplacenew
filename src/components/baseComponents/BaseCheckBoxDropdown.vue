<template>
  <div class="container"></div>
</template>

<script>
export default {
  name: "BaseCheckBoxDropdown",
  props: {
    title: {
      type: String,
      default: null
    },
    values:{
      type: Object,
      default: null
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },

}
</script>

<style scoped>

</style>