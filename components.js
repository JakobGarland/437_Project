class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }
    componentDidMount(){
        this.timerID = setInterval(() => this.tick(),1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    tick(){
        this.setState({date:new Date()});
    }
    render(){
        return (
            <p>{this.state.date.toLocaleTimeString()}</p>
        );
    }
}

class Therm extends React.Component{
    constructor(props) {
        super(props);
        const storedState = JSON.parse(window.localStorage.getItem(this.props.name));
        this.state = storedState || {
            temp: 60,
            tempStyle: 'F',
            cel: "grey",
            fahr: "black"
        };
        if (!storedState) {
            window.localStorage.setItem(this.props.name, JSON.stringify(this.state));
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.name !== this.props.name){
            const storedState = JSON.parse(window.localStorage.getItem(nextProps.name));
            if(storedState){
                this.setState(storedState);
            }else{
                const newState = {
                    temp: 60,
                    tempStyle: 'F',
                    cel: 'grey',
                    fahr: 'black',
                };
                window.localStorage.setItem(nextProps.name, JSON.stringify(newState));
                this.setState(newState);
            }
        }
    }
    
    updateState(state) {
        window.localStorage.setItem(this.props.name, JSON.stringify(state));
        this.setState(state);
    }

    increaseTemp = () => {
        return this.updateState({...this.state, temp : this.state.temp + 1});
    }
    decreaseTemp = () => {
        return this.updateState({...this.state, temp : this.state.temp - 1});
    }


    render(){
        return(
            <div className="thermometer">
                <p id="fridge-para">
                    {this.props.name}
                </p>

                <div id="temp-div">
                    <button onClick={() => {console.log(this.props.name);this.decreaseTemp()}} className="ac-cool-button">-</button>
                    <span className="fridge-temp">
                        {this.state.temp}°
                    </span>
                    <button onClick={() => {console.log(this.props.name);this.increaseTemp()}} className="ac-hot-button">+</button>
                </div>
                
                <button style = {{color: this.state.cel}} onClick={() => {
                    if(this.state.tempStyle === 'F')
                        {   
                            return this.updateState({...this.state, 
                                temp: parseInt((this.state.temp-32)*.5556), 
                                tempStyle:'C',
                                cel: "black",
                                fahr: "grey"
                            });
                        }
                    }
                } 
                className = "cel-far-button">C
                </button>

                <a>/</a>

                <button style = {{color:this.state.fahr}} onClick={() => {
                    if(this.state.tempStyle === 'C')
                        {
                            return this.updateState({...this.state, 
                                temp: parseInt((this.state.temp*(9/5))+32), 
                                tempStyle:'F' ,
                                cel: "grey",
                                fahr: "black"
                            });
                        }
                    }
                } 
                className = "cel-far-button">F
                </button>
            </div>
        );
    }
}
