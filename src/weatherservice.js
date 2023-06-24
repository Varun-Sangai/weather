const imgURL=(iconId)=>`https://openweathermap.org/img/wn/${iconId}@2x.png`
const API_KEY=process.env.REACT_APP_API;
// console.log(API_KEY); 
const getFormattedWeatherData= async(city,units='metric') =>{
       const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
       const data= await fetch(URL).then((res)=> res.json()).then((data)=>data );
       const {weather ,main:{temp,feels_like,temp_min,temp_max,pressure,humidity},wind:{speed},sys:{country},name}=data;
       const {description,icon}=weather[0];
       return{
           description,iconURL : imgURL(icon),temp,feels_like,temp_min,temp_max,humidity
           ,pressure,speed,country,name
       };
}
export default getFormattedWeatherData;