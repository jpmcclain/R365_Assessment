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

/* Step 7:
*   Support 1 custom delimiter of any length using the format: //[{delimiter}]\n{numbers}
*       example: //[***]\n11***22***33 will return 66
*       all previous formats should also be supported
*   work done: Applied additional check from proper user input on allowing only one custom delimiter of any length. Error message will display if more
*              than one delimiter is inputted.
*/

/* Step 8:
*   Support multiple delimiters of any length using the format: //[{delimiter1}][{delimiter2}]...\n{numbers}
*       example: //[*][!!][r9r]\n11r9r22*hh*33!!44 will return 110
*       all previous formats should also be supported
*   work done: Simply removed the single delimiter check and error message display, allowing the using to input more than one custom delimiter.
*
*/

/* Stretch Goal #1:
*   Display the formula used to calculate the result e.g. 2,,4,rrrr,1001,6 will return 2+0+4+0+0+6 = 12
*   work done: Simply added a formula checker to display when user hits calculate. Will only display if user input any values.
*
*/

class App extends React.Component {

  constructor(props) { //constructor to initialize stats and input
    super(props);
    this.myInput = React.createRef();
    this.state = {}
  }
  onChangeValue = async () => {
    const value = this.myInput.current.value.trim();

    let delimList = [], delimString = null;
    /* Checks to see if user is inputting custom delimiters or not */
    if(value.startsWith("//")){
      var indexA = value.indexOf("[")
      if(indexA > -1) {
        var indexB = value.lastIndexOf("]")
        delimString = value.substr(indexA, indexB-1);
        var i = 0;
        while(i < delimString.length) {
          delimList.push(delimString.substr(delimString.indexOf("[")+1, delimString.indexOf("]")-1));
          delimString = delimString.slice(delimString.indexOf("]")+1, delimString.length);
          i++;
        }
      }
      console.log(delimList);
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
    var regex = new RegExp(',|\\\\n', 'g')
    if(delimList.length > 0){
      regex = new RegExp(delimList.join('|') + '|,|\\\\n', 'g')
    }

    const list = value.split(regex);
    calculations = 0;
    this.setState({formulaMsg: false});
    var formula = "";
    const maxNumAllowed = 1000;
    const negativeNumber = [];

    for (var i = 0; i < list.length; i++) {
      if (!/^-?\d+(,\d+)*$/.test(list[i]) || parseInt(list[i]) > maxNumAllowed) { // simple value check and conversion to 0 if value does not meet req.
        calculations += 0;
        if(i === 0){
          formula += 0;
        } else {
          formula += " + " + 0;
        }
      } else {
        if (parseInt(list[i]) > 0) {
          calculations += parseInt(list[i]);
          if(i === 0){
            formula += parseInt(list[i]);
          } else {
            formula += " + " + parseInt(list[i]);
          }
        } else {
          negativeNumber.push(parseInt(list[i]))
        }
      }
    }


    if (negativeNumber.length > 0) {
      this.setState({showErrMsg: true}); //Error Msg  hide state
      this.setState({negativeNumbers: negativeNumber}) //Stores negative numbers for display on UI
    } else {
      this.setState({showErrMsg: false}); //Error Msg  hide state
    }


    if (formula.length > 0){
      formula += " = "+calculations;
      this.setState({formulaMsg: true});
      this.setState({formula: formula})
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
              <div className="form-group row" style={{display: (this.state.formulaMsg ? 'inline-block' : 'none')}}>
                <p>{this.state.formula}</p>
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
