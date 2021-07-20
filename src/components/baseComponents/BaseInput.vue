<template>
  <div class="pseudo-input-container">
    <div class="pseudo-input"
         v-bind:class="classObject"
    >
      <div class="img-container"
           v-if="img && !message && theme!=='error'"
      >
        <img
            :src="img"
            alt=""
        >
      </div>
      <p
          v-if="inFocus && message || message"
          v-bind:class="{'short':(img && !message || type === 'password'),'error':theme===`error`}"
          class="active-placeholder low"
          onmousedown="return false"
      >
        {{ placeholder }}
      </p>
      <input
          v-bind:class="{'short':(img && !message || type === 'password'),'low':inFocus && message|| message}"
          v-model="message"
          :type="typeCheck"
          :placeholder="placeholder"
          :required="required"
          readonly
          onfocus="this.removeAttribute('readonly')"
          autocomplete="nope"
          @blur="inFocus=!inFocus"
          @focus="inFocus = !inFocus"
          @input="$emit('inputValue',message)"
      >
      <div class="img-container password-hide"
           v-bind:class="{'visible':type === 'password' && inFocus && message}"
           onmousedown="return false"
           @click="visible = !visible"
      >
        <img
            :src="passwordImg"
            alt=""
        >
      </div>
    </div>
    <div class="values"
         onmousedown="return false"
         v-if="inputValues"
         v-bind:class="{'open':inFocus===true}"
    >
      <div class="value-row"
           v-for="(value,i) in UsingValues"
           @click="choiceRow(value.long_name)"
           :key="i"
      >
        <BaseDescriptionText
            :text="value.long_name"
        />
      </div>
    </div>

  </div>
</template>

<script>
import BaseDescriptionText from "./texts/BaseDescriptionText";
export default {
  name: "BaseInput",
  components: {BaseDescriptionText},
  props: {
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: null
    },
    img: {
      type: String,
      default: null
    },
    inputValues: {
      type: Array,
      default: null
    },
    theme: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      inFocus: false,
      visible: false,
      message: ''
    }
  },
  methods: {
    searchFilter: function (x) {
      let string = x.long_name.toLowerCase()
      let subString = this.message.toLowerCase()
      return string.includes(subString);
    },
    choiceRow: function (message){
      this.message=message
      this.$emit('inputValue',message)
    },
  },
  computed: {
    classObject: function () {
      return {
        'default': this.theme === 'default',
        'right': this.theme === 'right',
        'error': this.theme === 'error',
        'open-dropdown': this.inFocus && this.inputValues
      }
    },
    passwordImg: function () {
      if (this.type === 'password' && this.visible) {
        return `${require('../../static/icons/password-show.svg')}`
      } else {
        return `${require('../../static/icons/password-hide.svg')}`
      }
    },
    typeCheck: function () {
      if (this.type === 'password' && this.visible) {
        return 'text'
      } else {
        return this.type
      }
    },
    UsingValues: function () {
      return (JSON.parse(JSON.stringify(this.inputValues))).filter(this.searchFilter)
    },
  },
  created() {
    if (this.value) {
      this.message = this.value
      this.inFocus = true
    }
  }
}
</script>
<style scoped>
.pseudo-input-container {
  padding-top: 2%;
  padding-bottom: 2%;
  display: flex;
  flex-direction: column;
}
.values {
  position: relative;
  height: 0;
  transition: all 0.3s;
  overflow-y: hidden;
  background: rgba(255, 255, 255, 0.05);
  box-sizing: border-box;
  display: none;
}
.open {
  height: auto !important;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-top: none;
  display: block;
}
.pseudo-input {
  width: 100%;
  height: 48px;
  background: rgba(255, 255, 255, 0.05);
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid;
}
/* удаление иконки очистки поля в IE */
input[type="text"]::-ms-clear {
  display: none;
}
/* удаление иконки отображения пароля в IE */
input[type="password"]::-ms-reveal {
  display: none;
}
.value-row {
  display: flex;
  text-align: left;
  padding-left: 5%;
  padding-top: 1.5%;
  padding-bottom: 1.5%;
  cursor: pointer;
  transition: all 0.3s;
}
.value-row:hover{
  background-color: #444644;
}
.value-row:last-child {
  padding-bottom: 3%;
}
input {
  height: 100%;
  width: 95%;
  padding-left: 5%;
  background: no-repeat;
  outline: none;
  border: none;
}
.active-placeholder {
  opacity: 0.5;
  text-align: left;
  width: 95%;
  padding-left: 5%;
}
.short {
  padding-left: 5%;
  width: 83%;
}
.low {
  height: 50%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
}
.default {
  border-color: rgba(255, 255, 255, 0.2);
}
input, .active-placeholder {
  color: #FFFFFF;
}
.right {
  border-color: #00FFC2;
}
.error {
  border-color: rgba(231, 82, 82, 0.5);
}
.error .active-placeholder {
  color: rgba(231, 82, 82, 0.5);
}
.error input::-webkit-input-placeholder {
  color: rgba(231, 82, 82, 0.5);
}
.img-container {
  height: 100%;
  width: 15%;
  display: flex;
}
img {
  width: 50%;
  margin: auto;
}
.password-hide {
  display: none;
}
.visible {
  display: flex;
}
.open-dropdown {
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 100px #444644 inset !important;
  color: #FFFFFF;
  -webkit-text-fill-color: #FFFFFF !important;
}
</style>