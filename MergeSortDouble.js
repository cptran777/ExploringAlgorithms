/* This is a function to sort two arrays. The first array will be sorted from
* smallest to largest while the second array is linked to the first and sorted
* based on how the first array is sorted. The idea is that these two arrays
* represent coordinate points with the first array being the x coordinates and the
* second array being the y coordinates. 
*/

//Setting up test arrays. Set up so that when tA1 is sorted smallest to largest, tA2 will be sorted largest to smallest to differentiate successful algorithm.
//Expected output: 
//[2, 4, 6, 10] & [9,7,3,1]
var testArray1 = [2, 6, 10, 2];
var testArray2 = [7, 9, 1, 3];

/*Considerations:
* The outside function needs to take two arrays, however the inside function should take
* two objects, each object containing two arrays. 
*/

function megaSort(arrayX, arrayY){
  //Inner function needs to take an object of two arrays. 
  //Step 1: Convert arguments of outer function megaSort to an object of 2 arrays.
  var mergedArgs = {
    X: arrayX,
    Y: arrayY
  };
  //Main inner function that will be the recursive call.
  var mergeSort = function(objArr){
    if(objArr.X.length < 2){
      return objArr;
    }
    //Split each array in half
    var leftX = objArr.X.splice(0, objArr.X.length/2);
    var leftY = objArr.Y.splice(0, objArr.Y.length/2);
    var leftObjXY = {X: leftX, Y: leftY};
    //Defining the merge function, note that it takes two objects of two arrays each. 
    var merge = function(leftArrs, rightArrs){
      //Counter variables & holder for the resulting sort
      var a = 0, b = 0;
      var resultX = [], resultY = [];
      while(a < leftArrs.X.length && b < rightArrs.X.length){
        if(leftArrs.X[a] < rightArrs.X[b]){
          resultX.push(leftArrs.X[a]);
          resultY.push(leftArrs.Y[a]);
          a++;
        } else if(leftArrs.X[a] > rightArrs.X[b]){
          resultX.push(rightArrs.X[b]);
          resultY.push(rightArrs.Y[b]);
          b++;
        } else {
          resultX.push(leftArrs.X[a]);
          resultY.push(leftArrs.Y[a]);
          a++;
          resultX.push(rightArrs.X[b]);
          resultY.push(rightArrs.Y[b]);
          b++;
        }
      }
      //Once one array has been completely transferred, push elements in remaining array into the result.
      if(a < leftArrs.X.length){
        for(; a < leftArrs.X.length; a++){
          resultX.push(leftArrs.X[a]);
          resultY.push(leftArrs.Y[a]);
        }
      } if(b < rightArrs.X.length){
        for(; b < rightArrs.X.length; b++){
          resultX.push(rightArrs.X[b]);
          resultY.push(rightArrs.Y[b]);
        }
      }
      return {X: resultX, Y: resultY};
    };
    return merge(mergeSort(leftObjXY), mergeSort(objArr));
  };
  return mergeSort(mergedArgs);
}

//Testing:
console.log(megaSort(testArray1, testArray2));