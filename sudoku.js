// example sudoku from https://sudoku.com/
// Created by https://github.com/ximera405
let mySudoku = [
  0, 0, 0, 0, 0, 4, 5, 3, 1,
  8, 3, 1, 0, 0, 7, 6, 0, 9,
  5, 4, 9, 0, 0, 0, 8, 0, 7,
  0, 2, 0, 5, 0, 1, 0, 7, 0,
  4, 1, 0, 0, 0, 0, 9, 6, 0,
  0, 6, 3, 0, 2, 0, 0, 0, 0,
  0, 0, 0, 0, 3, 0, 4, 9, 6,
  0, 9, 0, 7, 4, 0, 0, 1, 0,
  2, 8, 0, 0, 0, 6, 7, 0, 0
];

let stringAndColumnfilter = (doubleArr) => {
  let result = doubleArr;
  let currentNumber = 0;

  // Delete from range of 1 to 9 number, that already was
  doubleArr.forEach((elem, i) => {
    
    elem.forEach((subElem, j) => {
      // if current number !== 0 - check this string arrays
      // and delete this number from them
      if (subElem !== 0) {
        currentNumber = subElem;

        elem.forEach((arrMember, k) => {
            if (arrMember !== undefined && typeof arrMember !== 'number' && arrMember.length !== 1) {
              result[i][k] = result[i][k].filter(n => n !== currentNumber)
            }
        })
      }
    })
  }) 
  return result
}

let stringArrays = (arrSudoku) => {
  let result = [];
  let numberArr = 0;
  let possibleNumbers = [1,2,3,4,5,6,7,8,9]

  // make double array of 9 length every
  for (let i = 0; i < arrSudoku.length; i += 9) {
    result.push([]);
    for (let j = 0; j < 9; j += 1) {
      result[numberArr].push(arrSudoku[i+j]);
    }
    numberArr++;
  }

  // Change all 0 to range from 1 to 9
  result.forEach((resultArrays, i) => {
    resultArrays.forEach((element, j) => {
      if (element === 0) result[i][j] = possibleNumbers;
    })
  })

  return stringAndColumnfilter(result).flat();
}

let columnArrays = (arrSudoku) => {
  let result = [];
  let numberArr = 0;

  // make double array of 9 length every
  for (let i = 0; i < 9; i += 1) {
    result.push([]);
    for (let j = 0; j < arrSudoku.length; j += 9) {
      result[numberArr].push(arrSudoku[i+j]);
    }
    numberArr++;
  }

  result = stringAndColumnfilter(result).flat();

  // make single arr back
  newResult = [];
  numberArr = 0;
  for (let i = 0; i < 9; i += 1) {
    newResult.push([]);
    for (let j = 0; j < result.length; j += 9) {
      newResult[numberArr].push(result[i+j]);
    }
    numberArr++;
  }

  newResult = stringAndColumnfilter(newResult);
  return newResult;
}

let squareArrayCreator = (stringFilteredArr) => {
  let singleArr = stringFilteredArr.flat();

  // Groups of 3
  let groupsOfThree = [[]];
  let arraysOfThreeNumbersCounter = 0;
  for (let i = 0; i < singleArr.length; i++) {
    if (groupsOfThree[arraysOfThreeNumbersCounter].length === 3) {
      arraysOfThreeNumbersCounter++;
      groupsOfThree.push([])
    }

    groupsOfThree[arraysOfThreeNumbersCounter].push(singleArr[i]);
  }

  // Result groups
  let resultGroups = [];
  for (let k = 8; k < groupsOfThree.length; k +=9 ) {
    // We combine 3 groups of 3 memebers to square to check resolving of task
    // How to make it better?:(
    let firstCurrentLineSquare = [];
    firstCurrentLineSquare = firstCurrentLineSquare.concat(groupsOfThree[k-8], groupsOfThree[k-5], groupsOfThree[k-2]);
    let secondCurrentLineSquare = [];
    secondCurrentLineSquare = secondCurrentLineSquare.concat(groupsOfThree[k-7],groupsOfThree[k-4], groupsOfThree[k-1]);
    let thirdCurrentLineSquare = [];
    thirdCurrentLineSquare = thirdCurrentLineSquare.concat(groupsOfThree[k-6], groupsOfThree[k-3], groupsOfThree[k])

    resultGroups.push(firstCurrentLineSquare);
    resultGroups.push(secondCurrentLineSquare);
    resultGroups.push(thirdCurrentLineSquare);
  }

  squareFilter(resultGroups);

  // return original format of array
  let originalArray = [];
  for (let i = 0; i < resultGroups.length; i+=3) {
    // We return original array for next operations
    // How to make it better?:(
    let firstCurrentLineValues = [];
    firstCurrentLineValues = firstCurrentLineValues.concat(resultGroups[i].slice(0, 3), resultGroups[i+1].slice(0, 3), resultGroups[i+2].slice(0, 3));
    let secondCurrentLineValues = [];
    secondCurrentLineValues = secondCurrentLineValues.concat(resultGroups[i].slice(3, 6), resultGroups[i+1].slice(3, 6), resultGroups[i+2].slice(3,6));
    let thirdCurrentLineValues = [];
    thirdCurrentLineValues = thirdCurrentLineValues.concat(resultGroups[i].slice(6), resultGroups[i+1].slice(6), resultGroups[i+2].slice(6));

    originalArray.push(firstCurrentLineValues);
    originalArray.push(secondCurrentLineValues);
    originalArray.push(thirdCurrentLineValues);
  }

  return originalArray.flat();
}

let squareFilter = (array) => {
  resultGroups = array;
  isNeedIteration = false;

  // filter single member arrays
  resultGroups.forEach((arrays, i) => {
    arrays.forEach((value, j) => {
      if (typeof value == 'object' && value.length === 1) {
        resultGroups[i][j] = resultGroups[i][j][0];
        isNeedIteration = true;
      }
    })
  })

  resultGroups = stringAndColumnfilter(resultGroups);

  if (isNeedIteration) return squareFilter(resultGroups);
  else return resultGroups;
}

let sudoku = (sudokuArr) => {
  let resolveSudoku = sudokuArr;

  while(!resolveSudoku.every(elem => elem > 0)) {
    resolveSudoku = squareArrayCreator(columnArrays(stringArrays(resolveSudoku)));
  }

  return resolveSudoku;
}

console.log('result', sudoku(mySudoku));
