// Variáveis
let playersArray = [0,"Jogador 1", "Jogador 2"]
let playerOneBox = document.getElementById("playerOne")
let playerTwoBox = document.getElementById("playerTwo")
let turn = 1
let vicory
const buttons = document.querySelectorAll('.button')
const startButton = document.getElementById('startButton')
let gameInputs = [
    ["","",""],
    ["","",""],
    ["","",""]
]

// Funcoes
function defaultButtonBehavior(ev)
{
    const button = ev.currentTarget

    buttonPosition = button.dataset.position
    const rowColumn = buttonPosition.split('.')
    gameInputs[rowColumn[0]][rowColumn[1]] = turn

    button.classList.add('disabledButton')
    button.setAttribute('disabled', !button.disabled)

    turn == 1 ? console.log(button.innerText = "X") : console.log(button.innerText = "O")

    if (checkVictory().length > 0)
    {
        buttons.forEach(function(thisButton){
            thisButton.classList.add('disabledButton')
            thisButton.setAttribute('disabled', !button.disabled)        
        })

        document.querySelectorAll('#players div').forEach(function(box){
            box.children.item(0).innerText = playersArray[turn] + " venceu o jogo!"
            box.children.item(1).style.display = 'none'
        })
        
        startButton.innerText = 'Reiniciar'
        startButton.addEventListener('click', restart)

    } else if(gameInputs.flat().includes(''))
    {
        console.log(turn)
        changeTurn()
    }
    else
    {
        alert("Empatou!")
        startButton.innerText = 'Reiniciar'
        startButton.addEventListener('click', restart)
    }

}

function restart()
{
    playerOneBox.style.display = ''
    playerOneBox.children.item(0).innerText = "Nome do jogador 1: "
    playerOneBox.children.item(1).style.display = ''
    playerOneBox.children.item(1).removeAttribute('disabled')
    

    playerTwoBox.style.display = ''
    playerTwoBox.children.item(0).innerText = "Nome do jogador 2: "
    playerTwoBox.children.item(1).style.display = ''
    playerTwoBox.children.item(1).removeAttribute('disabled')

    gameInputs = [
        ["","",""],
        ["","",""],
        ["","",""]
    ]

    startButton.removeEventListener('click', restart)
    startButton.innerText = 'Começar'
    startButton.addEventListener('click', initializeGame)

}

function changeTurn()
{

    switch (turn)
    {
        case 1:
            turn = 2
            
            playerTwoBox.style.display = ''
            playerOneBox.style.display = 'none'
            break;
        default:
            turn = 1
            
            playerOneBox.style.display = ''
            playerTwoBox.style.display = 'none'
            break;
    } 
    document.querySelectorAll('#players div').forEach(function(box){
        box.children.item(0).innerText = "Vez de " + playersArray[turn]
        box.children.item(1).style.display = 'none'
    })
}

function checkVictory()
{
    const winRegions = []
    if (gameInputs[0][0] && gameInputs[0][0] === gameInputs[0][1] && gameInputs[0][0] === gameInputs[0][2])
        winRegions.push("0.0", "0.1", "0.2")
      if (gameInputs[1][0] && gameInputs[1][0] === gameInputs[1][1] && gameInputs[1][0] === gameInputs[1][2])
        winRegions.push("1.0", "1.1", "1.2")
      if (gameInputs[2][0] && gameInputs[2][0] === gameInputs[2][1] && gameInputs[2][0] === gameInputs[2][2])
        winRegions.push("2.0", "2.1", "2.2")
      if (gameInputs[0][0] && gameInputs[0][0] === gameInputs[1][0] && gameInputs[0][0] === gameInputs[2][0])
        winRegions.push("0.0", "1.0", "2.0")
      if (gameInputs[0][1] && gameInputs[0][1] === gameInputs[1][1] && gameInputs[0][1] === gameInputs[2][1])
        winRegions.push("0.1", "1.1", "2.1")
      if (gameInputs[0][2] && gameInputs[0][2] === gameInputs[1][2] && gameInputs[0][2] === gameInputs[2][2])
        winRegions.push("0.2", "1.2", "2.2")
      if (gameInputs[0][0] && gameInputs[0][0] === gameInputs[1][1] && gameInputs[0][0] === gameInputs[2][2])
        winRegions.push("0.0", "1.1", "2.2")
      if (gameInputs[0][2] && gameInputs[0][2] === gameInputs[1][1] && gameInputs[0][2] === gameInputs[2][0])
        winRegions.push("0.2", "1.1", "2.0")

    return winRegions
}

function initializeGame()
{1

    playersArray[1] = document.getElementById('playerOneName').value
    playersArray[2] = document.getElementById('playerTwoName').value

    buttons.forEach(function(button){
        button.addEventListener('click',defaultButtonBehavior)
    })

    document.querySelectorAll('input').forEach(function(input){
        input.setAttribute('disabled', true)
    })

    buttons.forEach(function(button){
        button.removeAttribute('disabled')
        button.innerText = ''
        button.classList.remove('disabledButton')
    })

    turn = 2
    changeTurn()


    startButton.removeEventListener('click', initializeGame)
    startButton.innerText = 'Jogando!'
}

restart()