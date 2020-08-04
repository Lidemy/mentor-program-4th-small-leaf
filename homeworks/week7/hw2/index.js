document.querySelector('.faq').addEventListener('click', e => {
  const ele = e.target.closest('.question')
  if(ele) {
    ele.classList.toggle('question-hide')
  }
})