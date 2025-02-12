document.getElementById('refreshButton').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
});

document.getElementById('stopButton').addEventListener('click', function() {
  chrome.runtime.sendMessage({ action: 'stop' }, function(response) {
    console.log('Auto refresh stopped.');
  });
});
