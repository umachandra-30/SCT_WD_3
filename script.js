(function() {
    const statusDiv = document.getElementById('status');
    const gameDiv = document.getElementById('game');
    const resetBtn = document.getElementById('reset');
    const cells = Array.from(document.querySelectorAll('.cell'));
  
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;
  
    const winningCombinations = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // columns
      [0,4,8], [2,4,6]           // diagonals
    ];
  
    function handleCellClick(e) {
      const idx = +e.target.getAttribute('data-index');
      if (!gameActive || board[idx] !== "") {
        return;
      }
      board[idx] = currentPlayer;
      e.target.textContent = currentPlayer;
  
      if (checkWin(currentPlayer)) {
        statusDiv.textContent = `Player ${currentPlayer} wins!`;
        highlightWin(currentPlayer);
        gameActive = false;
      } else if (board.every(cell => cell !== "")) {
        statusDiv.textContent = "It's a draw!";
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDiv.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  
    function checkWin(player) {
      return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
      });
    }
  
    function highlightWin(player) {
      winningCombinations.forEach(combination => {
        if (combination.every(index => board[index] === player)) {
          combination.forEach(index => {
            cells[index].classList.add('winning-cell');
          });
        }
      });
    }
  
    function resetGame() {
      board = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      gameActive = true;
      statusDiv.textContent = `Player ${currentPlayer}'s turn`;
      cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('winning-cell');
      });
    }
  
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetBtn.addEventListener('click', resetGame);
  
    // Accessibility: keyboard support for cells
    cells.forEach(cell => {
      cell.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && gameActive) {
          e.preventDefault();
          cell.click();
        }
      });
    });
  })();
  