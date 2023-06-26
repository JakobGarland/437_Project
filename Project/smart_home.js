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
                        <div id="home-top-div">
                            <span id="preset-span">
                                <a>
                                    PRESET: DEFAULT
                                </a>
                            </span>

                            <span id="weather-span">
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
                            <button onClick={() => {this.setState({homeTemp: this.state.homeTemp-1})}} className="ac-button">-</button>
                            <a id="home-temp">
                                {this.state.homeTemp}
                            </a>
                            <button onClick={() => {this.setState({homeTemp: this.state.homeTemp+1})}} className="ac-button">+</button>
                            </div>

                            <button onClick={() => {if(this.state.tempStyle === 'F')this.setState({homeTemp: parseInt((this.state.homeTemp-32)*.5556)}); this.setState({tempStyle:'C'})}} className = "cel-far-button">C</button>
                            <a>/</a>
                            <button onClick={() => {if(this.state.tempStyle === 'C')this.setState({homeTemp: parseInt((this.state.homeTemp*(9/5))+32)}); this.setState({tempStyle:'F'})}} className = "cel-far-button">F</button>
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
                    <button onClick={() => {this.setState({page: 'Home'})}} className="base-button" >Home</button>
                    </div>
                );
            }
            else if (this.state.page === 'A/C'){
                return(
                    <div className = "main-div">
                    <button onClick={() => {this.setState({page: 'Home'})}} className="base-button" >Home</button>
                    </div>
                );
            }
            else if (this.state.page === 'Scheduling'){
                return(
                    <div className = "main-div">
                    <button onClick={() => {this.setState({page: 'Home'})}} className="base-button" >Home</button>
                    </div>
                );
            }
            
    }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<SmartHome />);