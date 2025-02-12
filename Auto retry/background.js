let refreshInterval = 1 * 1000; // 1分鐘 1000毫秒
const targetUrls = ['https://booth.pm/zh-tw/items/6588449',];
let intervalId = null;

function refreshTabs() {
  targetUrls.forEach(url => {
    chrome.tabs.query({ url: url }, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.reload(tab.id);
      });
    });
  });
}

function startAutoRefresh() {
  if (intervalId === null) {
    intervalId = setInterval(refreshTabs, refreshInterval);
    refreshTabs(); // 初始加載時立即刷新一次
  }
}

function stopAutoRefresh() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start') {
    startAutoRefresh();
  } else if (message.action === 'stop') {
    stopAutoRefresh();
  }
  sendResponse({ status: 'ok' });
});

// 初始加載時啟動自動刷新
startAutoRefresh();

// https://tw.stock.yahoo.com/portfolios/2'