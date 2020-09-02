<template>
  <div class="comparison-cont">

    <div class="comp-nav">
        <div class="comp-dropdown">
            <select name="city A" class="city-select" v-model="selectedA">
              <option selected disabled>Select City:</option>
              <option v-for="(destination, index) in destinations"
              :key="index" 
              :value="destination.name">{{ destination.name | capitalize }}</option>
            </select>

            <select name="city B" class="city-select" v-model="selectedB">
              <option disabled selected>Select City:</option>
              <option v-for="(destination, index) in destinations"
              :key="index" 
              :value="destination.name">{{ destination.name | capitalize }}</option>
            </select>

            <button class="comp-btn" @click="changeCities(selectedA, selectedB)">Compare Cities</button>
        </div>
    </div>


    <div class="comp-cont">
    <div class="empty-cont" v-if="!cityA.name && !cityB.name">
        <h2>Find Your Ideal City</h2>
        <p>Compare quality of life data from 10+ locations around the world</p>
    </div>
    <div class="comp-results" v-if="cityA.name && cityB.name">
        <div class="comp-top3">
            <div class="top3-city">
                <div class="top3-header">
                    <h3><span>{{ cityA.name | capitalize }}</span> beats {{ cityB.name | capitalize }} in {{ cityA.winningCategories.length }}/17 categories...</h3>
                </div>
                <div class="top3-footer">
                    <div class="top3-category" 
                    v-for="(item, index) in top3(cityA)"
                    :key="index">
                        <div><i class="fas" :class="itemIcon(item.title)"></i></div>
                        <h5>{{ item.title | capitalize }}</h5>
                        <p>+{{ Math.floor(item.difference*10) }}%</p>
                    </div>
                </div>
            </div>
            <div class="top3-city">
                <div class="top3-header rev">
                    <h3>...<span>{{ cityB.name | capitalize }}</span> beats {{ cityA.name | capitalize }} in {{ cityB.winningCategories.length }}/17 categories</h3>
                </div>
                <div class="top3-footer">
                    <div class="top3-category" 
                    v-for="(item, index) in top3(cityB)"
                    :key="index">
                        <div><i class="fas" :class="itemIcon(item.title)"></i></div>
                        <h5>{{ item.title | capitalize }}</h5>
                        <p>+{{ Math.floor(item.difference*10) }}%</p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div v-if="cityA.name!=undefined && cityB.name!=undefined" class="cat-table">
    <table v-for="(category, index) in cityA.data[0].categories" :key="index">
        <tr>
            <th><h3>{{ category.name.toUpperCase() }}</h3><i class="fas" :class="itemIcon(category.name)"></i></th>
            <th><category-stat :stat="cityA.data[0].categories[index]"/></th>
            <th><category-stat :stat="cityB.data[0].categories[index]"/></th>
        </tr>
        <tr v-for="(item, i) in detail(category.name)" :key="item+i">
            <td>{{ strParser(item.label) }}</td>
                <td v-if="item.type === 'currency_dollar'">${{ item.currency_dollar_value }}</td>
                <td v-if="item.type === 'float'">{{ numParser(item.float_value) }}</td>
                <td v-if="item.type === 'int'">{{ numParser(item.int_value) }}</td>
                <td v-if="item.type === 'string'">{{ item.string_value }}</td>
            
                <td>{{ dataB(category.name, item) }}</td>
                
        </tr>
    </table>
    <table>
        <tr>
            <th><h3>{{ cityA.details[0][1].label }}</h3><i class="fas" :class="itemIcon(cityA.details[0][1].label)"></i></th>
        </tr>
        <tr v-for="(category, index) in cityA.details[0][1].data" :key="index">
            <td>{{ category.label }}</td>
            <td>{{ numParser(category.float_value) }}</td>
            <td>{{ dataB(cityA.details[0][1].label, category) }}</td>
        </tr>
        
        <tr>
            <th><h3>{{ cityA.details[0][2].label }}</h3><i class="fas" :class="itemIcon(cityA.details[0][2].label)"></i></th>
        </tr>
        <tr v-for="(item, index) in cityA.details[0][2].data" :key="'B'+index">
            <td>{{ item.label }}</td>
                <td v-if="item.type === 'float'">{{ item.float_value }}</td>
                <td v-if="item.type === 'string'">{{ item.string_value }}</td>
            
                <td>{{ dataB(cityA.details[0][2].label, item) }}</td>
        </tr>
    </table>
    </div>

    </div><!--/comparison-cont-->


    <div class="comp-footer" v-if="cityA.name && cityB.name">
        <h3 class="comp-cityA">{{ cityA.name | capitalize }}</h3>
        <h3 class="comp-cityB">{{ cityB.name | capitalize }}</h3>
    </div>

  </div>
