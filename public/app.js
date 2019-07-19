let size;
const squares = [];
const matrixDisplay = document.querySelector('#matrix');
let clusters = [];
let clusterIndex = -1;
let currentClusterId;

const labelClusters = () => {
  validClusterCount = 0;
  for (var i = 0; i < clusters.length; i ++) {
    if (clusters[i] !== false) {
      clusters[i] = ++validClusterCount;
    }
  }
  for (var i = 0; i < size; i ++) {
    for (var j = 0; j < size; j ++) {
      if (i != (size - 1) && clusters[squares[i][j].clusterId] === false) {
        clusters[squares[i][j].clusterId] = squares[i + 1][j].clusterId;
      }
      let label = clusters[squares[i][j].clusterId];
      // let label = squares[i][j].clusterId;
      // pad label:
      label = label.toString();
      if (label.length === 1) label += '&nbsp;';
      document.body.querySelector(`#x${i}_${j}`).innerHTML = `<span>${label}</span>`;
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
        if (clusters[squares[i][j].clusterId] !== id) {
          clusters[squares[i][j].clusterId] = false; 
        }
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
        if (squares[i - 1][j].value === squares[i][j].value
          && squares[i - 1][j].clusterId !== squares[i][j].clusterId)
        {
          clusters[currentClusterId] = false;
          currentClusterId = squares[i - 1][j].clusterId;
          squares[i][j].clusterId = currentClusterId;
          console.log('-', i, j, currentClusterId)
          traverseLeft(i, j, squares[i][j].value, currentClusterId);
        }
      }
    }
  }

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
      rowDiv.innerHTML += `<span class="square color${squares[i][j].value}" id="x${i}_${j}">
        <span>${squares[i][j].value}</span>
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

document.querySelector('#labelClusters').addEventListener('click', () => {
  labelClusters();
});
