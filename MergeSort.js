//Merge Sort Algorithm Write Up

//Function to merge two sorted arrays starting with the smallest element into a new array
function merge(arrayA, arrayB){
  var x = 0, y = 0, z = 0; //Counters to navigate array indeces (indexes?)
  var result = []; //Output for merged array
  //While we haven't gotten to the end of arrayA or arrayB yet
  while(x < arrayA.length && y < arrayB.length){
    if(arrayA[x] < arrayB[y]){
      result[z] = arrayA[x];
      x++; z++;
    } else if(arrayB[y] < arrayA[x]){
      result[z] = arrayB[y];
      y++; z++;
    } else {
      result[z] = arrayA[x];
      x++; z++;
      result[z] = arrayB[y];
      y++; z++;
    }
  }
  //After reaching the end of one of the arrays, add the rest of the remaining array to result.
  if(x === arrayA.length){
    for(; y < arrayB.length; y++, z++){
      result[z] = arrayB[y];
    }
  } else if(y === arrayB.length){
    for(; x < arrayA.length; x++, z++){
      result[z] = arrayA[x];
    }
  }
  return result;
}

//Recursive function that will implement Merge Sort algorithm
function mergeSort(inputArray){
  //If array only has a single element, no further work needed.
  if(inputArray.length < 2){
    return inputArray;
  }
  //Splits the array into two halves, creating new array and leaving half the original
  var splitArrA = inputArray.splice(0, Math.ceil(inputArray.length/2));
  //Merge Sort recursive call
  return merge(mergeSort(splitArrA), mergeSort(inputArray));
}

console.log(mergeSort([3, 7, 1, 9, 6, 4, 8]));