<template>
  <div class="navbar-container">
    <div class="label">
      <img src="../../static/icons/label.svg" alt="">
    </div>
    <div class="nav-bar">
      <div class="org-button">
        <BaseButtonText
            :text="`Организации`"
            :theme="`white`"
        />
      </div>
      <div class="input-container">
        <div class="pseudo-input">
          <input type="text"
                 required
                 id="selection-input"
                 placeholder="Введите название мероприятия"
                 autocomplete="off"
          >
        </div>
        <div class="icon-container"
             onmousedown="return false"
        >
          <img
              src="../../static/icons/search.svg"
              alt=""
          >
        </div>
      </div>
      <div class="button-container">
        <div class="nav-button" id="create-event-nav-btn">
          <BaseButton
              :text="`Создать мероприятие`"
          />
        </div>
        <router-link
            tag="div"
            :to="`#auth`"
            class="nav-button"
            id="log-in-nav-btn">
          <BaseButton
              :text="`Войти`"
              :theme="`white`"
          />
        </router-link>
      </div>
    </div>
    <div class="category">
      <div class="content">
        <BaseCategoryBar/>
      </div>
    </div>
    <div class="slider">
      <div class="content">
        <Slider/>
      </div>
    </div>
  </div>
</template>

<script>

import BaseButton from "@/components/baseComponents/BaseButton";
import BaseButtonText from "@/components/baseComponents/texts/BaseButtonText";
import BaseCategoryBar from "@/components/baseComponents/BaseCategoryBar";
import Slider from "@/components/common/Slider";

export default {
  name: "Navbar",
  components: {
    BaseButton, BaseButtonText,BaseCategoryBar,Slider
  },
}
</script>

<style scoped>
.navbar-container {
  width: 100%;
  background-color: #232323;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

}

.label, .category {
  width: calc(100% / 6);
}

.label, .nav-bar {
  position: relative;
  height: 72px;
  box-shadow: 0 5px 30px 10px rgba(0, 0, 0, 0.15);
  z-index: 3;
}

.nav-bar, .slider {
  width: calc(100% * 5 / 6);
}

.label {
  display: flex;
}

.label img {
  margin: auto;
  max-height: 75%;
  max-width: 75%;
}

.slider {
  position: relative;
  height: auto;
}

.slider::after {
  content: '';
  display: block;
  padding-top: 37.4%;
}

.category {
  position: relative;
  height: auto;
}

.category::after {
  content: '';
  display: block;
  padding-top: 52.5%;
}

.content {
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.button-container {
  display: flex;
  height: 100%;
  width: 380px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2%;
}

#create-event-nav-btn{
  width: 60%;
}

#log-in-nav-btn{
  width: 20%;
}

.nav-button {
  display: flex;
}

.nav-button + .nav-button {
  margin-left: 6%;
}

.org-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1%;
  padding-right: 1%;
  height: 100%;
  border-left: 1px solid #858585;
  transition: all 0.3s;
}

.org-button:hover {
  background-color: #3F3F3F;;
}

.input-container {
  width: 30%;
  display: flex;
  position: relative;
}

.pseudo-input {
  width: 100%;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.input-container input {
  background: none;
  border: none;
  height: 100%;
  width: calc(97% - 43px);
  outline: none;
  padding-left: 3%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF;
  opacity: 0.9;

}

.icon-container {
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  right: 15px;
}

.category .content {
  background: #F5F5F5;
}


</style>