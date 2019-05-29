var arrNumbers
var arrOperators
var curi

$(document).ready(function() {
  resetCalculator()

  // handle click on a number
  $('.number').on('click', function() {
    if (!arrNumbers[curi]) {
      arrNumbers.push('')
    }
    arrNumbers[curi] += this.value
    renderInput()
  })

  // handle click on an operator
  $('.operator').on('click', function() {
    arrOperators.push(this.value)
    $('#operator').html($(this).text())
    curi++
  })

  // handle click on equals
  $('.equal').on('click', function() {
    var result
    result = doMath(arrNumbers, arrOperators)
    $('#result').html(result)
    resetCalculator()
  })

  // handles click on clear btn
  $('.clear').on('click', function() {
    // clear the display
    $('#first-number').html('')
    $('#second-number').html('')
    $('#operator').html('')
    $('#result').html('')

    // reset calculator values
    resetCalculator()
  })
})

function renderInput() {
  var operator = lookupOperatorHtml(arrOperators[arrOperators.length - 1])
  var children = [
    $('<h1 id="first-number">').text(arrNumbers[0] || ''),
    $('<h1 id="operator">').html(operator || ''),
    $('<h1 id="second-number">').text(arrNumbers[1] || ''),
    $('<hr>'),
    $('<h1 id="result">')
  ]
  $('#calculator-output')
    .empty()
    .append(children)
}

function lookupOperatorHtml(operator) {
  var mapper = {
    plus: '+',
    minus: '&minus;',
    times: '&times;',
    divide: '&divide;',
    power: '^'
  }
  return mapper[operator] || ''
}

function resetCalculator() {
  arrNumbers = []
  arrOperators = []
  curi = 0
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
