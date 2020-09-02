export default {
    formattedData(data) {
    const day = new Date();
    const dayCode = day.getDay();
    const weekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    let currentTime = data[0].dt_txt.split(' ')[1].split(':')[0];
    // calculate the array distance between current data and next day data
    // weather data from api contains data of 3h periods
    let difference = (24 - currentTime) / 3 + 4;
    if (difference === 12) {
      difference = 11;
    };
    
    const calcRainProb = (dataList, status) => {
        let cloud = dataList.clouds.all;
        return status === 'Rain' && cloud >= 25 ? 'High' : 'Low';
      };

    const dataFactored = [
        {
          day: 1,
          weekDay: weekDays[dayCode % 7],
          currentTemp: parseInt(data[1].main.temp - 273.15, 10),
          status: data[1].weather[0].main,
          humidity: data[1].main.humidity,
          windSpeed: data[1].wind.speed,
          rainProbability: calcRainProb(data[1], data[1].weather[0].main),
        },
        {
          day: 2,
          weekDay: weekDays[(dayCode + 1) % 7],
          noonTemp: parseInt(data[difference].main.temp - 273.15, 10),
          nightTemp: parseInt(data[difference + 4].main.temp - 273.15, 10),
          status: data[difference].weather[0].main,
          humidity: data[difference].main.humidity,
          windSpeed: data[difference].wind.speed,
          rainProbability: calcRainProb(
            data[difference],
            data[difference].weather[0].main
          )
        },
        {
          day: 3,
          weekDay: weekDays[(dayCode + 2) % 7],
          noonTemp: parseInt(data[difference + 8].main.temp - 273.15, 10),
          nightTemp: parseInt(data[difference + 12].main.temp - 273.15, 10),
          status: data[difference + 8].weather[0].main,
          humidity: data[difference + 8].main.humidity,
          windSpeed: data[difference + 8].wind.speed,
          rainProbability: calcRainProb(
            data[difference + 8],
            data[difference + 8].weather[0].main
          )
        },
        {
          day: 4,
          weekDay: weekDays[(dayCode + 3) % 7],
          noonTemp: parseInt(data[difference + 16].main.temp - 273.15, 10),
          nightTemp: parseInt(data[difference + 20].main.temp - 273.15, 10),
          status: data[difference + 16].weather[0].main,
          humidity: data[difference + 16].main.humidity,
          windSpeed: data[difference + 16].wind.speed,
          rainProbability: calcRainProb(
            data[difference + 16],
            data[difference + 16].weather[0].main
          )
        },
        {
          day: 5,
          weekDay: weekDays[(dayCode + 4) % 7],
          noonTemp: parseInt(data[difference + 24].main.temp - 273.15, 10),
          nightTemp: parseInt(data[difference + 28].main.temp - 273.15, 10),
          status: data[difference + 24].weather[0].main,
          humidity: data[difference + 24].main.humidity,
          windSpeed: data[difference + 24].wind.speed,
          rainProbability: calcRainProb(
            data[difference + 24],
            data[difference + 24].weather[0].main
          )
        }
      ];
      return [dataFactored];
  }
}