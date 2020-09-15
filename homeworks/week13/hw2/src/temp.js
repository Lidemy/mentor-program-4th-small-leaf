export const cssTemp = `.card { margin-top: 12px ; }`

export function getLoadMoreButton(className) {
  return `<button class="${className} btn btn-primary mt-3">載入更多</button>`
}

export function getForm(className, commentsClassName) {
  return `
  <div>
    <form class="${className}">
      <div class="form-group">
        <label for="form-nickname">暱稱</label>
        <input  name="nickname" type="test" class="form-control" id="form-nickname">
      </div>
      <div class="form-group">
        <label for="content-textarea">留言內容</label>
        <textarea class="form-control" name="content" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">送出</button>
    </form>
    <div class="${commentsClassName}">
    </div>
  </div>
`
} 