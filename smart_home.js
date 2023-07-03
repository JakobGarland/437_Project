class SmartHome extends React.Component{
    constructor(props){
        super(props);

        this.state = {page:'Home', homeTemp: 70, cityTemp: null, tempStyle:'F', weatherStyle:'F', clock: new Date(), loaded: false
                      ,cities:[], currCity: 0, cityNames:["Baltimore MD", "New York NY", "Las Vegas NV"]};
    }

    render(){

        this.state.cities.push(["39.29", "-76.61"]);
        this.state.cities.push(["40.7143", "-74.006"]);
        this.state.cities.push(["36.175", "-115.1372"]);

            if (this.state.page === 'Home')
            {
                $.getJSON('https://api.open-meteo.com/v1/forecast?latitude='+this.state.cities[this.state.currCity][0]+'&longitude='+this.state.cities[this.state.currCity][1]+'&current_weather=true&temperature_unit=fahrenheit&precipitation_unit=inch&windspeed_unit=mph&precipitation_unit=inch&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability,precipitation,weathercode', function(data) {
                // JSON result comes in `data` variable
                console.log(data);
                var code = data.hourly.weathercode[0];
                if (code === 95 || code === 96 || code === 99)
                {
                    $(".weather-img").attr("src", "imgs/thunder.png")
                }
                else if (code === 0)
                {
                    $(".weather-img").attr("src", "imgs/sun.png")
                }
                else if (code === 51 || code === 53 || code === 55 
                        ||code === 61 || code === 63 || code === 65
                        ||code === 80 || code === 81 || code === 82)
                {
                    $(".weather-img").attr("src", "imgs/cloud.png")
                }
                else if(code === 1 || code === 2 || code ===3)
                {
                    $(".weather-img").attr("src", "imgs/overcast.png")
                }

                document.getElementById("weather-temp").innerHTML = data.current_weather.temperature+"°";
                });

                return(
                    <div className = "main-div">
                        
                        <div className="top-div">
                            <span id="preset-span">
                                <a>
                                    PRESET: DEFAULT
                                </a>
                            </span>

                            <span id="clock-span">
                                {
                                   <Clock></Clock> 
                                }
                            </span>

                            <span id="weather-span">
                                <a id="weather-city">{this.state.cityNames[this.state.currCity]}</a>
                                <br></br>
                                <a id="weather-anchor">
                                    <span id="weather-temp"></span> <img className = "weather-img" onClick={() => {this.setState({page: 'Weather'})}}></img>
                                </a>
                            </span>
                        </div>

                        <div className = "home-temp-div">
                            <p id="home-para">
                                HOME
                            </p>

                            <div id="temp-div">
                            <button onClick={() => {this.setState({homeTemp: this.state.homeTemp-1})}} className="ac-cool-button">-</button>
                            <span className="home-temp">
                                {this.state.homeTemp}°
                            </span>
                            <button onClick={() => {this.setState({homeTemp: this.state.homeTemp+1})}} className="ac-hot-button">+</button>
                            </div>

                            <button id="homeCelButton" onClick={() => {
                                if(this.state.tempStyle === 'F')
                                    {
                                        this.setState({homeTemp: parseInt((this.state.homeTemp-32)*.5556)}); 
                                        this.setState({tempStyle:'C'})
                                        document.getElementById("homeFahrButton").style.color = "grey";
                                        document.getElementById("homeCelButton").style.color = "black";
                                    }
                                }
                            } 
                            className = "cel-far-button">C
                            </button>

                            <a>/</a>

                            <button id="homeFahrButton" onClick={() => {
                                if(this.state.tempStyle === 'C')
                                    {
                                        this.setState({homeTemp: parseInt((this.state.homeTemp*(9/5))+32)}); 
                                        this.setState({tempStyle:'F'})
                                        document.getElementById("homeCelButton").style.color = "grey";
                                        document.getElementById("homeFahrButton").style.color = "black";
                                    }
                                }
                            } 
                            className = "cel-far-button">F
                            </button>
                        </div>

                        <div className = "button-sub-div">
                            <button onClick={() => {this.setState({page: 'Fridge'})}} className="base-button">Fridge</button>
                            <button onClick={() => {this.setState({page: 'A/C'})}} className="base-button" >A/C</button>
                            <button onClick={() => {this.setState({page: 'Scheduling'})}} className="base-button" >Scheduling</button>
                        </div>
                    </div>
                );
            }
            else if (this.state.page === 'Weather'){
                $.getJSON('https://api.open-meteo.com/v1/forecast?latitude='+this.state.cities[this.state.currCity][0]+'&longitude='+this.state.cities[this.state.currCity][1]+'&current_weather=true&temperature_unit=fahrenheit&precipitation_unit=inch&windspeed_unit=mph&precipitation_unit=inch&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability,precipitation,weathercode', function(data) {
                // JSON result comes in `data` variable
                var code = data.hourly.weathercode[0];
                if (code === 95 || code === 96 || code === 99)
                {
                    $(".weather-img").attr("src", "imgs/thunder.png")
                }
                else if (code === 0)
                {
                    $(".weather-img").attr("src", "imgs/sun.png")
                }
                else if (code === 51 || code === 53 || code === 55 
                        ||code === 61 || code === 63 || code === 65
                        ||code === 80 || code === 81 || code === 82)
                {
                    $(".weather-img").attr("src", "imgs/cloud.png")
                }
                else if(code === 1 || code === 2 || code ===3)
                {
                    $(".weather-img").attr("src", "imgs/overcast.png")
                }

                document.getElementById("weather-temp").innerHTML = data.current_weather.temperature+"°";
                document.getElementById("aq-span").innerHTML = "Humidity: "+ data.hourly.relativehumidity_2m[167]+"%";
                document.getElementById("wind").innerHTML = "Wind-Speed: "+ data.hourly.windspeed_10m[167]+" mph";
                document.getElementById("precip").innerHTML = "Precipitation: " + data.hourly.precipitation[167]+" in";
                document.getElementById("precip-prob").innerHTML = "Chance of Rain: " + data.hourly.precipitation_probability[167]+"%";
                });

                return(
                    <div className = "main-div">
                        <div className="top-div">
                        <button onClick={() => {this.setState({page: 'Home'})}} className="home-button" >Home</button>
                        <select name= {this.state.cityNames[this.state.currCity]}id="weather-city-page" onClick={() => {
                                var choice = document.getElementById("weather-city-page").value;
                                if (choice === "Baltimore")
                                    this.state.currCity = 0;
                                else if (choice === "New York")
                                    this.state.currCity = 1;
                                else
                                this.state.currCity = 2;

                                $.getJSON('https://api.open-meteo.com/v1/forecast?latitude='+this.state.cities[this.state.currCity][0]+'&longitude='+this.state.cities[this.state.currCity][1]+'&current_weather=true&temperature_unit=fahrenheit&precipitation_unit=inch&windspeed_unit=mph&precipitation_unit=inch&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation_probability,precipitation,weathercode', function(data) {
                                // JSON result comes in `data` variable
                                var code = data.hourly.weathercode[0];
                                if (code === 95 || code === 96 || code === 99)
                                {
                                    $(".weather-img").attr("src", "imgs/thunder.png")
                                }
                                else if (code === 0)
                                {
                                    $(".weather-img").attr("src", "imgs/sun.png")
                                }
                                else if (code === 51 || code === 53 || code === 55 
                                        ||code === 61 || code === 63 || code === 65
                                        ||code === 80 || code === 81 || code === 82)
                                {
                                    $(".weather-img").attr("src", "imgs/cloud.png")
                                }
                                else if(code === 1 || code === 2 || code ===3)
                                {
                                    $(".weather-img").attr("src", "imgs/overcast.png")
                                }

                                document.getElementById("weather-temp").innerHTML = data.current_weather.temperature+"°";
                                document.getElementById("aq-span").innerHTML = "Humidity: "+ data.hourly.relativehumidity_2m[167]+"%";
                                document.getElementById("wind").innerHTML = "Wind-Speed: "+ data.hourly.windspeed_10m[167]+" mph";
                                document.getElementById("precip").innerHTML = "Precipitation: " + data.hourly.precipitation[167]+" in";
                                document.getElementById("precip-prob").innerHTML = "Chance of Rain: " + data.hourly.precipitation_probability[167]+"%";
                                });
                            }
                            } >
                            <option value ="Baltimore">Baltimore MD</option>
                            <option value ="New York" >New York NY</option>
                            <option value ="Las Vegas">Las Vegas NV</option>
                        </select>
                        </div>

                        <div className = "home-temp-div">
                            <div id="temp-div">
                            <img id="w-img" className = "weather-img" onClick={() => {this.setState({page: 'Weather'})}}></img>
                            <br></br>
                            <span id="weather-temp" className="home-temp">
                            </span>
                            <span id="aq-span" className="home-temp">
                            </span>
                            <span id="gen-span" className="home-temp">
                                <p id="wind"></p>
                                <p id="precip"></p>
                                <p id="precip-prob"></p>
                            </span>
                            </div>
                        </div>

                        <div className = "button-sub-div">
                            <button onClick={() => {
                                document.getElementById("weather-temp").style.display = "none";
                                document.getElementById("aq-span").style.display = "initial";
                                document.getElementById("gen-span").style.display = "none";
                                document.getElementById("w-img").style.display = "none";
                                }} className="base-button">Air Quality</button>
                            <button onClick={() => {
                                document.getElementById("weather-temp").style.display = "initial";
                                document.getElementById("aq-span").style.display = "none";
                                document.getElementById("gen-span").style.display = "none";
                                document.getElementById("w-img").style.display = "initial";
                            }} className="base-button" >Weather</button>
                            <button onClick={() => {
                                document.getElementById("weather-temp").style.display = "none";
                                document.getElementById("gen-span").style.display = "initial";
                                document.getElementById("aq-span").style.display = "none";
                                document.getElementById("w-img").style.display = "none";
                                }} className="base-button" >Area Info</button>
                        </div>
                    </div>
                );
            }
            else if (this.state.page === 'Fridge'){
                return(
                    <div className = "main-div">
                        <div className="top-div">
                        <button onClick={() => {this.setState({page: 'Home'})}} className="home-button" >Home</button>
                        </div>
                    </div>
                );
            }
            else if (this.state.page === 'A/C'){
                return(
                    <div className = "main-div">
                        <div className="top-div">
                        <button onClick={() => {this.setState({page: 'Home'})}} className="home-button" >Home</button>
                        </div>
                    </div>
                );
            }
            else if (this.state.page === 'Scheduling'){
                return(
                    <div className = "main-div">
                        <div className="top-div">
                        <button onClick={() => {this.setState({page: 'Home'})}} className="home-button" >Home</button>
                        </div>
                    </div>
                );
            }
            
    }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<SmartHome />);