import axios from 'axios'

let baseUrl = `https://api.teleport.org/api/urban_areas/slug:`;

export default {
    cityScores(city){
        return axios.get(`${baseUrl}${city}/scores`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            return err });
    },
    scoreDetails(city){
        return axios.get(`${baseUrl}${city}/details`)
        .then(response => {
            return response.data;
        })
        .catch(err => { 
            return err });
    },
    weatherInfo(val){
        let city = val.charAt(0).toUpperCase() + val.slice(1);
        let apiKey = '6e247ee9b0c4c6000763ff3c53cb81ac';
        let baseUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
        return axios.get(baseUrl)
        .then(response => {
            return response.data.list;
        })
        .catch(err => console.log('Weather error:', err));
    }
}