const SIZE = 6;
const squares = [];
const matrixDisplay = document.querySelector('#matrix');
const trickyArray =
  [[0, 1, 1, 0, 0, 1],
   [1, 1, 1, 2, 2, 1],
   [1, 0, 0, 2, 1, 2],
   [1, 1, 1, 1, 1, 1],
   [1, 1, 2, 1, 0, 1],
   [1, 1, 1, 1, 0, 1]];

let clusters = [];
let clusterIndex = -1;
let currentClusterId;

const labelClusters = () => {
  for (var i = 0; i < SIZE; i ++) {
    for (var j = 0; j < SIZE; j ++) {
      // console.log(i, j, squares[i][j].clusterId)
      document.getElementById(`${i}_${j}`).innerHTML = squares[i][j].clusterId;
    }
  }
}

const countClusters = () => {
  clusters = [];
  clusterIndex = -1;
  currentClusterId;

  const traverseLeft = (i, y, value, id) => {
    for (var j = y - 1; j > -1; j--) {
      if (squares[i][j].value === value) {
        if (i==1 && j == 0) console.log(i, j, id)
        clusters[squares[i][j].clusterId] = false; 
        squares[i][j].clusterId = id; 
      } 
    }    
  }

  for (var i = 0; i < SIZE; i ++) {
    for (var j = 0; j < SIZE; j ++) {
      if ((j === 0) || (squares[i][j - 1].value !== squares[i][j].value)) {
        clusterIndex++;
        currentClusterId = clusterIndex;
        clusters[currentClusterId] = true;
      }
      if (i==1 && j == 0) console.log('.', i, j, currentClusterId)
      squares[i][j].clusterId = currentClusterId;
      if (i > 0) {
        if (squares[i - 1][j].value === squares[i][j].value) {
          clusters[currentClusterId] = false;
          currentClusterId = squares[i - 1][j].clusterId;
          squares[i][j].clusterId = currentClusterId;
          traverseLeft(i, j, squares[i][j].value, currentClusterId);
        }
      }
    }
  }

  // labelClusters();

  let count = 0;
  for (var i = 0; i < clusters.length; i ++) {
    if (clusters[i]) {
      count++;
    }
  }
  document.querySelector('#results').innerHTML = `count: ${count}`;
};

const generateMatrix = () => {
  matrixDisplay.innerHTML = '';
  for (var i = 0; i < SIZE; i ++) {
    squares[i] = [];
    const rowDiv = document.createElement('div');
    for (var j = 0; j < SIZE; j ++) {
      squares[i][j] = { value: Math.round(Math.random() * 2) };
      if (window.location.search.indexOf('tricky') > -1) {
        squares[i][j] = { value: trickyArray[i][j] };
      }
      rowDiv.innerHTML += `<span class="square color${squares[i][j].value}" id="${i}_${j}">
        ${squares[i][j].value}
        <\span>`;
    }
    matrixDisplay.appendChild(rowDiv);
  }
  countClusters();
}

addEventListener('load', function(e) {
  generateMatrix();
});

document.querySelector('#next').addEventListener('click', () => {
  generateMatrix();
});
