
// Version for double Array puzzle
// .......................
// var puzzle = [
//   [5,3,0,0,7,0,0,0,0],
//   [6,0,0,1,9,5,0,0,0],
//   [0,9,8,0,0,0,0,6,0],
//   [8,0,0,0,6,0,0,0,3],
//   [4,0,0,8,0,3,0,0,1],
//   [7,0,0,0,2,0,0,0,6],
//   [0,6,0,0,0,0,2,8,0],
//   [0,0,0,4,1,9,0,0,5],
//   [0,0,0,0,8,0,0,7,9]];

// let stringAndColumnfilter = (doubleArr) => {
//   let result = doubleArr;

//   // Delete from range of 1 to 9 number, that already was
//   for (let i = 0; i < result.length; i++) {
  
//     for (let j = 0; j <= result.length; j++) {

//       // if current number !== 0 - check this string arrays
//       // and delete this number from them
//       if (result[i][j] !== 0) {
//         let currentNumber = result[i][j];
//         for (let k = 0; k < result.length; k++) {
//           if (result[i][k] !== undefined && typeof result[i][k] !== 'number' && result[i][k].length !== 1) {
//             result[i][k] = result[i][k].filter(n => n !== currentNumber)
//           }
//         }
//       }

//     }
//   }
//   return result
// }

// let stringArrays = (arrSudoku) => {
//   let result = [];
//   let numberArr = 0;
//   let possibleNumbers = [1,2,3,4,5,6,7,8,9]

//   // make double array of 9 length every
//   for (let i = 0; i < arrSudoku.length; i += 9) {
//     result.push([]);
//     for (let j = 0; j < 9; j += 1) {
//       result[numberArr].push(arrSudoku[i+j]);
//     }
//     numberArr++;
//   }

//   // Change all 0 to range from 1 to 9
//   for (let i = 0; i < result.length; i++) {
//     for (let j = 0; j <= result.length; j++) {
//       if (result[i][j] === 0) {
//         result[i][j] = possibleNumbers;
//       }
//     }
//   }
//   result = stringAndColumnfilter(result).flat();
//   return result;
// }

// let columnArrays = (arrSudoku) => {
//   let result = [];
//   let numberArr = 0;

//   // make double array of 9 length every
//   for (let i = 0; i < 9; i += 1) {
//     result.push([]);
//     for (let j = 0; j < arrSudoku.length; j += 9) {
//       result[numberArr].push(arrSudoku[i+j]);
//     }
//     numberArr++;
//   }

//   result = stringAndColumnfilter(result).flat();

//   // make single arr back
//   newResult = [];
//   numberArr = 0;
//   for (let i = 0; i < 9; i += 1) {
//     newResult.push([]);
//     for (let j = 0; j < result.length; j += 9) {
//       newResult[numberArr].push(result[i+j]);
//     }
//     numberArr++;
//   }

//   newResult = stringAndColumnfilter(newResult);
//   return newResult;
// }

// let squareArrayCreator = (stringFilteredArr) => {
//   let singleArr = stringFilteredArr.flat();

//   // Groups of 3
//   let groupsOfThree = [[]];
//   let arraysOfThreeNumbersCounter = 0;
//   for (let i = 0; i < singleArr.length; i++) {
//     if (groupsOfThree[arraysOfThreeNumbersCounter].length === 3) {
//       arraysOfThreeNumbersCounter++;
//       groupsOfThree.push([])
//     }

//     groupsOfThree[arraysOfThreeNumbersCounter].push(singleArr[i]);
//   }

//   // Result groups
//   let resultGroups = [];
//   for (let k = 8; k < groupsOfThree.length; k +=9 ) {
//     resultGroups.push(groupsOfThree[k-8].concat(groupsOfThree[k-5], groupsOfThree[k-2]));
//     resultGroups.push(groupsOfThree[k-7].concat(groupsOfThree[k-4], groupsOfThree[k-1]));
//     resultGroups.push(groupsOfThree[k-6].concat(groupsOfThree[k-3], groupsOfThree[k]));
//   }

//   squareFilter(resultGroups);

//   // return original format of array
//   let originalArray = [];
//   iterator = 0
//   for (let i = 0; i < resultGroups.length; i+=3) {
//     originalArray.push(resultGroups[i].slice(0, 3).concat(resultGroups[i+1].slice(0, 3), resultGroups[i+2].slice(0, 3)));
//     originalArray.push(resultGroups[i].slice(3, 6).concat(resultGroups[i+1].slice(3, 6), resultGroups[i+2].slice(3,6)));
//     originalArray.push(resultGroups[i].slice(6).concat(resultGroups[i+1].slice(6), resultGroups[i+2].slice(6)));
//   }

//   return originalArray.flat();
// }

// let squareFilter = (array) => {
//   resultGroups = array;
//   isNeedIteration = false;
//   // filter single member arrays
//   for (let i = 0; i < resultGroups.length; i++) {
//     for (let j = 0; j < resultGroups[i].length; j++) {
//       if (typeof resultGroups[i][j] == 'object' && resultGroups[i][j].length === 1) {
//         resultGroups[i][j] = resultGroups[i][j][0];
//         isNeedIteration = true;
//       }
//     }
//   }
//   resultGroups = stringAndColumnfilter(resultGroups);

//   if (isNeedIteration) return squareFilter(resultGroups);
//   else return resultGroups;
// }

// let sudoku = (sudokuArr) => {
//   let resolveSudoku = sudokuArr[0].concat(sudokuArr[1], sudokuArr[2], sudokuArr[3], sudokuArr[4], sudokuArr[5], sudokuArr[6], sudokuArr[7], sudokuArr[8]);

//   while(!resolveSudoku.every(elem => elem > 0)) {
//     resolveSudoku = squareArrayCreator(columnArrays(stringArrays(resolveSudoku)));
//   }

//   let myAnswer = [];
//   iterator = 0;
//   for (let i = 0; i < 9; i++) {
//     myAnswer.push([]);
//     for (let j = 0; j < 9; j++) {
//       myAnswer[i].push(resolveSudoku[iterator])
//       iterator++
//     }
//   }
//   return myAnswer
// }