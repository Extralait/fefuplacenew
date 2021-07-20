<template>
  <div 
      class="row unselectable"
      v-bind:class="{'active':isActive}"
  >
    <BaseH1Text
      :text="text"
      :style-object="{color:'black'}"
    />
  </div>
</template>

<script>
import BaseH1Text from "@/components/baseComponents/texts/BaseH1Text";

export default {
  name: "BaseCategoryLi",
  components:{
    BaseH1Text
  },
  props: {
    text: {
      type: String,
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
.row{
  width: calc(90% - 4px);
  border-right: 4px solid #F5F5F5;
  cursor: pointer;
  text-align: left;
  padding-left: 7%;
  padding-right: 3%;
  padding-top: 4%;
  padding-bottom: 4%;
  transition: border-color 0.3s;
}

.row:hover{
}

.active{
  background: linear-gradient(45deg,#F5F5F5, #fff);
  background-size: 300% 300%;
  border-color: #323232;
  animation: gradient 0.5s  forwards;
}

.active:hover{
  border-color: #323232;
}

@keyframes gradient {
  0% {
    background-position: 0 100%;
  }
  100% {
    background-position: -50% 100%;
  }
}



.unselectable {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;           /* Non-prefixed version, currently                             not supported by any browser */
}

</style>