class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 'Schedule Home',
                        startTime: '',
                        endTime: '',
                        sundayChecked: false,
                        mondayChecked: false,
                        tuesdayChecked: false,
                        wednesdayChecked: false,
                        thursdayChecked: false,
                        fridayChecked: false,
                        saturdayChecked: false
                    };   
    }

    handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;
        this.setState({ [name]: inputValue });
    }
    handleSaveSchedule = () => {
        // saving logic
        const { startTime, 
                endTime,
                sundayChecked,
                mondayChecked,
                tuesdayChecked,
                wednesdayChecked,
                thursdayChecked,
                fridayChecked,
                saturdayChecked    
            } = this.state;
        // TESTING PURPOSES
        console.log('Saving Schedule:');
        console.log('Start Time:', startTime);
        console.log('End Time:', endTime);
        console.log('Sunday Checked:', sundayChecked);
        console.log('Monday Checked:', mondayChecked);
        console.log('Tuesday Checked:', tuesdayChecked);
        console.log('Wednesday Checked:', wednesdayChecked);
        console.log('Thursday Checked:', thursdayChecked);
        console.log('Friday Checked:', fridayChecked);
        console.log('Saturday Checked:', saturdayChecked);
            
        // create new schedule object (to save schedules)
        const newSchedule = {
            startTime,
            endTime,
            days: {
                Sunday:     sundayChecked,
                Monday:     mondayChecked,
                Tuesday:    tuesdayChecked,
                Wednesday:  wednesdayChecked,
                Thursday:   thursdayChecked,
                Friday:     fridayChecked,
                Saturday:   saturdayChecked,
            }
        };
        // Update the schedules array in the state
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
            saturdayChecked: false
        }));
    }



    render() {
        if (this.state.page === 'Schedule Home') {
            return (
                <div className="text-center">
                    <p>Scheduling Home Page</p>
                    <button onClick={() => {this.setState({page: 'Climate'})}} class="btn btn-primary btn-lg m-1">Climate</button>
                    <button onClick={() => {this.setState({page: 'Garden'})}} class="btn btn-primary btn-lg m-1">Garden</button>
                    <button onClick={() => {this.setState({page: 'Appliances'})}} class="btn btn-primary btn-lg m-1">Appliances</button>
                </div>
            );
        }
        else if (this.state.page === 'Climate') {    // climate section
            return (    // c-checkboxes is used for checking the days for which the schedule will apply for
                <div className="text-center">
                    <p>Climate Schedule</p>
                    <button onClick={() => {this.setState({page: 'Schedule Home'})}} class="btn btn-primary btn-lg m-1">Exit</button>
                    
                    <div id="c-checkboxes">
                        <label>
                            <input 
                                type="checkbox" 
                                id="Sunday"
                                name="sundayChecked"
                                checked={this.state.sundayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Sunday</label>

                            <input 
                                type="checkbox" 
                                id="Monday"
                                name="mondayChecked"
                                checked={this.state.mondayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Monday</label>

                            <input 
                                type="checkbox" 
                                id="Tuesday"
                                name="tuesdayChecked"
                                checked={this.state.tuesdayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Tuesday</label>

                            <input 
                                type="checkbox" 
                                id="Wednesday"
                                name="wednesdayChecked"
                                checked={this.state.wednesdayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Wednesday</label>

                            <input 
                                type="checkbox" 
                                id="Thursday"
                                name="thursdayChecked"
                                checked={this.state.thursdayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Thursday</label>

                            <input 
                                type="checkbox" 
                                id="Friday"
                                name="fridayChecked"
                                checked={this.state.fridayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Friday</label>

                            <input 
                                type="checkbox" 
                                id="Saturday"
                                name="saturdayChecked"
                                checked={this.state.saturdayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Saturday</label>
                        </label>
                    </div>

                    <div id="start-time">
                        <label for="start-time">Start Time</label>
                        <input type="text" id="start" name="start"/>
                    </div>
                    <div id="end-time">
                        <label for="end-time">End Time</label>
                        <input type="text" id="end" name="end"/>
                    </div>

                    <button id="save" onClick={this.handleSaveSchedule}>Save Schedule</button>
                </div>
            );
        }
        else if (this.state.page === 'Garden') {
            return (
                <div className="text-center">
                    <p>Garden Schedule</p>
                    <button onClick={() => {this.setState({page: 'Schedule Home'})}} class="btn btn-primary btn-lg m-1">Exit</button>

                    <div id="g-checkboxes">
                        <label>
                            <input 
                                type="checkbox" 
                                id="Sunday"
                                name="sundayChecked"
                                checked={this.state.sundayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Sunday</label>

                            <input 
                                type="checkbox" 
                                id="Monday"
                                name="mondayChecked"
                                checked={this.state.mondayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Monday</label>

                            <input 
                                type="checkbox" 
                                id="Tuesday"
                                name="tuesdayChecked"
                                checked={this.state.tuesdayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Tuesday</label>

                            <input 
                                type="checkbox" 
                                id="Wednesday"
                                name="wednesdayChecked"
                                checked={this.state.wednesdayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Wednesday</label>

                            <input 
                                type="checkbox" 
                                id="Thursday"
                                name="thursdayChecked"
                                checked={this.state.thursdayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Thursday</label>

                            <input 
                                type="checkbox" 
                                id="Friday"
                                name="fridayChecked"
                                checked={this.state.fridayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Friday</label>

                            <input 
                                type="checkbox" 
                                id="Saturday"
                                name="saturdayChecked"
                                checked={this.state.saturdayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Saturday</label>
                        </label>
                    </div>

                    <div id="start-time">
                        <label for="start-time">Start Time</label>
                        <input type="text" id="start" name="start"/>
                    </div>
                    <div id="end-time">
                        <label for="end-time">End Time</label>
                        <input type="text" id="end" name="end"/>
                    </div>

                    <button id="save" onClick={this.handleSaveSchedule}>Save Schedule</button>
                </div>                
            );
        }
        else if (this.state.page === 'Appliances') {
            return (
                <div className="text-center">
                    <p>Appliances</p>
                    <button onClick={() => {this.setState({page: 'Schedule Home'})}} class="btn btn-primary btn-lg m-1">Exit</button>

                    <div id="a-checkboxes">
                        <label>
                            <input 
                                type="checkbox" 
                                id="Sunday"
                                name="sundayChecked"
                                checked={this.state.sundayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Sunday</label>

                            <input 
                                type="checkbox" 
                                id="Monday"
                                name="mondayChecked"
                                checked={this.state.mondayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Monday</label>

                            <input 
                                type="checkbox" 
                                id="Tuesday"
                                name="tuesdayChecked"
                                checked={this.state.tuesdayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Tuesday</label>

                            <input 
                                type="checkbox" 
                                id="Wednesday"
                                name="wednesdayChecked"
                                checked={this.state.wednesdayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Wednesday</label>

                            <input 
                                type="checkbox" 
                                id="Thursday"
                                name="thursdayChecked"
                                checked={this.state.thursdayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Thursday</label>

                            <input 
                                type="checkbox" 
                                id="Friday"
                                name="fridayChecked"
                                checked={this.state.fridayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Friday</label>

                            <input 
                                type="checkbox" 
                                id="Saturday"
                                name="saturdayChecked"
                                checked={this.state.saturdayChecked}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="checkbox">Saturday</label>
                        </label>
                    </div>

                    <div id="start-time">
                        <label for="start-time">Start Time</label>
                        <input type="text" id="start" name="start"/>
                    </div>
                    <div id="end-time">
                        <label for="end-time">End Time</label>
                        <input type="text" id="end" name="end"/>
                    </div>

                    <button id="save" onClick={this.handleSaveSchedule}>Save Schedule</button>
                </div>
            )
        }
    }
}
const container = document.getElementById('root');  // get rood id from HTML source doc
const root = ReactDOM.createRoot(container);
root.render(<App />);   // render main application
