export function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function appendCommentToDOM(container, comment, isPrepend) {
  const html = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${escapeHtml(comment.nickname)}</h5>
        <p class="card-text">${escapeHtml(comment.content)}</p>
      </div>
    </div>
  `
  if(isPrepend) {
    container.prepend(html)
  } else {
    container.append(html)
  }
}

export function appendStyle(cssTemp) {
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  styleElement.appendChild(document.createTextNode(cssTemp))
  document.head.appendChild(styleElement)
}