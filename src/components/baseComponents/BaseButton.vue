<template>
  <button
      :type="type"
      v-bind:class="classObject"
      class="button"
  >
    <BaseButtonText
        :text="text"
        :theme="theme"
    />
  </button>
</template>

<script>
import BaseButtonText from "@/components/baseComponents/texts/BaseButtonText";

export default {
  name: "BaseButton",
  components: {
    BaseButtonText
  },
  props: {
    text: {
      type: String,
      default: null
    },
    type: {
      type:String,
      default: 'button'
    },
    theme: {
      type: String,
      default: null
    },
  },
  computed: {
    classObject: function () {
      return {
        'default-button': !this.theme,
        'white-button': this.theme === 'white'
      }
    }
  },
}
</script>

<style scoped>
.button {
  background-blend-mode: multiply, normal;
  border-radius: 4px;
  border: none;
  outline: none;
  transition: all 0.3s;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.default-button {
  background: linear-gradient(360deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%), #00FFC2;
  padding: 10px 0 10px 0
}

.default-button:hover {
  background: linear-gradient(360deg, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0) 100%), #A0FFE8;
}

.white-button {
  border: 1px solid #FFFFFF;
  padding: 9px 0 9px 0;
  background: none;
}

.white-button:hover {
  background-color: #fff;
}

.white-button:hover p{
  color: #2c3e50;
}


</style>