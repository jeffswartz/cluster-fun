const SIZE = 6;
const squares = [];
const matrixDisplay = document.querySelector('#matrix');

const assignClusters = () => {
  clusters = [];
  let currentSegment = { };
  let currentCluserId = 0;
  for (var i = 0; i < SIZE; i ++) {
    for (var j = 0; j < SIZE; j ++) {
      if ((j === 0) || (squares[i][j - 1].value !== squares[i][j].value)) {
        currentCluserId++;
        currentSegment = { clusterId: currentCluserId }
        clusters.push( currentCluserId );
      }
      squares[i][j].segment = currentSegment;
      if (i > 0) {
        if (squares[i - 1][j].value === squares[i][j].value) {
          let badClusterId;
          if ( squares[i][j].segment.clusterId > squares[i - 1][j].segment.clusterId) {
            badClusterId = squares[i][j].segment.clusterId;
            squares[i][j].segment.clusterId = squares[i - 1][j].segment.clusterId;                
          } else if ( squares[i][j].segment.clusterId < squares[i - 1][j].segment.clusterId) {
            badClusterId = squares[i - 1][j].segment.clusterId;
            squares[i - 1 ][j].segment.clusterId = squares[i][j].segment.clusterId;                
          }
          const removeClusterIdIndex = clusters.indexOf(badClusterId);
          if (removeClusterIdIndex > -1) {
            console.log(currentCluserId);
            clusters.splice(removeClusterIdIndex, 1);
          }
        }
      }
    }
  }
  for (var i = 0; i < SIZE; i ++) {
    let str = '';
    for (var j = 0; j < SIZE; j ++) {
      str = str + ' ' + squares[i][j].segment.clusterId;
    }
    console.log(str);
  }
  document.querySelector('#results').innerHTML = `count: ${clusters.length}`;
};

const generateMatrix = () => {
  matrixDisplay.innerHTML = '';
  for (var i = 0; i < SIZE; i ++) {
    squares[i] = [];
    const rowDiv = document.createElement('div');
    for (var j = 0; j < SIZE; j ++) {
      squares[i][j] = { value: Math.round(Math.random() * 2) };
      rowDiv.innerHTML += `<span class="color${squares[i][j].value}">
        ${squares[i][j].value}
        <\span>`;
    }
    matrixDisplay.appendChild(rowDiv);
  }
  assignClusters();
}

addEventListener('load', function(e) {
  generateMatrix();
});

document.querySelector('#next').addEventListener('click', () => {
  generateMatrix();
});
