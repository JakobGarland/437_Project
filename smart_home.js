class SmartHome extends React.Component{
    constructor(props){
        super(props);

        this.state = {page:'Home', homeTemp: 70, cityTemp: 76, tempStyle:'F', weatherStyle:'F', clock: new Date()};
    }

    render(){
            if (this.state.page === 'Home')
            {
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
                                <a>Baltimore MD</a>
                                <br></br>
                                <a>
                                    {this.state.cityTemp}° <img src="imgs/cloud.png" className = "weather-img" onClick={() => {this.setState({page: 'Weather'})}}></img>
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
                return(
                    <div className = "main-div">
                        <div className="top-div">
                        <button onClick={() => {this.setState({page: 'Home'})}} className="home-button" >Home</button>
                        <a id="weather-city">Baltimore, MD</a>
                        </div>

                        <div className = "home-temp-div">
                            <div id="temp-div">
                            <img id="w-img" src="imgs/cloud.png" className = "weather-img" onClick={() => {this.setState({page: 'Weather'})}}></img>
                            <br></br>
                            <span id="weather-temp" className="home-temp">
                                {this.state.cityTemp}°
                            </span>
                            <span id="aq-span">
                                Test
                            </span>
                            </div>

                            <button id="weatherCelButton" onClick={() => {
                                if(this.state.weatherStyle === 'F')
                                    {
                                        this.setState({cityTemp: parseInt((this.state.cityTemp-32)*.5556)}); 
                                        this.setState({weatherStyle:'C'})
                                        document.getElementById("homeFahrButton").style.color = "grey";
                                        document.getElementById("homeCelButton").style.color = "black";
                                    }
                                }
                            } 
                            className = "cel-far-button">C
                            </button>

                            <a id="button-slash">/</a>

                            <button id="weatherFahrButton" onClick={() => {
                                if(this.state.weatherStyle === 'C')
                                    {
                                        this.setState({cityTemp: parseInt((this.state.cityTemp*(9/5))+32)}); 
                                        this.setState({weatherStyle:'F'})
                                        document.getElementById("homeCelButton").style.color = "grey";
                                        document.getElementById("homeFahrButton").style.color = "black";
                                    }
                                }
                            } 
                            className = "cel-far-button">F
                            </button>
                        </div>

                        <div className = "button-sub-div">
                            <button onClick={() => {
                                document.getElementById("weather-temp").style.display = "none";
                                document.getElementById("aq-span").style.display = "initial";
                                document.getElementById("weatherCelButton").style.display = "none";
                                document.getElementById("weatherFahrButton").style.display = "none";
                                document.getElementById("button-slash").style.display = "none";
                                document.getElementById("w-img").style.display = "none";
                                }} className="base-button">Air Quality</button>
                            <button onClick={() => {
                                document.getElementById("weather-temp").style.display = "initial";
                                document.getElementById("aq-span").style.display = "none";
                                document.getElementById("weatherCelButton").style.display = "initial";
                                document.getElementById("weatherFahrButton").style.display = "initial";
                                document.getElementById("button-slash").style.display = "initial";
                                document.getElementById("w-img").style.display = "initial";
                            }} className="base-button" >Weather</button>
                            <button onClick={() => {this.setState({page: 'A/C'})}} className="base-button" >Percipitation</button>
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