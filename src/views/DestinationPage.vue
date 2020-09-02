<template>
  <div class="location-page">
      <div id="location-header" :style="`background-image: url(${destination.image})`">
        <h2>{{ destination.name | capitalize }}</h2>
      </div>

      <div class="location-nav">
          <div @click="currentData = 'qol'" :class="{selected:'qol' == currentData}">Quality of Life</div>
          <div @click="currentData = 'weather'" :class="{selected:'weather' == currentData}">Weather</div>
          <div class="comparison-dropdown">
            <label for="comparison selector">Compare {{ destination.name | capitalize }} with:</label>
            <select name="comparison city" id="comparison-select" @change="changeRoute($event.target)">
              <option :value="null" disabled="disabled" selected="true">Select City:</option>
              <option v-for="(destination, index) in destinations"
              :key="index" 
              :value="destination.name">{{ destination.name | capitalize }}</option>
            </select>
          </div>
      </div> 


      <div class="weather-cont" v-show="currentData === 'weather'">
        <div v-for="(day, i) in weatherData[0]" :key="i" class="weather-card">
          <div class="weather-hdr">
          <h3 v-if="i === 0">{{ day.currentTemp }}ºC</h3>
          <h3 v-if="i !== 0">{{ day.noonTemp }}ºC</h3>
          <h3>{{ day.weekDay }}</h3>
          <p>{{ day.status }}</p>
          </div>
          <p>Humidity: {{ day.humidity }}%</p>
          <p>Rain probability: {{ day.rainProbability }}</p>
        </div>
      </div>

      <div class="qol-cont" v-show="currentData === 'qol'">
        <div class="qol-summary"></div>
      <div v-if="dataError">
        <h2><i class="fas fa-bug"></i></h2>
        <p>There was an error getting the city data.</p>
      </div>
        
        <category-cont 
          v-for="(item, index) in cityScores.categories"
          :key="index"
          :category="item"
          :details="scoreDetails.categories">
        </category-cont>
      </div>


  </div>
</template>

<script>
import apiData from '@/api/teleportApi';
import WeatherHandler from '@/api/weatherHandler'
import CategoryContainer from '@/components/CategoryContainer';

export default {
  components:{
    'category-cont': CategoryContainer,
  },
  data(){
    return{
      //retrieve the route value from the params
      destinationId: this.$route.params.id,
      cityScores: '',
      scoreDetails: '',
      currentData: 'qol',
      dataError: false,
      weatherData: ''
    }
  },
  methods:{
    init(){
      //if DestinationPage is reloaded, vuex state is reset and currentLocation values are set to null
      //if currentLocation values = null set them to match route params id
      if(!this.$store.state.currentLocation || this.$store.state.currentLocation != this.destinationId){
        let currentLocation = this.$store.state.destinations.find(
          destination => destination.name === this.destinationId.city
        );
        //dispatch the state change
        this.setLocation(this.destinationId)
      };
      Promise.all([
        apiData.cityScores(this.destinationId), 
        apiData.scoreDetails(this.destinationId),
        apiData.weatherInfo(this.destinationId)
        ])
      .then((results) => {
        if(!results){
          this.dataError = true;
        }else{
        this.cityScores = results[0]
        this.scoreDetails = results[1]
        this.weatherData = WeatherHandler.formattedData(results[2]);
        } })
      .then(()=>{
        document.querySelector('.qol-summary').innerHTML = this.cityScores.summary;
      })
    },
    setLocation(destinationId){
      this.$store.dispatch('changeCity', destinationId)
    },
    changeRoute(cityB){
      if(cityB.value != this.destination.name){
        this.$store.dispatch('changeComparison', cityB.value);
        this.$router.push({ path: '/comparisons' });
      }else{
        window.alert('Please choose a different city to compare to!');
      }
    }
  },
  computed:{
    currentLocation(){
      return this.$store.getters.currentLocation;
    },
    destination(){
      return this.$store.state.destinations.find(
        destination => destination.name === this.destinationId);
    },
    destinations(){
      return this.$store.getters.destinationList;
    }
  },
  mounted(){
    this.init();
  }
}
</script>

<style>
#location-header{
  height: 220px;
  width: 100%;
  background-position: center;
  background-size: cover;
  align-items: center;
  display: flex;
  justify-content: center;
}
#location-header img{
  width: 100%;
  object-fit: cover;
  height: 100%;
}
#location-header h2{
  color: white;
  font-size: 50px;
  text-shadow: 1px 1px 4px rgb(36, 36, 36);
}

.location-nav{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  color: white;
  background-color: rgb(34, 34, 68);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 10;
}
.location-nav div:hover{
  cursor: pointer;
  text-shadow: 0px 0px 0px white;
}
.location-nav > div{
  padding: 0px 30px;
}
.location-nav div.selected{
  color: white;
  font-weight: 700;
}
.qol-summary{
  width: 700px;
  margin-bottom: 20px;
}

.qol-cont{
  display: flex;
  flex-direction: column;
}

.qol-cont, .weather-cont{
  padding: 20px 40px;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin: auto;
}
.weather-cont{
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  background-color: #ffcac6;
}
.weather-card{
  border: 2px solid #ff6d61;
  color: #ff6d61;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  line-height: 1.8;
  margin: 5px;
}
.weather-cont :first-child{
  transform: scale(1.07);
}
.weather-hdr{
  text-align: center;
}

@media screen and (min-width: 600px){
  .weather-cont{
    grid-template-columns: repeat(3, 1fr);
  }
  .qol-summary{
    width: 90%;
  }
}
@media screen and (min-width: 1200px){
  .weather-cont{
    grid-template-columns: repeat(5, auto);
  }
  .qol-summary{
    width: 70%;
  }
  .qol-cont, .weather-cont{
  width: 1000px;
  padding: 20px 0px;
}
}
</style>