<template>
  <div class="cat-cont">
    <div class="cat-overview" @click="detailsOpen = !detailsOpen">
      <h3><i class="fas" :class="{'fa-angle-down': detailsOpen, 'fa-angle-right': !detailsOpen}"></i> {{ category.name }}</h3>
      <category-stat :stat="category"></category-stat>
    </div>
    <transition name="open-fade">
    <category-details :details="details" :category="category" v-show="detailsOpen">
    </category-details>
    </transition>


  </div>
</template>

<script>
import CategoryStat from '@/components/CategoryStat';
import CategoryDetails from '@/components/CategoryDetails';

export default {
  props:['category', 'details'],
  components:{
    'category-stat': CategoryStat,
    'category-details': CategoryDetails
  },
  data(){
    return{
      detailsOpen: false
    }
  },

}
</script>

<style scoped>
.cat-cont{
  width: 660px;
  padding: 2px 0px;
}
.cat-cont h3{
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 1px;
  width: 350px;
  color: rgba(0, 0, 0, 0.747);
  cursor: pointer;
}
.cat-overview{
  display: flex;
  text-transform: uppercase;
  font-size: 12px;
  margin-top: 5px;
  width: inherit;
}
.fa-angle-right, .fa-angle-down{
  opacity: 35%;
  width: 10px;
}

.open-fade-enter-active{
  transition: all 1s ease;
}
.open-fade-leave-active{
  transition: all 0.5s ease-out;
}
.open-fade-enter, .open-fade-leave-to{
  transform: translateY(-5px);
  opacity: 0;
}
</style>