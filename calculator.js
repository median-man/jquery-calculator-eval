var arrNumbers
var arrOperators
var curi
var result

$(document).ready(function() {
  resetCalculator()

  // handle click on a number
  $('.number').on('click', function() {
    if (!arrNumbers[curi]) {
      arrNumbers.push('')
    }
    arrNumbers[curi] += this.value
    renderCalculatorOutput()
  })

  // handle click on an operator
  $('.operator').on('click', function() {
    arrOperators.push(this.value)
    curi++
    renderCalculatorOutput()
  })

  // renders result of math and resets values
  $('.equal').on('click', function() {
    result = doMath(arrNumbers, arrOperators)
    renderCalculatorOutput()
    resetCalculator()
  })

  // clear values and output view
  $('.clear').on('click', function() {
    resetCalculator()
    renderCalculatorOutput()
  })
})

function renderCalculatorOutput() {
  var i
  var children = []

  children.push(renderNumber(arrNumbers[0]))

  for (i = 0; i < arrOperators.length; i += 1) {
    children.push(renderOperator(arrOperators[i]))
    children.push(renderNumber(arrNumbers[i + 1]))
  }

  children.push($('<hr>'))
  children.push(renderNumber(result))

  $('#calculator-output')
    .empty()
    .append(children)
}

function renderNumber(number) {
  return $('<h1>').text(number)
}

function renderOperator(operator) {
  var mapper = {
    plus: '+',
    minus: '&minus;',
    times: '&times;',
    divide: '&divide;',
    power: '^'
  }
  return $('<h1>').html(mapper[operator] || '')
}

function resetCalculator() {
  arrNumbers = []
  arrOperators = []
  curi = 0
  result = ''
}

function doMath(numbers, maths) {
  var answerString = numbers[0]
  for (var i = 0; i < numbers.length - 1; i++) {
    var secondNum = parseInt(numbers[i + 1])
    switch (maths[i]) {
      case 'plus':
        answerString += ' + ' + secondNum
        break
      case 'minus':
        answerString += ' - ' + secondNum
        break
      case 'times':
        answerString += ' * ' + secondNum
        break
      case 'divide':
        answerString += ' / ' + secondNum
        break
      case 'power':
        answerString = ' Math.pow((' + answerString + '), ' + secondNum + ')'
        break
    }
  }
  return eval(answerString)
}
