document.addEventListener('DOMContentLoaded', function () {
  const taxForm = document.getElementById('taxForm')
  const submitBtn = document.getElementById('submitBtn')
  const modal = document.getElementById('myModal')
  const closeBtn = document.querySelector('.close')
  const taxAmountDisplay = document.getElementById('taxAmount')
  const errorIcons = document.querySelectorAll('.error-icon')

  submitBtn.addEventListener('click', function () {
    const grossIncomeInput = document.getElementById('grossIncome')
    const extraIncomeInput = document.getElementById('extraIncome')
    const deductionsInput = document.getElementById('deductions')
    const ageInput = document.getElementById('age')

    // Remove existing error icons
    errorIcons.forEach((icon) => (icon.style.display = 'none'))

    // Validate inputs
    if (!grossIncomeInput.value || !extraIncomeInput.value || !ageInput.value) {
      // Show error icon for mandatory fields
      if (!grossIncomeInput.value) {
        grossIncomeInput.nextElementSibling.style.display = 'inline-block'
      }
      if (!extraIncomeInput.value) {
        extraIncomeInput.nextElementSibling.style.display = 'inline-block'
      }
      if (!ageInput.value) {
        ageInput.nextElementSibling.style.display = 'inline-block'
      }
      return // Stop execution if mandatory fields are not filled
    }

    // Parse income values as floats
    const grossIncome = parseFloat(grossIncomeInput.value)
    const extraIncome = parseFloat(extraIncomeInput.value)
    const deductions = parseFloat(deductionsInput.value) || 0
    const age = ageInput.value

    // Check if any input value is not a number
    if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions)) {
      alert('Please enter valid numeric values.')
      return
    }

    // Calculate tax amount
    let taxAmount = calculateTax(grossIncome, extraIncome, deductions, age)
    if (isNaN(taxAmount)) {
      taxAmountDisplay.textContent = 'Error: Unable to calculate tax.'
    } else {
      taxAmountDisplay.textContent = `Your overall income will be : ${taxAmount.toFixed(
        2
      )}   
      after tax deductions`
    }

    modal.style.display = 'block'
  })

  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none'
  })

  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  })

  function calculateTax(grossIncome, extraIncome, deductions, age) {
    const overallIncome = grossIncome + extraIncome - deductions

    // Check if overall income is less than or equal to 8 Lakhs
    if (overallIncome <= 800000) {
      return 0 // No tax
    } else {
      // Calculate taxable income (amount over 8 Lakhs)
      const taxableIncome = overallIncome - 800000

      // Determine tax rate based on age
      let taxRate
      if (age === '<40') {
        taxRate = 0.3
      } else if (age === '≥ 40 & < 60') {
        taxRate = 0.4
      } else if (age === '≥ 60') {
        taxRate = 0.1
      }

      // Calculate tax amount
      const taxAmount = taxableIncome * taxRate
      return taxAmount
    }
  }
})
