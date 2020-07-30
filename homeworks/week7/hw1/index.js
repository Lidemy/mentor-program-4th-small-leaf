document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault()
  let hasError = false
  let values = {}
  const eles = document.querySelectorAll('.required')
  for (let ele of eles) {
    let isValid = true
    const input = ele.querySelector('input[type=text]')
    const radios = ele.querySelectorAll('input[type=radio]')
    if(input) {
      values[input.name] = input.value
      if(!input.value) {
        isValid = false
      }
    }else if (radios.length) {
      isValid = [...radios].some(radio => radio.checked)
      if(isValid) {
        let r = ele.querySelector('input[type=radio]:checked')
        values[r.name] = r.value
      }
    } else {
      continue
    }
    if(!isValid){
      hasError = true
      ele.classList.remove('hide-error')
    }else {
      ele.classList.add('hide-error')
    }
  }
  if(!hasError){
    alert(JSON.stringify(values))
  }
})