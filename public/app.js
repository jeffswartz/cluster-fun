let size;
const squares = [];
const matrixDisplay = document.querySelector('#matrix');
let clusters = [];
let clusterIndex = -1;
let currentClusterId;

const labelClusters = () => {
  for (var i = 0; i < size; i ++) {
    for (var j = 0; j < size; j ++) {
      console.log(i, j, squares[i][j].clusterId)
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
        console.log(i, j, id)
        clusters[squares[i][j].clusterId] = false; 
        squares[i][j].clusterId = id; 
      } else {
        break;
      }
    }    
  }

  for (var i = 0; i < size; i ++) {
    for (var j = 0; j < size; j ++) {
      if ((j === 0) || (squares[i][j - 1].value !== squares[i][j].value)) {
        clusterIndex++;
        currentClusterId = clusterIndex;
        clusters[currentClusterId] = true;
      }
      console.log('.', i, j, currentClusterId)
      squares[i][j].clusterId = currentClusterId;
      if (i > 0) {
        if (squares[i - 1][j].value === squares[i][j].value) {
          clusters[currentClusterId] = false;
          currentClusterId = squares[i - 1][j].clusterId;
          squares[i][j].clusterId = currentClusterId;
          console.log('-', i, j, currentClusterId)
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
  size = parseInt(document.getElementById('size').value);
  size = Math.max(Math.min(size, 12), 2);
  if (!size) {
    size = 8;
  }
  document.getElementById('size').value = size;
  matrixDisplay.innerHTML = '';
  for (var i = 0; i < size; i ++) {
    squares[i] = [];
    const rowDiv = document.createElement('div');
    for (var j = 0; j < size; j ++) {
      squares[i][j] = { value: Math.round(Math.random() * 2) };
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