</template>

<script>
import apiData from '@/api/teleportApi';
import CategoryStat from '@/components/CategoryStat';

export default {
    components:{
        'category-stat': CategoryStat,
    },
    data(){
        return{
            categories: [
                {title: 'Housing', icon: 'fa-home'},
                {title: 'Tolerance', icon: 'fa-hands-helping'},
                {title: 'Cost of Living', icon: 'fa-piggy-bank'},
                {title: 'Startups', icon: 'fa-warehouse'},
                {title: 'Venture Capital', icon: 'fa-chart-bar'},
                {title: 'Travel Connectivity', icon: 'fa-plane'},
                {title: 'Commute', icon: 'fa-bus'},
                {title: 'Business Freedom', icon: 'fa-briefcase'},
                {title: 'Safety', icon: 'fa-shield-alt'},
                {title: 'Healthcare', icon: 'fa-heartbeat'},
                {title: 'Education', icon: 'fa-graduation-cap'},
                {title: 'Environmental Quality', icon: 'fa-leaf'},
                {title: 'Economy', icon: 'fa-industry'},
                {title: 'Taxation', icon: 'fa-hand-holding-usd'},
                {title: 'Internet Access', icon: 'fa-wifi'},
                {title: 'Leisure & Culture', icon: 'fa-film'},
                {title: 'Outdoors', icon: 'fa-tree'},
                {title: 'City Size', icon: 'fa-building'},
                {title: 'Climate', icon: 'fa-sun'}
        ],
        cityA: { name: undefined, data: [], details: [], winningCategories: [] },
        cityB: { name: undefined, data: [], details: [], winningCategories: [] },
        isLoading: true,
        selectedA: '',
        selectedB: ''
        }
    },
    methods:{
        init(){
            this.reset();
            Promise.all([
                apiData.cityScores(this.$store.getters.currentCity),
                apiData.scoreDetails(this.$store.getters.currentCity), 
                apiData.cityScores(this.$store.getters.comparisonCity),
                apiData.scoreDetails(this.$store.getters.comparisonCity)])
            .then((results) => {
                this.cityA.name = this.$store.getters.currentCity;
                this.cityA.data.push(results[0]);
                this.cityA.details.push(results[1].categories);

                this.cityB.name = this.$store.getters.comparisonCity;
                this.cityB.data.push(results[2]);
                this.cityB.details.push(results[3].categories);
            })
            .then(() => this.compareCategories(this.cityA.data[0].categories, this.cityB.data[0].categories) )
            .then(() => { 
                this.cityA.winningCategories.sort((a, b) => b.difference - a.difference);
                this.cityB.winningCategories.sort((a, b) => b.difference - a.difference); 
            })
            .then(() => this.isLoading = false );
        },
        compareCategories(dataA, dataB){
            //determine which categories each city scores highest in
            for(let i=0; i<dataA.length; i++){
                if(dataA[i].score_out_of_10 < dataB[i].score_out_of_10){
                        this.cityB.winningCategories.push(
                            { title: dataA[i].name, difference: this.difference(dataB[i].score_out_of_10, dataA[i].score_out_of_10) }
                        );
                }else{
                        this.cityA.winningCategories.push(
                            { title: dataA[i].name, difference: this.difference(dataA[i].score_out_of_10, dataB[i].score_out_of_10) }
                        );
                }
            }
        },
        difference(a, b){
            let result = a - b;
            return result.toFixed(2);
        },
        changeCities(cityA, cityB){
            this.$store.dispatch('changeCity', cityA);
            this.$store.dispatch('changeComparison', cityB);
            this.init();
        },
        itemIcon(item){
            return this.categories.find(x => x.title.toLowerCase() === item.toLowerCase()).icon;
        },
        top3(city){
            return city.winningCategories.slice(0, 4);
        },
        reset(){
            this.cityA = { name: undefined, data: [], details: [], winningCategories: [] };
            this.cityB = { name: undefined, data: [], details: [], winningCategories: [] };
        },
        detail(category){
            return this.cityA.details[0].find(x => x.label === category).data;
        },
        strParser(text){
            if(text.includes('[Teleport')){
                let res = text.split('[');
                return res[0];
            }
            return text;
        },
        numParser(value){
            if(value % 1 != 0){
                return Number(value).toFixed(2)
            }
            return value
        },
        dataB(category, item){     
            let value = this.cityB.details[0].find(x => x.label === category).data.find(x => x.label === item.label);
            if(value === undefined || value === null){
                value = 'No data found :(';
                return value;
            }else{
                switch (item.type){
                    case 'currency_dollar':
                        return `$${value.currency_dollar_value}`
                        break;
                    case 'float':
                        return this.numParser(value.float_value);
                        break;
                    case 'int':
                        return this.numParser(value.int_value);
                        break;
                    case 'string':
                        return value.string_value;
                        break;
                    case 'percent':
                        return Math.floor(value.percent_value*10)+'%';
                        break;
                    case 'url':
                        return value.url_value;
                        break;
                    default: 
                    return 'No data found :(';
                }
            }
        }
    },
    computed:{
        destinations(){
            return this.$store.getters.destinationList;
        }
    },
    mounted(){
        if(this.$store.getters.currentCity && this.$store.getters.comparisonCity){
            this.init(this.$store.getters.currentCity, this.$store.getters.comparisonCity);
        }
        this.isLoading = false;
    }
}
</script>

