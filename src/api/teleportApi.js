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
        let apiKey = 'YOUR_API_KEY';
        let baseUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
        return axios.get(baseUrl)
        .then(response => {
            return response.data.list;
        })
        .catch(err => console.log('Weather error:', err));
    }
}
