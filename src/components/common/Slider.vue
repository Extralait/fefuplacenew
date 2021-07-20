<template>
  <div class="slider-container unselectable" onmousedown="return false"
  >
    <div class="side-alert"
         v-bind:class="{'display-block':onDrag}"
         @mouseup="dragDragSlide"
         @mousemove="coordSearch"
    ></div>
    <div class="slider"
         @mousedown="dragDragSlide"
         @mouseup="dragDragSlide"
    >
      <div class="slider-content"
           v-bind:style="sliderWidth"
           v-bind:class="{'transition':!onDrag}"
      >
        <div class="slider-body"
        >
          <div class="slider-item"
               v-for="i in slides"
               :key="i"
          >
            <img
                :src="`${require('../../static/img/default-slide.svg')}`"
                alt=""
            >
          </div>
        </div>
      </div>
      <div class="pagination left"
           v-if="slideNumber > 0"
           @click="paginationClick(-1)"
      >
        <img
            :src="`${require('../../static/icons/slider-arrow.svg')}`"
            alt=""
        >
      </div>
      <div class="pagination right"
           v-if="slideNumber <slides.length-1"
           @click="paginationClick(1)"
      >
        <img
            style="transform: rotate(180deg)"
            :src="`${require('../../static/icons/slider-arrow.svg')}`"
            alt=""
        >
      </div>
    </div>
  </div>
</template>
<script>


export default {
  name: "Slider",
  data() {
    return {
      onDrag: false,
      lastCoords: 0,
      lastDifference: 0,
      slideNumber: 0,
      isPaginationClick: false,
      sliderKey: 0,
      slides: [1, 2, 3, 4, 5, 6]
    }
  },
  components: {},
  methods: {
    dragDragSlide: function (e) {
      if (!this.onDrag) {
        this.lastCoords = e.pageX
      } else {
        let sliderContent = document.getElementsByClassName('slider-content')[0]
        if (this.lastDifference >= document.documentElement.clientWidth / 8 && this.slideNumber < this.slides.length - 1) {
          this.slideNumber += 1
          sliderContent.style.right = String(this.sliderPosition) + "px"
        } else {
          if (this.lastDifference <= -document.documentElement.clientWidth / 8 && this.slideNumber > 0) {
            this.slideNumber -= 1
            sliderContent.style.right = String(this.sliderPosition) + "px"
          } else {
            sliderContent.style.right = String(this.sliderPosition) + "px"
          }
        }
      }
      this.onDrag = !this.onDrag
      this.lastDifference = 0
      this.isPpaginationClick = false
    },
    coordSearch: function (e) {
      let difference = this.lastCoords - e.pageX
      if (this.slideNumber === 0 && difference < 0) {
        difference = 0
      } else {
        if (this.slideNumber === this.slides.length - 1 && difference > 0) {
          difference = 0
        }
      }
      document.getElementsByClassName('slider-content')[0].style.right = String(difference + this.sliderPosition) + "px"
      this.lastDifference = difference
    },
    rebuild: function () {
      let sliderItem = document.getElementsByClassName('slider-item')[0]
      let sliderContent = document.getElementsByClassName('slider-content')[0]
      sliderContent.style.right = String(this.slideNumber * sliderItem.offsetWidth) + "px"
    },
    paginationClick: function (i) {
      this.slideNumber = this.slideNumber + i
      this.onDrag = true
      this.lastDifference = 0
      this.dragDragSlide()
    },

  },
  computed: {
    sliderPosition: function () {
      let sliderItem = document.getElementsByClassName('slider-item')[0]
      if (sliderItem) {
        return this.slideNumber * Number(getComputedStyle(sliderItem).width.replace('px', ''))
      } else {
        return 0
      }
    },
    sliderWidth: function () {
      return {width: String(100 * this.slides.length) + '%'}
    },

  },
  created() {
    window.addEventListener("resize", this.rebuild);
  },
  destroyed() {
    window.removeEventListener("resize", this.rebuild);
  },

}
</script>

<style scoped>
.slider {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  height: 100%;
}

.slider-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.unselectable {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently                             not supported by any browser */
}

.slider-content {
  position: relative;
  width: 100%;
  height: 100%;
  right: 0;
}

.slider-body {
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
}

.side-alert {
  width: 100%;
  height: 100%;
  position: fixed;
  cursor: default;
  display: none;
  z-index: 1;
  top: 0;
  left: 0;
}

.pagination {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  top: 0;
  bottom: 0;
  width: 4%;
  height: 100%;
  transition: all 0.3s;
  z-index: 1;
  cursor: pointer;
}

.pagination img {
  height: 40px;
  position: relative;
}

img + img {
  margin-left: 1%;
}

.slider-item {
  cursor: grab;
  width: 100%;
  height: 100%;
  background-color: white;
  overflow-x: hidden;
  overflow-y: hidden;
}

.slider-item img{
  width: 100%;
  min-height: 100%;
}

.left {
  left: 0;
}

.right {
  right: 0;
}

.pagination:hover {
  background: rgba(0, 0, 0, 0.05);
}

.display-block {
  display: block;
  cursor: grabbing;
}

.transition {
  transition: all 0.5s;
}


</style>