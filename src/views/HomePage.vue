<template>
<div id="home-page">
    <div id="top-cities-container">
        <h4>Top Destinations</h4>
        <div id="cities-container">
            <div class="city-card" 
                v-for="destination in topDestinations" 
                :key="destination.name"
                @click="changeCity(destination.name);"
                :style="`background-image: url(${destination.image})`">
                    <router-link :to="{ name: 'DestinationPage', params: { id: destination.name } }">{{ destination.name | capitalize }}</router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import store from '@/store/index'
export default {
    data(){
        return{
            destinations: store.state.destinations
        }
    },
    methods:{
        changeCity(city){
            this.$store.dispatch('changeCity', city);
        }
    },
    computed:{
        topDestinations(){
            return this.$store.getters.topDestinations;
        }
    }
}
</script>

<style>
#top-cities-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ffcac6;
    text-align: center;
    padding: 20px 0px;
}

#top-cities-container h4{
    font-size: 35px;
    color: #ff6d61;
    font-weight: 800;
    padding-bottom: 10px;
}

#cities-container{
    display: grid;
    grid-template-columns: repeat(3, 30%);
    margin: auto;
    width: 100%;
    justify-content: center;
}
.city-card{
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    border-radius: 10px;
    color: white;
    font-size: 20px;
    font-weight: 600;
    background-position: left;
    text-align: center;
}
.city-card a{
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 300px;
    color: white;
    text-shadow: 1px 1px 4px black;
    text-transform: uppercase;
    font-size: 30px;
    text-decoration: none;
    font-weight: 900;
    letter-spacing: 1px;
}
.city-card:hover{
    cursor: pointer;
    transform: scale(1.01);
    background-color: black;
    transition: .2s ease-in-out;
}

@media screen and (max-width: 1200px) {
    #cities-container{
    grid-template-columns: repeat(2, 1fr);
    }
    .city-card{
        height: 200px;
    }
    .city-card a{
        line-height: 200px;
    }
}
@media only screen and (max-width: 600px) {
    #cities-container{
        grid-template-columns: repeat(1, 90%);
    }

    .cat-cont{
        width: 300px;
    }
}
</style>