class SmartHome extends React.Component{
    constructor(props){
        super(props);

        this.state = {page:'Home', homeTemp: 70, tempStyle:'F'};
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

                            <span id="weather-span">
                                <a>Baltimore MD</a>
                                <br></br>
                                <a>
                                    76 <img src="imgs/cloud.png" className = "weather-img"></img>
                                </a>
                            </span>
                        </div>

                        <div className = "home-temp-div">
                            <p id="home-para">
                                HOME
                            </p>

                            <div id="temp-div">
                            <button onClick={() => {this.setState({homeTemp: this.state.homeTemp-1})}} className="ac-cool-button">-</button>
                            <a id="home-temp">
                                {this.state.homeTemp}°
                            </a>
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