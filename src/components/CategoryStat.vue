<template>
  <div class="stat-container">
      <h4>{{ Math.floor(stat.score_out_of_10) }}</h4>
      <div class="stat-bar">
          <div class="stat-value"
          :style="{width: Math.floor(stat.score_out_of_10)*10+'%', 'background-color': stat.color}"></div>
      </div>
  </div>
</template>

<script>
export default {
    props:['stat']
}
</script>

<style scoped>
.stat-container{
    display: flex;
    align-items: center;
}
.stat-bar{
    height: 12px;
    width: 250px;
    background-color: rgba(0, 0, 0, 0.1);
    margin-left: 5px;
}
.stat-value{
    height: 12px;
}
</style>