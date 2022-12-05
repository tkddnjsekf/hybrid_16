document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid')
  const resultDisplay = document.getElementById('result')
  let squares = [] //저장배열
  const width = 4

  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      square = document.createElement('div')
      square.innerHTML = 0
      gridDisplay.appendChild(square)
      squares.push(square)
    }
    generate()
    generate() //시작시 두개 생성
  }
  createBoard()

  function generate() {
    randomNumber = Math.floor(Math.random() * squares.length)
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = Math.random() < 0.8 ? 2 : 4
    } else {
      generate()
    }

  }


  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i + 1].innerHTML
        let totalThree = squares[i + 2].innerHTML
        let totalFour = squares[i + 3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)

        squares[i].innerHTML = newRow[0]
        squares[i + 1].innerHTML = newRow[1]
        squares[i + 2].innerHTML = newRow[2]
        squares[i + 3].innerHTML = newRow[3]
      }
    }
  }

  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i + 1].innerHTML
        let totalThree = squares[i + 2].innerHTML
        let totalFour = squares[i + 3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)

        squares[i].innerHTML = newRow[0]
        squares[i + 1].innerHTML = newRow[1]
        squares[i + 2].innerHTML = newRow[2]
        squares[i + 3].innerHTML = newRow[3]

      }
    }
  }


  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i + width].innerHTML
      let totalThree = squares[i + (width * 2)].innerHTML
      let totalFour = squares[i + (width * 3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeros)

      squares[i].innerHTML = newColumn[0]
      squares[i + width].innerHTML = newColumn[1]
      squares[i + (width * 2)].innerHTML = newColumn[2]
      squares[i + (width * 3)].innerHTML = newColumn[3]
    }
  }

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i + width].innerHTML
      let totalThree = squares[i + (width * 2)].innerHTML
      let totalFour = squares[i + (width * 3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
      //칸 분류 밑 이동값

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = zeros.concat(filteredColumn)

      squares[i].innerHTML = newColumn[0]
      squares[i + width].innerHTML = newColumn[1]
      squares[i + (width * 2)].innerHTML = newColumn[2]
      squares[i + (width * 3)].innerHTML = newColumn[3]
    }
  }

  function combineRow() {
    return;
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i + 1].innerHTML = 0

      }
    }
  }

  function combineColumn() {
    return;
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i + width].innerHTML = 0
      }
    }
  }

  function control(e) {
    if (e.keyCode === 37) {
      keyLeft()
    } else if (e.keyCode === 38) {
      keyUp()
    } else if (e.keyCode === 39) {
      keyRight()
    } else if (e.keyCode === 40) {
      keyDown()
    }
  }
  document.addEventListener('keyup', control)

  function keyRight() {
    moveRight()
    combineRow()
    moveRight()
    generate()
  }

  function keyLeft() {
    moveLeft()
    combineRow()
    moveLeft()
    generate()
  }

  function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    generate()
  }

  function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    generate()
  }

  function checkForGameOver() {
    let zeros = 0
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++
      }
    }
  }

  function clear() {
    clearInterval(myTimer)
  }

  function addColours() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
      else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#eee4da'
      else if (squares[i].innerHTML == 4) squares[i].style.backgroundColor = '#ede0c8'
    }
  }
  addColours()

  var myTimer = setInterval(addColours, 50)


})