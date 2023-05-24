let updatePresence = (tab) => {
  if (tab) {
    let url = new URL(tab.url);
    console.log(url);
    var data = {
      action: 'set',
      url: tab.url,
      details: url.hostname,
      state: tab.title,
      smallText: tab.url,
      largeText: tab.title,
    };
  } else {
    var data = {
      action: 'c',
    };
  }

  let settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    processData: false,
    data: JSON.stringify(data),
    //need to implement fetch api for future version 
  };

  $.ajax(settings);
};

let lastCheckedTabId;
setInterval(() => {
  chrome.windows.getLastFocused({ populate: true }, (window) => {
    if (window.focused) {
      if (window.tabs)
        for (let tab of window.tabs) {
          if (tab.highlighted) {
            if (tab.id != lastCheckedTabId) {
              lastCheckedTabId = tab.id;
              updatePresence(tab);
            }
            break;
          }
        }
    }
  });
}, 500);
