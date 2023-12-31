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

class Therm extends React.Component{  // thermostat component that uses local storage to save state even on page refresh
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
            window.localStorage.setItem(this.props.name, JSON.stringify(this.state)); // stores instance each time a therm is constructed
        }
    }

    componentWillReceiveProps(nextProps){ // handles detection between different therms
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


    render(){ // html for therm component
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

class Rooms extends React.Component { // dropdown menu component with option to add or delete rooms and renders in a new Therm component based on local storage
    constructor(props) {
      super(props);
      const storedRooms = localStorage.getItem('rooms');
      this.state = {
        rooms: storedRooms ? JSON.parse(storedRooms) : ["Home"],
        newRoom: "",
        selectedOption: "Home",
      };
    }
  
    componentDidUpdate() { // each time new information is updated, stores to local storage
      const { rooms } = this.state;
      localStorage.setItem('rooms', JSON.stringify(rooms));
    }
  
    handleInputChange = (event) => { 
      this.setState({newRoom: event.target.value});
    };
  
    handleSelectChange = (event) => {  // handles switching between rooms
      this.setState({ selectedOption: event.target.value });
    };
  
    handleAddRoom = () => { // renders new therm when new room is added and switches page to that room
      const { rooms, newRoom, selectedOption } = this.state;
      if (selectedOption === "Add Room" && newRoom.trim() !== "") {
        const updatedRooms = [...rooms, newRoom];
        this.setState({ rooms: updatedRooms, newRoom: "", selectedOption: newRoom});
      }
    };

    handleDeleteRoom = (roomToDelete) => { 
        const { rooms } = this.state;
        const updatedRooms = rooms.filter((room) => room !== roomToDelete);
        this.setState({ rooms: updatedRooms, selectedOption: "Add Room"});
    };
  
    render() {
      const { rooms, newRoom, selectedOption } = this.state;
  
      return (
        <div>
            <select className = "roomSelect" value={selectedOption} onChange={this.handleSelectChange}>
                {rooms.map((room) => (
                    <option key={room}>{room}</option>
                ))}
                <option value="Add Room">Add Room</option>
            </select>
            <span className = "therm"></span>  {/*creates a therm with name from user input*/}
                <Therm name={selectedOption}></Therm>
            <span/>

            {/*renders input field and button for adding new room*/}
            {selectedOption === "Add Room" && (  
                <div id = "add">
                <input id="addField" type="text" value={newRoom} onChange={this.handleInputChange} />
                <button id="addButton" onClick={this.handleAddRoom}>Add Room</button>
                </div>
            )}

            {/*adds delete button*/}
            {selectedOption !== "Add Room" && (
                <div>
                    <button id = "delete" onClick={() => this.handleDeleteRoom(selectedOption)}>Delete Room</button>
                </div>
            )}
        </div>
      );
    }
  }