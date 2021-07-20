<template>
  <div class="category-container">
    <div class="category-sub-container">
        <div class="row-container"
             v-for="(value,key,i) in content"
             @click="active=key"
             :key="i"
        >
          <BaseCategoryLi
              :text="value"
              :isActive="active===key"
          />
        </div>
    </div>
  </div>
</template>

<script>
import BaseCategoryLi from "@/components/baseComponents/BaseCategoryLi";

export default {
  name: "BaseCategoryBar",
  components: {
    BaseCategoryLi
  },
  data(){
    return{
      content:{
        'all':'Все',
        'science':'Наука',
        'sport':'Спорт',
        'culture':'Культура',
        'creation':'Творчество',
        'entertainment':'Развлечение',
        'social_activity':'Общественная деятельность',
        'learning_activities':'Учебная деятельность',
      },
      active: 'all'
    }
  }
}
</script>

<style scoped>
.category-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.category-sub-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
  direction: rtl;
}



.category-sub-container::-webkit-scrollbar {
  width: calc(4px);
}

.category-sub-container::-webkit-scrollbar-track {
  background-color: #E3E3E3;
}

.category-sub-container::-webkit-scrollbar-thumb {
  background-color: #C0C0C0;
}

.category-sub-container::-webkit-scrollbar-button {
  /*  кнопки на полосе прокрутки*/
}


</style>