<style scoped>
.comp-nav{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 10px 0px;
    color: white;
    background-color: rgb(34, 34, 68);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8);
    position: relative;
    z-index: 10;
    height: 40px;
}
.comp-dropdown{
    display: flex;
    justify-content: space-around;
    width: 40%;
    align-items: center;
    height: 100%;
}

.city-select{
    font-size: 16px;
    padding: 2px 10px;
}
.comp-btn{
    font-size: 16px;
    cursor: pointer;
    border: 2px solid white;
    color: white;
    border-radius: 2px;
    padding: 5px 10px;
    text-transform: uppercase;
    background-color: inherit;
    font-weight: 700;
}
.comp-btn:hover{
    background-color: white;
    color: rgb(34, 34, 68);
    border: 2px solid white;
    border-radius: 2px;
}
.rev{
    justify-content: flex-end;
}
.top3-city{
    width: 100%;
    margin: auto;
    color: #ff6d61;
    padding-bottom: 20px;
    background-color: #ffcac6;
}
.top3-city > *{
    width: 1000px;
    margin: auto;
}
.top3-header{
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    font-size: 20px;
    font-weight: 900;
}
.top3-footer{
    display: grid;
    grid-template-columns: repeat(4, auto);
}
.top3-category{
    border-radius: 50%;
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    font-size: 18px;
    line-height: 1.5;
    background-color: #ff6d61;
    color: white;
}
.top3-category div{
    font-size: 22px;
}
.top3-category h5{
    font-weight: 900;
    font-size: 18px;
    text-align: center;
}
.top3-header h3{
    font-weight: 800;
    font-size: 30px;
}
.top3-header span{
    font-size: 38px;
}

.comp-cont{
    background-color: #ffcac6;
}

.comp-cont table{
    background-color: white;
}

.comp-footer{
    display: flex;
    position: fixed;
    bottom: 0px;
    justify-content: space-around;
    width: 100%;
}
.comp-cityA{
    position: relative;
    right: -300px;
    padding: 15px 25px;
    border-radius: 2px;
    background-color: white;
    margin-bottom: 2px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
}
.comp-cityB{
    position: relative;
    right: 20px;
    padding: 15px 25px;
    border-radius: 2px;
    background-color: white;
    margin-bottom: 2px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
}

table{
    width: 1200px;
    margin: auto;
    padding: 10px 0px;
}
table:last-child{
    margin-bottom: 50px;
}
th{
    width: 400px;
    text-align: left;
    align-items: center;
}
th:first-child{
    display: flex;
}
th h3{
    margin-right: 10px;
    font-size: 25px;
}
td{
    width: 400px;
}
</style>