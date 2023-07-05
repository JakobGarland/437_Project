class SmartHome extends React.Component{
    constructor(props){
        super(props);

        this.state = {page:'Home', homeTemp: 70, cityTemp: null, tempStyle:'F', weatherStyle:'F', clock: new Date(), loaded: false
                      ,cities:[], currCity: 0, cityNames:["Baltimore MD", "New York NY", "Las Vegas NV"], freezer: 1, ice: 0, AC: "Home"};
    }

    handleAddRoom = (event) => {
        event.preventDefault();
        const roomName = this.state.newRoom;
  
        if (roomName) {
            this.setState((prevState) => ({
                rooms: [...prevState.rooms, roomName],
                newRoom: '', // Clear the new room input field
            }));
        }
    };
  
    handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;
        this.setState({ [name]: inputValue });
    };
  
    handleSaveSchedule = () => {
        const {
            startTime,
            endTime,
            sundayChecked,
            mondayChecked,
            tuesdayChecked,
            wednesdayChecked,
            thursdayChecked,
            fridayChecked,
            saturdayChecked,
        } = this.state;
        
        const newSchedule = {
            startTime,
            endTime,
            days: {
            Sunday: sundayChecked,
            Monday: mondayChecked,
            Tuesday: tuesdayChecked,
            Wednesday: wednesdayChecked,
            Thursday: thursdayChecked,
            Friday: fridayChecked,
            Saturday: saturdayChecked,
            },
            room: this.state.selectedRoom,
            temperature: this.state.homeTemp, // Add temperature value to the new schedule
        };
        
        this.setState((prevState) => ({
            schedules: [...prevState.schedules, newSchedule],
            startTime: '',
            endTime: '',
            sundayChecked: false,
            mondayChecked: false,
            tuesdayChecked: false,
            wednesdayChecked: false,
            thursdayChecked: false,
            fridayChecked: false,
            saturdayChecked: false,
            homeTemp: 70,
            tempStyle: 'F',
        }));
    };
      
  
    handleSelectSchedule = (event) => {
        const selectedScheduleIndex = event.target.value;

        if (selectedScheduleIndex !== '') {
            const selectedSchedule = this.state.schedules[selectedScheduleIndex];

            this.setState({     // saves schedule
                selectedSchedule: selectedScheduleIndex,
                startTime: selectedSchedule.startTime,
                endTime: selectedSchedule.endTime,
                sundayChecked: selectedSchedule.days.Sunday,
                mondayChecked: selectedSchedule.days.Monday,
                tuesdayChecked: selectedSchedule.days.Tuesday,
                wednesdayChecked: selectedSchedule.days.Wednesday,
                thursdayChecked: selectedSchedule.days.Thursday,
                fridayChecked: selectedSchedule.days.Friday,
                saturdayChecked: selectedSchedule.days.Saturday,
                selectedRoom: selectedSchedule.room, // set the selected room
            });
        } 
        else {      // erases schedule
        this.setState({
            selectedSchedule: '',
            startTime: '',
            endTime: '',
            sundayChecked: false,
            mondayChecked: false,
            tuesdayChecked: false,
            wednesdayChecked: false,
            thursdayChecked: false,
            fridayChecked: false,
            saturdayChecked: false,
            selectedRoom: '', // clear the selected room
        });
        }
    };    

    renderFridge(){
        if(this.state.freezer == 1){
            return(
                <div id = "fridge">
                    <span className = "therm">
                        <Therm name="Fridge"/>
                    </span>
                    
                </div>
            )
        }else if(this.state.freezer == 2){
            if(this.state.ice == 1){
                this.state.ice = 2;
                return(
                    <div>
                        <img className = "ice" src = "imgs/Cube.png"></img>
                    </div>
                );
            }else if(this.state.ice == 2){
                this.state.ice = 3;
                return(
                    <div>
                        <img className = "ice" src = "imgs/Crescent.png"></img>
                    </div>
                )
            }else{
                this.state.ice = 1;
                return(
                    <div>
                        <img className = "ice" src = "imgs/Flake.png"></img>
                    </div>
                );
            }
            
        }else{
            return(
                <div id = "freezer">
                    <span className = "therm">
                        <Therm name="Freezer"/>
                    </span>
                    
                </div>
            )
        }
    }


    loadWeather(page){
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

                if (page === "weather")
                {
                    document.getElementById("weather-temp").innerHTML = data.current_weather.temperature+"°";
                    document.getElementById("aq-span").innerHTML = "Humidity: "+ data.hourly.relativehumidity_2m[167]+"%";
                    document.getElementById("wind").innerHTML = "Wind-Speed: "+ data.hourly.windspeed_10m[167]+" mph";
                    document.getElementById("precip").innerHTML = "Precipitation: " + data.hourly.precipitation[167]+" in";
                    document.getElementById("precip-prob").innerHTML = "Chance of Rain: " + data.hourly.precipitation_probability[167]+"%";
                }
                else if (page === "home")
                {
                    document.getElementById("weather-temp").innerHTML = data.current_weather.temperature+"°";
                }
            });
    }

    render(){

        this.state.cities.push(["39.29", "-76.61"]);
        this.state.cities.push(["40.7143", "-74.006"]);
        this.state.cities.push(["36.175", "-115.1372"]);

        if (this.state.page === 'Home')
        {
            this.loadWeather("home");

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
                        <span className = "therm">
                            <Therm name="Home"></Therm>
                        </span>    
                        

                    <div className = "button-sub-div">
                        <button onClick={() => {this.setState({page: 'Fridge'})}} className="base-button">Fridge</button>
                        <button onClick={() => {this.setState({page: 'A/C'})}} className="base-button" >A/C</button>
                        <button onClick={() => {this.setState({page: 'Scheduling'})}} className="base-button" >Scheduling</button>
                    </div>
                </div>
            );
        }
        else if (this.state.page === 'Weather'){
            this.loadWeather("weather");
            return(
                <div className = "main-div">
                    <div className="top-div">
                    <button onClick={() => {this.setState({page: 'Home'})}} className="home-button" >Back</button>
                    <select name= {this.state.cityNames[this.state.currCity]}id="weather-city-page" onClick={() => {
                            var choice = document.getElementById("weather-city-page").value;
                            if (choice === "Baltimore")
                                this.state.currCity = 0;
                            else if (choice === "New York")
                                this.state.currCity = 1;
                            else
                            this.state.currCity = 2;

                            this.loadWeather("weather");
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
                        <button onClick={() => {this.setState({page: 'Home'})}} className="home-button" >Back</button>
                        <span id = "filter-span">
                            <a id="filter-stat">Filter Status</a>
                            <img className = "filter-img" src = "imgs/filter-green.png"></img>
                        </span>
                    </div>

                    {this.renderFridge()}
                    {console.log("Rendered" + this.state.freezer)}


                    <div className = "button-sub-div">
                        <button onClick={() => {
                            this.setState({freezer: 1})
                            }} className="base-button">Fridge
                        </button>

                        <button onClick={() => {
                            this.setState({freezer: 2})
                            }} className="base-button">Ice Shape
                        </button>

                            <button onClick={() => {
                                this.setState({freezer: 3})
                                }} className="base-button">Freezer
                            </button>
                        </div>
                    </div>
                );
            }
            else if (this.state.page === 'A/C'){
                return(
                    <div className = "main-div">
                        <div className="top-div">
                            <button onClick={() => {this.setState({page: 'Home'})}} className="home-button" >Back</button>
                        
                        </div>
                        <Rooms></Rooms>
                    </div>
                );
            }
            else if (this.state.page === 'Scheduling'){
                return(
                    <div className = "main-div">
                        <div className="top-div">
                        <button onClick={() => {this.setState({page: 'Home'})}} className="home-button" >Back</button>
                        </div>
                    </div>
                );
            }
            
    }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<SmartHome />);
