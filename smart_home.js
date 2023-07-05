class SmartHome extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            page:'Home', 
            homeTemp: 70, 
            cityTemp: null, 
            tempStyle:'F', 
            weatherStyle:'F', 
            clock: new Date(), 
            loaded: false,
            cities:[], 
            currCity: 0, 
            cityNames:["Baltimore MD", "New York NY", "Las Vegas NV"], 
            freezer: 1, 
            ice: 0, 
            AC: "Home",
            
            // items for scheduling
            startTime: '',
            endTime: '',
            sundayChecked: false,
            mondayChecked: false,
            tuesdayChecked: false,
            wednesdayChecked: false,
            thursdayChecked: false,
            fridayChecked: false,
            saturdayChecked: false,
            schedules: [],
            selectedSchedule: '', // currently selected schedule
            rooms: [],
            newRoom: '',        // new room input value
            selectedRoom: ''    // currently selected room
        };
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
                    <div className ="ice-div">
                        <img className = "ice" src = "imgs/Cube.png"></img>
                    </div>
                );
            }else if(this.state.ice == 2){
                this.state.ice = 3;
                return(
                    <div className ="ice-div"> 
                        <img className = "ice" src = "imgs/Crescent.png"></img>
                    </div>
                )
            }else{
                this.state.ice = 1;
                return(
                    <div className ="ice-div">
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

                    <h1 className="center-h1">Scheduling Home Page</h1>

                    <div className="button-sub-div">
                        <button onClick={() => { this.setState({ page: 'Climate' }) }} className="base-button">Climate</button>
                        <button onClick={() => { this.setState({ page: 'Garden' }) }} className="base-button">Garden</button>
                        <button onClick={() => { this.setState({ page: 'Appliances' }) }} className="base-button">Appliances</button>
                    </div>                 
                </div>
            );
        }
        else if (this.state.page === 'Climate') {
            const days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];
            const scheduleOptions = this.state.schedules.map((schedule, index) => (
                <option key={index} value={index}>
                    Schedule {index + 1} - Room: {schedule.room}, Temperature: {schedule.temperature}°{this.state.tempStyle}
                </option>
            ));              

            return (
                <div className="main-div">
                    <div className="top-div">
                        <button
                            onClick={() => {
                            this.setState({ page: "Scheduling" });
                            }}
                            className="home-button">Back
                        </button>
                    </div>
                    

                    <div className="room-selector" id="c-add-room">
                        <label htmlFor="newRoom">Add Room:</label>
                        <input
                            type="text"
                            id="newRoom"
                            name="newRoom"
                            value={this.state.newRoom}
                            onChange={this.handleInputChange}/>

                        <button onClick={this.handleAddRoom} className="btn btn-primary">Add</button>
                        
                        <select
                            value={this.state.selectedRoom}
                            onChange={(event) => {
                                const selectedRoom = event.target.value;
                                this.setState({ selectedRoom });
                            }}>

                            <option value="">Select Room</option>
                            {this.state.rooms.map((room, index) => (
                                <option key={index} value={room}>
                                {room}
                                </option>
                            ))}
                        </select>                        
                    </div>

                    <div className="home-temp-div">
                        <p id="home-para">Climate Schedule</p>

                        <div id="temp-div">
                        <button
                            onClick={() => {
                            this.setState({ homeTemp: this.state.homeTemp - 1 });
                            }}
                            className="ac-cool-button">-</button>   {/* add '-' button */}
                        <span className="home-temp">{this.state.homeTemp}°</span>
                        <button
                            onClick={() => {
                            this.setState({ homeTemp: this.state.homeTemp + 1 });
                            }}
                            className="ac-hot-button">+</button>
                        </div>

                        <button
                            id="homeCelButton"
                            onClick={() => {
                                if (this.state.tempStyle === "F") {
                                this.setState({
                                    homeTemp: parseInt((this.state.homeTemp - 32) * 0.5556)
                                });
                                this.setState({ tempStyle: "C" });
                                document.getElementById("homeFahrButton").style.color = "grey";
                                document.getElementById("homeCelButton").style.color = "black";
                                }
                            }}
                            className="cel-far-button">C
                        </button>

                        <a>/</a>    

                        <button
                        id="homeFahrButton"
                        onClick={() => {
                            if (this.state.tempStyle === "C") {
                            this.setState({
                                homeTemp: parseInt((this.state.homeTemp * 9) / 5 + 32)
                            });
                            this.setState({ tempStyle: "F" });
                            document.getElementById("homeCelButton").style.color = "grey";
                            document.getElementById("homeFahrButton").style.color = "black";
                            }
                        }}
                        className="cel-far-button"
                        >
                        F
                        </button>
                    </div>

                    <div className="checkbox-container" id="c-checkboxes">
                        {days.map((day) => (
                            <div key={day}>
                                <input
                                type="checkbox"
                                id={day.toLowerCase()}
                                name={day.toLowerCase() + "Checked"}
                                checked={this.state[day.toLowerCase() + "Checked"]}
                                onChange={this.handleInputChange}/>

                                <label htmlFor={day.toLowerCase()}>{day}</label>
                            </div>
                        ))}
                    </div>

                    <div className="start-end-container">
                        <label htmlFor={"start"}>Start Time:</label>
                        <input
                        type="time"
                        id={"start"}
                        name="startTime"
                        value={this.state.startTime}
                        onChange={this.handleInputChange}/>

                        <label htmlFor={"end"}>End Time:</label>
                        <input
                        type="time"
                        id={"end"}
                        name="endTime"
                        value={this.state.endTime}
                        onChange={this.handleInputChange}/>
                    </div>

                    <select
                        value={this.state.selectedSchedule}
                        onChange={this.handleSelectSchedule}>

                        <option value="">Select Schedule</option>
                        {scheduleOptions}
                    </select>                    

                    <div className="button-sub-div">
                        <button onClick={this.handleSaveSchedule}
                                className="base-button"
                                >Save Schedule
                        </button>

                        <button
                            onClick={() => {
                                const { selectedSchedule } = this.state;
                                if (selectedSchedule !== "") {
                                    const updatedSchedules = this.state.schedules.filter(
                                    (schedule, index) => index !== parseInt(selectedSchedule)
                                    );

                                    this.setState({
                                    schedules: updatedSchedules,
                                    selectedSchedule: "",
                                    startTime: "",
                                    endTime: "",
                                    sundayChecked: false,
                                    mondayChecked: false,
                                    tuesdayChecked: false,
                                    wednesdayChecked: false,
                                    thursdayChecked: false,
                                    fridayChecked: false,
                                    saturdayChecked: false,
                                    homeTemp: 70,
                                    tempStyle: "F"
                                    });
                                }
                            }}
                            className="delete-button">
                            Delete Schedule
                        </button>
                    </div>
                </div>
            );
        }
        else if (this.state.page === 'Garden') {
            const days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];
            const scheduleOptions = this.state.schedules.map((schedule, index) => (
                <option key={index} value={index}>
                Schedule {index + 1}    {/* indexes schedule */}
                </option>
            ));

            return (
                <div className="main-div">                    
                    <div className="top-div">
                        <button
                            onClick={() => {
                            this.setState({ page: "Scheduling" });
                            }}
                            className="home-button"
                        >
                            Back
                        </button>
                    </div>
                    
                    <h1 className="center-h1">Garden Schedule</h1>

                    <div className="checkbox-container" id={"g-checkboxes"}>
                        {days.map((day) => (
                            <div key={day}>
                                <input
                                type="checkbox"
                                id={day.toLowerCase()}
                                name={day.toLowerCase() + "Checked"}
                                checked={this.state[day.toLowerCase() + "Checked"]}
                                onChange={this.handleInputChange}
                                />
                                <label htmlFor={day.toLowerCase()}>{day}</label>
                            </div>
                        ))}
                    </div>

                    <div className="start-end-container" id={"g-start-time"}>
                        <label htmlFor={"start"}>Start Time:</label>
                        <input
                        type="time"
                        id={"start"}
                        name="startTime"
                        value={this.state.startTime}
                        onChange={this.handleInputChange}
                        />

                        <label htmlFor={"end"}>End Time:</label>
                        <input
                        type="time"
                        id={"end"}
                        name="endTime"
                        value={this.state.endTime}
                        onChange={this.handleInputChange}
                        />
                    </div>

                    <select
                        value={this.state.selectedSchedule}
                        onChange={this.handleSelectSchedule}
                    >
                        <option value="">Select Schedule</option>
                        {scheduleOptions}
                    </select>

                    <div className="button-sub-div">
                        <button
                            onClick={this.handleSaveSchedule}
                            className="base-button">
                            Save Schedule
                        </button>

                        <button
                            onClick={() => {
                            const { selectedSchedule } = this.state;
                            if (selectedSchedule !== "") {
                                const updatedSchedules = this.state.schedules.filter(
                                (schedule, index) => index !== parseInt(selectedSchedule)
                                );

                                this.setState({
                                schedules: updatedSchedules,
                                selectedSchedule: "",
                                startTime: "",
                                endTime: "",
                                sundayChecked: false,
                                mondayChecked: false,
                                tuesdayChecked: false,
                                wednesdayChecked: false,
                                thursdayChecked: false,
                                fridayChecked: false,
                                saturdayChecked: false,
                                homeTemp: 70,
                                tempStyle: "F"
                                });
                            }
                            }}
                            className = "delete-button">
                            Delete Schedule
                        </button>
                    </div>
                </div>
            );
        }
        else if (this.state.page === 'Appliances') {
            const days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];
            const scheduleOptions = this.state.schedules.map((schedule, index) => (
                <option key={index} value={index}>
                    Schedule {index + 1} - Room: {schedule.room}
                </option>
            )); 

            return (
                <div className="main-div">
                    <div className="top-div">
                        <button
                            onClick={() => {
                            this.setState({ page: "Scheduling" });
                            }}
                            className="home-button"
                        >
                            Back
                        </button>
                    </div>

                    <h1 className="center-h1"> Appliance Schedule</h1>                   

                    <div className="room-selector" id="a-add-item">
                        <label htmlFor="newRoom">Add Item:</label>
                        <input
                            type="text"
                            id="newRoom"
                            name="newRoom"
                            value={this.state.newRoom}
                            onChange={this.handleInputChange}
                        />
                        <button onClick={this.handleAddRoom} className="btn btn-primary">
                            Add
                        </button>
                        <select
                            value={this.state.selectedRoom}
                            onChange={(event) => {
                                const selectedRoom = event.target.value;
                                this.setState({ selectedRoom });
                            }}
                            >
                            <option value="">Select Item</option>
                            {this.state.rooms.map((room, index) => (
                                <option key={index} value={room}>
                                {room}
                                </option>
                            ))}
                        </select>                        
                    </div>                    

                    <div className="checkbox-container" id={"a-checkboxes"}>
                        {days.map((day) => (
                        <div key={day}>
                            <input
                            type="checkbox"
                            id={day.toLowerCase()}
                            name={day.toLowerCase() + "Checked"}
                            checked={this.state[day.toLowerCase() + "Checked"]}
                            onChange={this.handleInputChange}
                            />
                            <label htmlFor={day.toLowerCase()}>{day}</label>
                        </div>
                        ))}
                    </div>

                    <div className="start-end-container" id={"a-start-time"}>
                        <label htmlFor={"start"}>Start Time:</label>
                        <input
                        type="time"
                        id={"start"}
                        name="startTime"
                        value={this.state.startTime}
                        onChange={this.handleInputChange}
                        />

                        <label htmlFor={"end"}>End Time:</label>
                        <input
                        type="time"
                        id={"end"}
                        name="endTime"
                        value={this.state.endTime}
                        onChange={this.handleInputChange}
                        />
                    </div>

                    <select     // dropdown menu
                        value={this.state.selectedSchedule}
                        onChange={this.handleSelectSchedule}
                    >
                        <option value="">Select Schedule</option>
                        {scheduleOptions}
                    </select> 

                    <div className="button-sub-div">
                        <button
                            onClick={this.handleSaveSchedule}
                            className="base-button"
                        >
                            Save Schedule
                        </button>

                        <button
                            onClick={() => {
                                const { selectedSchedule } = this.state;
                                if (selectedSchedule !== "") {
                                    const updatedSchedules = this.state.schedules.filter(
                                    (schedule, index) => index !== parseInt(selectedSchedule)
                                    );

                                    this.setState({
                                    schedules: updatedSchedules,
                                    selectedSchedule: "",
                                    startTime: "",
                                    endTime: "",
                                    sundayChecked: false,
                                    mondayChecked: false,
                                    tuesdayChecked: false,
                                    wednesdayChecked: false,
                                    thursdayChecked: false,
                                    fridayChecked: false,
                                    saturdayChecked: false,
                                    homeTemp: 70,
                                    tempStyle: "F"
                                    });
                                }
                            }}
                            className="delete-button">
                            Delete Schedule
                        </button>
                    </div>
                </div>
            );
        }                    
    }
}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<SmartHome />);
