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

/* Step 3:
*   Support a newline character as an alternative delimiter e.g. 1\n2,3 will return 6
*   Work done: Added replaceAll() to list assignment to look for \n in input string and replace with ',' to split and add.
*/

/* Step 4:
*   Deny negative numbers by throwing an exception that includes all of the negative numbers provided
*   Work done: Added a new list, negativeNumber. Any negative numbers will be pushed into negativeNumber and if negativeNumber.length > 0
*              will display in UI of all negative numbers excluded from the inputted string.
*/

/* Step 5:
*   Make any value greater than 1000 an invalid number e.g. 2,1001,6 will return 8
*   Work done: Added a new variable called maxNumAllowed, this variable can also be used later for manipulation features.
*              The value is this compared against the inputted the list index
*/

/* Step 6:
*   Support 1 custom delimiter of a single character using the format: //{delimiter}\n{numbers}
*       examples: //#\n2#5 will return 7; //,\n2,ff,100 will return 102
*       all previous formats should also be supported
*   work done: Added a string checker for first call on setting delimeter, after which I validate whether the user input a length of 1
*              custom delimeter, this will pass or fail depending on the check. If it fails the user is
*              presented with an error message displaying why it failed and the proper way to input.
*/

class App extends React.Component {

  constructor(props) { //constructor to initialize stats and input
    super(props);
    this.myInput = React.createRef();
    this.state = {}
  }
  onChangeValue = async () => {
    const value = this.myInput.current.value.trim();

    await new Promise(resolve => this.setState({delimErrMsg: false}, () => resolve()))

    let delimList = [], delimString = null;
    if (value.startsWith("//")) {

      delimString = value[2]
      if (value[3] === ",") {
        delimList.push(delimString);
        await new Promise(resolve => this.setState({delimErrMsg: false}, () => resolve()))
      } else {
        await new Promise(resolve => this.setState({delimErrMsg: true}, () => resolve()))
      }
      console.log("delimList: " + delimList);
    }
    var delimCounts = {}, delimCharAt, index, delimVal, delimCount;

    for (let element in delimList) {
      delimVal = delimList[element]
      if (/\W/.test(delimVal)) {
        console.log(delimVal)
        if (delimVal.length > 1) {
          for (index = 0; index < delimVal.length; index++) {
            if (delimVal.charAt(index + 1) === delimVal.charAt(index) || delimVal.charAt(index - 1) === delimVal.charAt(index)) {
              delimCharAt = delimVal.charAt(index);
              delimCount = delimCounts[delimCharAt];
              delimCounts[delimCharAt] = delimCount ? delimCount + 1 : 1;
              console.log(delimCounts);
            }
          }
          delimList[element] = "\\" + delimCharAt + "{" + delimCounts[delimCharAt] + "}";
        } else {
          delimList[element] = "\\" + delimList[element];
        }
      }

    }
    console.log(delimList);

    var regex = new RegExp(delimList.join('|') + '|,|\\\\n', 'g')

    const list = value.split(regex);
    calculations = 0;
    let delimErrMsg = this.state.delimErrMsg;
    const maxNumAllowed = 1000;
    const negativeNumber = [];
    if (!delimErrMsg) {
      for (var i = 0; i < list.length; i++) {
        if (list[i] === "" || list[i] === "-" || !/^-?\d+(,\d+)*$/.test(list[i]) || parseInt(list[i]) > maxNumAllowed) { // simple value check and conversion to 0 if value does not meet req.
          calculations += 0;
        } else {
          if (parseInt(list[i]) > 0) {
            calculations += parseInt(list[i]);
          } else {
            negativeNumber.push(parseInt(list[i]))
          }
        }
      }
    }

    if (negativeNumber.length > 0) {
      this.setState({showErrMsg: true}); //Error Msg  hide state
      this.setState({negativeNumbers: negativeNumber}) //Stores negative numbers for display on UI
    } else {
      this.setState({showErrMsg: false}); //Error Msg  hide state
    }


    const finalCalc = calculations;
    this.setState({finalCalc});
  };

  setDelimList = async (value) => {

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
              {/*Error message handling to show or hide based if state condition is met*/}
              <div className="form-group row" style={{display: (this.state.delimErrMsg ? 'inline-block' : 'none') , color: 'red' }}>
                <div>
                  <span>
                    More than one Custom Delimiter was set, please only put 1 Custom Delimeter! i.e //#,1#2,3 = 6
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-lg-2"></div>
                <div className="col-lg-3">
                  <label htmlFor="output" >Output</label>
                </div>
                <input id="output" value={finalCalc} placeholder="0" disabled />
              </div>
              {/*Error message handling to show or hide based if state condition is met*/}
              <div className="form-group row" >
                <div className="col-lg-2"></div>
                <div  className="col-lg-3">
                  <label htmlFor="negative" style={{ display: (this.state.showErrMsg ? 'inline-block' : 'none') }}>Negative #'s</label>
                </div>
                {/*Displays all negative numbers in an excluded list if any are available*/}
                <input id="negative" style={{ display: (this.state.showErrMsg ? 'inline-block' : 'none') }} value={this.state.negativeNumbers} disabled/>
              </div>
            </div>

          </div>
        </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));

export default App;
