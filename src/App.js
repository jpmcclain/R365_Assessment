import React from 'react';
import './App.css';
import 'core-js';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
var calculations = 0;

/* Step 1:
*   Support a maximum of 2 numbers using a comma delimiter. Throw an exception when more than 2 numbers are provided
*      examples: 20 will return 20; 1,5000 will return 5001; 4,-3 will return 1
*      empty input or missing numbers should be converted to 0
*      invalid numbers should be converted to 0 e.g. 5,tytyt will return 5
*/

/* Step 2:
*   Remove the maximum constraint for numbers e.g. 1,2,3,4,5,6,7,8,9,10,11,12 will return 78
*   Work done: Removed this.setState({ showErrMsg }), length check and error message handling from Step 1. Kept value check from Step 1 to convert to 0 if req not met.
*/

class App extends React.Component {

  constructor(props) { //constructor to initialize stats and input
    super(props);
    this.myInput = React.createRef();
    this.state = {}
  }
  onChangeValue = () => {
    const value = this.myInput.current.value.trim();

    const list = value.split(','); // Simple replaceAll() for any \n to be replaced to ',' and split on ','
    calculations = 0;
      this.setState({ showErrMsg: false }); //Error Msg  hide state
      for (var i = 0; i < list.length; i++) {
        if (list[i] === "" || list[i] === "-" || !/^-?\d+(,\d+)*$/.test(list[i])) { // simple value check and conversion to 0 if value does not meet req.
          calculations += 0;
        } else {
          calculations += parseInt(list[i]);
        }
      }


    const finalCalc = calculations;
    this.setState({finalCalc});
  };

  render() {
    let {finalCalc} = this.state;
    return (
        <div className="App">
          <div className="App-header" >
            <div className="col-lg-12">
              <h1> Calculator </h1>
            </div>
            <div className="col-lg-12">
              <div className="form-group row ">
                <div className="col-lg-2"></div>
                <div className="col-lg-3">
                  <label htmlFor="add" >Input</label>
                </div>
                <input ref={this.myInput} id="add" placeholder="" />
                <button className="calculate btn btn-primary" type="submit" onClick={this.onChangeValue}><span>Calculate</span></button>
              </div>

              <div className="form-group row">
                <div className="col-lg-2"></div>
                <div className="col-lg-3">
                  <label htmlFor="output" >Output</label>
                </div>
                <input id="output" value={finalCalc} placeholder="0" disabled />
              </div>
            </div>

          </div>
        </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));

export default App;
