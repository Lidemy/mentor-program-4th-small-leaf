export function getComments(apiUrl, siteKey, before, cb) {
  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`
  if(before) {
    url += `&before=${before}`
  }
  $.ajax({
    type:'GET',
    url:url,
    success: data => {
      cb(data)
    }
  });
}

export function addComments(apiUrl, siteKey, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comment.php`,
    data,
    success: data => {
     cb(data)
    } 
  }) 
}