import { getComments, addComments } from './api'
import { appendCommentToDOM, appendStyle } from './utils'
import { getLoadMoreButton, getForm, cssTemp } from './temp' 
import $ from 'jquery'

export function init(options) {
  let siteKey = ''
  let apiUrl = ''
  let containerElement = null
  let commentsDOM = null
  let lastId = null
  let isEnd = false
  let loadMoreClassName
  let commentsClassNanme
  let commentsSelector
  let formClassName
  let formSelector

  siteKey = options.siteKey
  apiUrl = options.apiUrl
  loadMoreClassName = `${siteKey}-load-more`
  commentsClassNanme = `${siteKey}-comments`
  commentsSelector = `.${commentsClassNanme}`
  formClassName = `${siteKey}-add-comment-form`
  formSelector = `.${formClassName}`

  containerElement = $(options.containerSelector)
  containerElement.append(getForm(formClassName, commentsClassNanme))
  appendStyle(cssTemp)

  commentsDOM = $(commentsSelector)
  getNewComments()

  $(commentsSelector).on('click', `.${loadMoreClassName}`, ()=>{
    getNewComments()  
  })

  $(formSelector).submit(e => {
    e.preventDefault();
    const nicknameDOM = $(`${formSelector} input[name=nickname]`)
    const contentDOM = $(`${formSelector} textarea[name=content]`)
    const newComment = {
        site_key: siteKey,
        nickname: nicknameDOM.val(),
        content: contentDOM.val()
    }


    addComments(apiUrl, siteKey, newComment, data => {
      if(!data.ok) {
        alert(data.message)
        return
      }
      nicknameDOM.val('')
      contentDOM.val('')
      appendCommentToDOM(commentsDOM, newComment, true)
    })
  })

  function getNewComments() {
    const commentsDOM = $(commentsSelector)
    $(`.${loadMoreClassName}`).hide()
    if(isEnd) {
      return
    }
    getComments(apiUrl, siteKey, lastId, data => {
      if(!data.ok) {
        alert(data.message)
        return
      }
  
      const comments = data.discussion
      for(let comment of comments) {
        appendCommentToDOM(commentsDOM, comment)
      }
      let length = comments.length
      if(length === 0) {
        isEnd = true
        $(`.${loadMoreClassName}`).hide()
      } else {
        lastId = comments[length - 1].id
        let loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName)
        commentsDOM.append(loadMoreButtonHTML)
      }
    })
  }
}


