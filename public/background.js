chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.type === 'AddContact' && (request.formData.email !== '' || request.formData.phone !== '')) {
            const {formData, defaultFormData} = request;

            chrome.identity.getAuthToken({interactive: true}, function(token) {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { type: 'AddToken', token, formData, defaultFormData});
                });
            });
            //sendResponse({farewell: "goodbye"});
        }}
);