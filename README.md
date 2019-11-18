
## Requirements
1. Support a maximum of 2 numbers using a comma delimiter. Throw an exception when more than 2 numbers are provided
	* examples: `20` will return `20`; `1,5000` will return `5001`; `4,-3` will return `1`
	* empty input or missing numbers should be converted to `0`
	* invalid numbers should be converted to `0` e.g. `5,tytyt` will return `5`
2. Remove the maximum constraint for numbers e.g. `1,2,3,4,5,6,7,8,9,10,11,12` will return `78`
3. Support a newline character as an alternative delimiter e.g. `1\n2,3` will return `6` 
4. Deny negative numbers by throwing an exception that includes all of the negative numbers provided
5. Make any value greater than 1000 an invalid number e.g. `2,1001,6` will return `8`
6. Support 1 custom delimiter of a single character using the format: `//{delimiter}\n{numbers}`
	* examples: `//#\n2#5` will return `7`; `//,\n2,ff,100` will return `102` 
	* all previous formats should also be supported
7. Support 1 custom delimiter of any length using the format: `//[{delimiter}]\n{numbers}`
	* example: `//[***]\n11***22***33` will return `66`
	* all previous formats should also be supported
8. Support multiple delimiters of any length using the format: `//[{delimiter1}][{delimiter2}]...\n{numbers}`
	* example: `//[*][!!][r9r]\n11r9r22*hh*33!!44` will return `110`
	* all previous formats should also be supported

## Stretch goals
1. Display the formula used to calculate the result e.g. `2,,4,rrrr,1001,6` will return `2+0+4+0+0+6 = 12`
2. Allow the acceptance of arguments to define...
	* alternate delimiter in step #3 
	* toggle whether to deny negative numbers in step #4
	* upper bound in step #5
3. Support subtraction, multiplication, and division operations

Completed assignments, each step and stretch goal were a separate commit as requested in the instructions.
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
