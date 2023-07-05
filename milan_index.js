class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 'Schedule Home'};
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
            return (
                <div className="text-center">
                    <p>Climate Schedule</p>
                    <button onClick={() => {this.setState({page: 'Schedule Home'})}} class="btn btn-primary btn-lg m-1">Exit</button>
                    
                    <div id="c-checkboxes">
                        <label>
                            <input type="checkbox" id="Sunday"/>
                            <label htmlFor="checkbox">Sunday</label>

                            <input type="checkbox" id="Monday"/>
                            <label htmlFor="checkbox">Monday</label>

                            <input type="checkbox" id="Tuesday"/>
                            <label htmlFor="checkbox">Tuesday</label>

                            <input type="checkbox" id="Wednesday"/>
                            <label htmlFor="checkbox">Wednesday</label>

                            <input type="checkbox" id="Thursday"/>
                            <label htmlFor="checkbox">Thursday</label>

                            <input type="checkbox" id="Friday"/>
                            <label htmlFor="checkbox">Friday</label>

                            <input type="checkbox" id="Saturday"/>
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
                    <div id="start-date">
                        <label for="start-date">Start Date</label>
                        <input type="text" id="start-date" name="start-date"/>
                    </div>
                    <div id="end-date">
                        <label for="end-date">End Date</label>
                        <input type="text" id="end-date" name="end-date"/>
                    </div>

                    <button id="save">Save Schedule</button>
                </div>
            );
        }
        else if (this.state.page === 'Garden') {
            return (
                <div className="text-center">
                    <p>Garden Schedule</p>
                    <button onClick={() => {this.setState({page: 'Schedule Home'})}} class="btn btn-primary btn-lg m-1">Exit</button>

                    <div id="checkboxes">
                        <label>
                            <input type="checkbox" id="Sunday"/>
                            <label htmlFor="checkbox">Sunday</label>

                            <input type="checkbox" id="Monday"/>
                            <label htmlFor="checkbox">Monday</label>

                            <input type="checkbox" id="Tuesday"/>
                            <label htmlFor="checkbox">Tuesday</label>

                            <input type="checkbox" id="Wednesday"/>
                            <label htmlFor="checkbox">Wednesday</label>

                            <input type="checkbox" id="Thursday"/>
                            <label htmlFor="checkbox">Thursday</label>

                            <input type="checkbox" id="Friday"/>
                            <label htmlFor="checkbox">Friday</label>

                            <input type="checkbox" id="Saturday"/>
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
                    <div id="start-date">
                        <label for="start-date">Start Date</label>
                        <input type="text" id="start-date" name="start-date"/>
                    </div>
                    <div id="end-date">
                        <label for="end-date">End Date</label>
                        <input type="text" id="end-date" name="end-date"/>
                    </div>

                    <button id="save">Save Schedule</button>
                </div>
                
            );
        }
        else if (this.state.page === 'Appliances') {
            return (
                <div className="text-center">
                    <p>Appliances</p>
                    <button onClick={() => {this.setState({page: 'Schedule Home'})}} class="btn btn-primary btn-lg m-1">Exit</button>

                    <div id="g-checkboxes">
                        <label>
                            <input type="checkbox" id="Sunday"/>
                            <label htmlFor="checkbox">Sunday</label>

                            <input type="checkbox" id="Monday"/>
                            <label htmlFor="checkbox">Monday</label>

                            <input type="checkbox" id="Tuesday"/>
                            <label htmlFor="checkbox">Tuesday</label>

                            <input type="checkbox" id="Wednesday"/>
                            <label htmlFor="checkbox">Wednesday</label>

                            <input type="checkbox" id="Thursday"/>
                            <label htmlFor="checkbox">Thursday</label>

                            <input type="checkbox" id="Friday"/>
                            <label htmlFor="checkbox">Friday</label>

                            <input type="checkbox" id="Saturday"/>
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
                    <div id="start-date">
                        <label for="start-date">Start Date</label>
                        <input type="text" id="start-date" name="start-date"/>
                    </div>
                    <div id="end-date">
                        <label for="end-date">End Date</label>
                        <input type="text" id="end-date" name="end-date"/>
                    </div>

                    <button id="save">Save Schedule</button>
                </div>
            )
        }
    }
}
const container = document.getElementById('root');  // get rood id from HTML source doc
const root = ReactDOM.createRoot(container);
root.render(<App />);   // render main application