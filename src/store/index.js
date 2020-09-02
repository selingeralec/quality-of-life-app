import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        loggedIn: false,
        currentLocation: null,
        comparisonLocation: null,
        destinations: [
            {name: 'madrid', topDestination: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Madrid%2C_Cuatro_Torres_y_Sierra_2.jpg/800px-Madrid%2C_Cuatro_Torres_y_Sierra_2.jpg'},
            {name: 'dublin', topDestination: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Grafton_St%2C_Dublin.jpg/800px-Grafton_St%2C_Dublin.jpg'},
            {name: 'vienna', topDestination: true, image: 'https://c1.wallpaperflare.com/preview/210/766/571/vienna-austria-city-evening.jpg'},
            {name: 'berlin', topDestination: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Aerial_view_of_Berlin_%2832881394137%29.jpg/800px-Aerial_view_of_Berlin_%2832881394137%29.jpg'},
            {name: 'london', topDestination: true, image: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'},
            {name: 'paris', topDestination: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Paris_-_Eiffelturm_und_Marsfeld2.jpg/582px-Paris_-_Eiffelturm_und_Marsfeld2.jpg'},
            {name: 'oslo', topDestination: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Downtown_Oslo_Norway_skyline.png/800px-Downtown_Oslo_Norway_skyline.png'},
            {name: 'barcelona', topDestination: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Barcelona_skyline.jpg/800px-Barcelona_skyline.jpg'},
            {name: 'sydney', topDestination: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/1280px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg'},
            {name: 'rome', topDestination: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Rome_Skyline_%288012016319%29.jpg/800px-Rome_Skyline_%288012016319%29.jpg'},
            {name: 'amsterdam', topDestination: true, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Amsterdam_%28NL%29%2C_Rokin_--_2015_--_7238.jpg/800px-Amsterdam_%28NL%29%2C_Rokin_--_2015_--_7238.jpg'},
            {name: 'bucharest', topDestination: false, image: 'https://c0.wallpaperflare.com/preview/873/332/929/city-cityscape-romania-landscape.jpg'},
            {name: 'warsaw', topDestination: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Warsaw_Old_Town_Market_Square_10.JPG/800px-Warsaw_Old_Town_Market_Square_10.JPG'},
            {name: 'stockholm', topDestination: false, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Riddarholmen_from_Stockholm_City_Hall_tower.jpg/800px-Riddarholmen_from_Stockholm_City_Hall_tower.jpg'},
            {name: 'boston', topDestination: false, image: 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/boston_web-550bb970ba.jpg'},
            {name: 'bogota', topDestination: false, image: 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/bogota_web-7fc246764f.jpg'},
            {name: 'bangkok', topDestination: false, image: 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/bangkok_web-24b795d6ac.jpg'},

        ]
    },

    getters:{
        currentCity(state){
            return state.currentLocation;
        },
        comparisonCity(state){
            return state.comparisonLocation;
        },
        topDestinations(state){
            return state.destinations.filter(destination => { return destination.topDestination === true })
        },
        destinationList(state){
        //sort cityList alphabetically
            return state.destinations.sort((a, b) => { 
                var nameA = a.name.toLowerCase();
                var nameB = b.name.toLowerCase();
                if(nameA < nameB){
                    return -1;
                }else if(nameA > nameB){
                    return 1;
                }return 0;
             });
        }
    },

    mutations:{
        UPDATE_CITY(state, city){
            state.currentLocation = city;
        },
        UPDATE_COMPARISON(state, city){
            state.comparisonLocation = city;
        }
    },

    actions:{
        changeCity(context, city){
            context.commit('UPDATE_CITY', city)
        },
        changeComparison(context, city){
            context.commit('UPDATE_COMPARISON', city);
        }
    }
}) 