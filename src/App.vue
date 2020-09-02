<template>
  <div id="app">
    <nav id="top-nav">
        <ul class="nav-links">
        <router-link to="/">HOME</router-link>
        <li class="city-selector" @mouseenter="ulActive = !ulActive" @mouseleave="ulActive = !ulActive">Find your city <i class="fas fa-angle-down"></i></li>
        <ul class="city-list" v-show="ulActive" @mouseenter="ulActive = true" @mouseleave="ulActive = !ulActive">                
                <router-link 
                class="list-destination"
                v-for="destination in destinations"
                :key="destination.name"  
                :to="{ name: 'DestinationPage', params: { id: destination.name } }"
                @click="ulActive = false">{{ destination.name | capitalize }}</router-link>
        </ul>
        <router-link to="/comparisons">Comparisons</router-link>
        </ul>
    </nav>            
    <!--:key reloads router-view on path change (else won't change if loading same component)-->
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
    data(){
        return{
            ulActive: false,
        }
    },
    computed:{
        destinations(){
            return this.$store.getters.destinationList
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1d1d1d;
  display: grid;
  grid-template-rows: 55px 1fr;
  background-color: #ffcac6;
}

#top-nav{
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    box-shadow: 1px 0px 10px rgba(0, 0, 0, 0.555);
    z-index: 100;
}

#top-nav li{
    list-style: none;
    color: rgba(0, 0, 0, 0.719);
    font-weight: 700;
    padding-left: 20px;
    background-color: inherit;
}
#top-nav li:hover{
    cursor: pointer;
    text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.651);
}

.nav-links{
    display: flex;
    width: 400px;
    justify-content: space-around;
    margin-left: 20px;
}

.nav-links a{
    text-decoration: none;
    color: rgba(0, 0, 0, 0.747);
    font-weight: 600;
}
.nav-links a:hover{
    text-shadow: 0px 0px 0px #ff6d61;
    color: #ff6d61;
}

.city-selector{
    padding: 2px 0px;
}
.city-list{
    position: absolute;
    top: 40px;
    left: 130px;
    background-color: #ff6d61;
    padding: 10px 30px;
    list-style: none;
    display: flex;
    flex-direction: column;
    border-top: 2px solid #ffcac6;
}
.city-list a{
    padding: 2px 0px;
}
.city-list a:hover{
    color: white;
}

.city-list ul:before{
    content: '';
    height: 10px;
    background-color: red;
    display: block;
    position: absolute;
    z-index: 100;
}

</style>
