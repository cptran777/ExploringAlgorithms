/*Given an array of four coordinate points that represent the vertices of a rectangle, find the area of said rectangle*/

//Step 1: Go into each coordinate (which will be a string) and grab only the numbers to put into a new array. Result will be an array of length 8 containing each x and y coordinate. 

//Step 2: Split the array into 2 arrays by iterating through and at each even index (represents x coordinates) send to one and each odd index (represents y coordinates) send to second. 

//Step 3: With the coordinates properly split, each new array, Array X and Array Y, should contain two sets of two matching x coordinates and same with y (because you're making a rectangular figure). 

//Note: Should try to also take into consideration a rectangle drawn on a diagonal. In this case, could use the pythagorean theorem to find the distance of the line and run through three of the points. At the third point, we would have a proper idea of the length and width of the rectangle and therefore just multiply length by width to get the area. 
//Note 2: Taking this into consideration, we could theoretically run through just two points/lines if the lines were adjacent to each other. Considering algorithmic speed, would it be more costly to sort the arrays to ensure the lines are adjacent or to run through three points in order to find the shape? It is possible to ensure the lines are adjacent by sort by x coordinate and then going from left to right, possibly? Need to test further. 

//Note 2.1: After further testing, the indexes to consider for the x coordinates are first, second, and fourth. This will always get the two adjacent sides. 

//Note 2.2: To take into account the possibility of tilted rectangles, it is best to sort the two arrays by x coordinate first and then run through the lines that pass through point 0, 2, and 3. Otherwise, risk cutting through the rectangle if we're going by random all points. 

//Note 3: After even further investigation, consideration needs to be taken for if the rectangle is not titled. The titled theory doesn't work there. 

//Note 3.1: Solution: Differentiate between the two by implementing a check at the first two points, x0 and x1. If x0 and x1 are equal to each other, we know that there is no way the rectangle is tilted. Therefore, find the distance between x0 and x1, then subtract x0 from x2 (not distance between points, just straight difference) and multiply to get the area. Otherwise, the square is tilted and we have to find the distance between points x0 to x1 and then x1 to x3. 

//With the above notes in mind, let's make a function!

//Setting the test string for a non-tilted rectangle. The area of this rectangle should be 20, with height 4 and length 5. 
var rectangleA = "(5, 9), (11,17), (11,9), (5,17)";

//Function that performs the sorting algorithm for the array of x coordinates and y coordinates. Output is an object with two arrays, one representing the X coordinates sorted and one representing the corresponding Y coordinates. 
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
      } else if(b < rightArrs.X.length){
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


//Function that takes in the coordinate points as a long string and finds the corresponding area.
var areaFinder = function(points){
  //Step 1 - Take the string of points and split this into an array of length 8 representing the x and y coordinates. Elements at even indeces represent x coordinates while elements at odd indeces represent y coordinates. Input size does not change as a rectangle can only have 4 points. Speed does not change with bigger rectangles. :)
  var elemental = points.match(/[0-9\-]+/g).map(function(item){
    return Number(item);
  });
  
  //Step 2: Split this array into two separate arrays for x coordinates and y coordinates. Running through this once with a single for loop instead of 2 for more efficiency.
  var xPoints = [];
  var yPoints = [];
  for(var a = 0; a < elemental.length; a++){
    if(a % 2 === 0){
      xPoints.push(elemental[a]);
    } else {
      yPoints.push(elemental[a]);
    }
  }
  
  
  //Step 3: Sort the arrays in order to determine points by x coordinate from left to right. Need to also simulataneously sort the array of y coordinates to keep the points. Will implement a merge sort algorithm that tags on the y array at the same time.
  //Note: output of megaSort is an object of two arrays. 
  var sortedPoints = megaSort(xPoints, yPoints);
  
  //Step 3.5: Adding an extra step to tell whether the rectangle is tilted or not. Takes an object of two arrays as its argument. 
  //If the rectangle is not titled, sorts the Y coordinates at each X from small to large using bubble sort. 
  if(sortedPoints.X[0] === sortedPoints.X[1]){
    var bubbleSortHold;
    if(sortedPoints.Y[0] > sortedPoints.Y[1]){
      bubbleSortHold = sortedPoints.Y[1];
      sortedPoints.Y[1] = sortedPoints.Y[0];
      sortedPoints.Y[0] = bubbleSortHold;
    }
    if(sortedPoints.Y[2] > sortedPoints.Y[3]){
      bubbleSortHold = sortedPoints.Y[3];
      sortedPoints.Y[3] = sortedPoints.Y[2];
      sortedPoints.Y[2] = bubbleSortHold;
    }
  }
  /*Note: At this point, no matter the orientation of the rectangle, finding the distance from the point at x0 to x1 and then from x1 to x3 will give the two sides necessary to find the area of the rectangle
  * To find the distance between the points, we can consider the pythagorean theorem and realize that the difference in the x coordinates squared and the difference in the y coordinates squared will equal the distance squared. 
  * Therefore the formula to use will be square root(squared x + square y)
  * This will still work even with the non tilted rectangle as the square root of the x or y coordinate squared plus 0 squared (no distance in the other coordinate) would be the difference in x or y squared. 
  */
  
  //Stores the two sides' lengths
  var rLength, rWidth; 
  
  rLength = Math.sqrt(Math.pow(sortedPoints.X[1] - sortedPoints.X[0], 2) + Math.pow(sortedPoints.Y[1] - sortedPoints.Y[0], 2));
  rWidth = Math.sqrt(Math.pow(sortedPoints.X[3] - sortedPoints.X[1], 2) + Math.pow(sortedPoints.Y[3] - sortedPoints.Y[1], 2));
  
  console.log(sortedPoints);
  
  return rLength * rWidth;
};

console.log(areaFinder(rectangleA));

//Testing for a rectangle that is tilted now:

var rectangleB = "(-2,-3), (4,-1), (3,2), (-3,0)";
console.log(areaFinder(rectangleB));