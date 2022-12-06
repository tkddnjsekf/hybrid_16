document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const resultDisplay = document.getElementById('result')
    const scoreDisplay = document.getElementById('score')
    const countDisplay = document.getElementById('count')



    let squares = [] //저장배열
    const width = 4
    let score = 0;
    let start = 0;

    var count = 0

    function addCount() {
        count += 1
        countDisplay.innerHTML = count
    }

    function createBoard() {
        var ran1 = Math.floor(Math.random() * 3)
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        //random 0~2
        switch (ran1) {
            case 0:
                Cell()
                break;

            case 1:
                Cell2()
                break;

            case 2:
                Cell()
                Cell2()
                break;

            default:
                break;
        }
    }



    //시작시 두개 생성


    document.getElementById("gamestart").onclick = function () {
        start++;
        if (start == 1) {
            createBoard()
        }
    }

    document.getElementById("regamestart").onclick = function () {
        start++;
        document.addEventListener('keyup', control)
        document.querySelector("div.grid").innerHTML = "";
        squares = []
        resultDisplay.innerHTML = ''
        createBoard()
    }



    function Cell() {
        randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2
            combineAnimation([squares[randomNumber]], () => { });
            checkForGameOver()
        } else Cell()
    }

    function Cell2() {
        randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 4
            combineAnimation([squares[randomNumber]], () => { });
            checkForGameOver()
        } else Cell()
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



    function combineRow(callback) {
        var elements = []
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML &&
                squares[i].innerHTML != 0) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i + 1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
                var target = squares[i];
                elements.push(target);
            }
        }
        checkForWin()
        combineAnimation(elements, callback);
    }

    var lastAnimation = null;
    var animationCount = 0;
    function combineColumn(callback) {
        var elements = []
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML &&
                squares[i].innerHTML != 0) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i + width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score;
                var target = squares[i];
                elements.push(target);
            }
        }
        checkForWin()
        combineAnimation(elements, callback);
    }

    function combineAnimation(elements, callback) {
        var arr = calculateAnimation();//애니메이션 값
        if (lastAnimation == null) {
            animationCount = 0;
            lastAnimation = setInterval(
                () => {
                    animationCount++;
                    if (animationCount >= arr.length) {
                        console.log("end");
                        clearInterval(lastAnimation);
                        lastAnimation = null;
                        callback();
                    } else {
                        elements.forEach(element => {
                            element.setAttribute("style", element.getAttribute("style") + "transform: scale(" + arr[animationCount] + ");");
                        });
                    }
                }
                , 8);
        }

    }


    function control(e) {
        if (lastAnimation != null) {
            return;
        }
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
        combineRow(() => {
            moveRight();
            Cell();
        })
        addCount();
    }

    function keyLeft() {
        moveLeft()
        combineRow(() => {
            moveLeft()
            Cell()
        });
        addCount();
    }

    function keyUp() {
        moveUp()
        combineColumn(() => {
            moveUp()
            Cell()
        });

        addCount();
    }

    function keyDown() {
        moveDown()
        combineColumn(() => {
            moveDown();
            Cell();
        })
        addCount();
    }

    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You WIN'
                document.removeEventListener('keyup', control)
                combineAnimation([resultDisplay], () => { });
            }
        }
    }

    //check if there are no zeros on the board to lose
    function checkForGameOver() {
        let zeros = 0
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = 'You LOSE'
            document.removeEventListener('keyup', control)
            combineAnimation([resultDisplay], () => { });
        }
    }



    function addColours() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
            else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#eee4da'
            else if (squares[i].innerHTML == 4) squares[i].style.backgroundColor = '#ede0c8'
            else if (squares[i].innerHTML == 8) squares[i].style.backgroundColor = '#8B0000'
            else if (squares[i].innerHTML == 16) squares[i].style.backgroundColor = '#8B4513'
            else if (squares[i].innerHTML == 32) squares[i].style.backgroundColor = '#FA8072'
            else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#FF7F50'
            else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#FFA07A'
            else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#CD853F'
            else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#D2691E'
            else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#BC8F8F'
            else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#CD5C5C'
        }
    }
    addColours()

    var myTimer = setInterval(addColours, 50)

    //애니 선 계산 후 드로잉 = 드로잉때 애니메이션 잠깐 축소 후 확대 클리어화면도 작았다 커지게
    function calculateAnimation() {
        var sizeArray = [];
        var x = 1;
        //1->0.7->1
        for (var i = 0; i < 10; i++) {
            x = easeLinear(i, 1, -0.3, 10);
            sizeArray.push(x);
        }
        for (var i = 0; i < 10; i++) {
            x = easeLinear(i, 0.7, 0.3, 10);
            sizeArray.push(x);
        }
        return sizeArray;
    }
    //t = time, b = begin, c = change, d = duration
    function easeLinear(t, b, c, d) {
        return c * t / d + b;
    }
})