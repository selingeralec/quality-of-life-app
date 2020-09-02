<template>
<div class="cat-details">
  <ul>
        <li v-for="(item, index) in detail(category.name)" :key="index">
          <div v-if="item.type === 'currency_dollar'">
            <label>{{ strParser(item.label) }}</label> <p>${{ item.currency_dollar_value }}</p>
          </div>
          <div v-if="item.type === 'float'">
            <label>{{ strParser(item.label) }}</label> <p>{{ numParser(item.float_value) }}</p>
          </div>
          <div v-if="item.type === 'int'">
            <label>{{ strParser(item.label) }}</label> <p>{{ numParser(item.int_value) }}</p>
          </div>
          <div v-if="item.type === 'string'">
            <label>{{ strParser(item.label) }}</label> <p>{{ item.string_value }}</p>
          </div>
        </li>
      </ul>
</div>
</template>

<script>
export default {
  props:['category', 'details'],
  methods:{
    detail(category){
      return this.details.find(x => x.label === category).data;
    },
    strParser(text){
      if(text.includes('[Teleport')){
        let res = text.split('[');
        return res[0];
      }
      return text;
    },
    numParser(num){
      if(num % 1 != 0){
        return num.toFixed(2)
      }
      return num
    }
  }
}
</script>

<style scoped>
.cat-details ul{
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  padding-top: 2px;
  margin-top: 2px;
}
.cat-details div{
  height: 30px;
  align-items: center;
  display: flex;
  font-size: 14px;
  border-bottom: 2px dashed rgba(0, 0, 0, 0.2);
  padding-left: 2px;
}
.cat-details label{
  width: 380px;
}
.cat-details li{
  list-style: none;
}
</style>