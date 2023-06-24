import cold from './assets/cold.jpg';
import hot from './assets/hot.jpg';
import './App.css';
import Description from './components/descriptions';
import { useEffect, useState } from 'react';
import getFormattedWeatherData from './weatherservice';

function App() {
  const [weather,setWeather]=useState(null);
  const [unit,setUnit]=useState('metric');
  const [city,setCity]=useState('paris');
  const [bg,setBg]=useState(hot);
  useEffect(()=>{
           const fetchWeather=async()=>{
           const data= await getFormattedWeatherData(city,unit);
           setWeather(data);
           const ac=unit==="metric"?20:69;
           setBg(data.temp.toFixed()>ac?hot:cold);
           };
           fetchWeather();
  },[unit,city])
  function handleunits(e)
  {
        const button=e.currentTarget;
        const currentUnit=button.innerText;
        const isCel= currentUnit==="C"?true:false;
        button.innerText=isCel?"F":"C";
        setUnit(isCel?"imperial":"metric");
  }
  function handlekey(e)
  {
        if(e.keyCode==13)
        {
          setCity(e.currentTarget.value);
          e.currentTarget.blur();
        }
  }
  return (
    <div className="App" style={{backgroundImage:`url(${bg})`}}>
       <div className="overlay">
       { weather &&(
        <div className="container">
               <div className='section section_inputs'>
                     <input onKeyDown={(e)=> handlekey(e)} type="text" name="city" placeholder="Enter City .."></input>
                     <button onClick={(e)=> handleunits(e)}>C</button>
               </div>
               <div className='section section_temperature'>
                     <div className="icon">
                          <h3>
                            {weather.name}, {weather.country}
                          </h3>
                          <img src={weather.iconURL}></img>
                          <h3>
                            {weather.description}
                          </h3>
                     </div>
                     <div className='temp'>
                         <h1>
                          {weather.temp.toFixed()} {unit==='metric'?"C":"F"}
                         </h1>
                     </div>
               </div>
               <Description weather={weather} units={unit}/>
       {/* </div> */}
       </div>

       )}       
    </div>
    </div>
  );
}

export default App;
