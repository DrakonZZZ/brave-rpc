let updatePresence = (tab) => {
  if (tab) {
    var url = new URL(tab.url);
    var data = {
      action: 'active',
      url: tab.url,
      details: url.hostname,
      state: tab.title,
      smallText: tab.url,
      largeText: tab.title,
    };
  } else {
    var data = {
      action: 'unactive',
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
  };

  $.ajax(settings);
};

let lastCheckedTabId;
setInterval(() => {
  // on an interval…
  chrome.windows.getLastFocused({ populate: true }, (window) => {
    // get the last focused window
    if (window.focused) {
      // if it's focused
      if (window.tabs)
        // and it has tabs
        for (let tab of window.tabs) {
          if (tab.highlighted) {
            // until we find the selected one
            if (tab.id != lastCheckedTabId || !wasFocused) {
              // if this is different than the tab we got last time, or the browser was not focused last time
              lastCheckedTabId = tab.id; // remember the tab we found
              updatePresence(tab); // user has switched tabs; update our presence!
            }
            break; // stop iterating over tabs
          }
        } // iterate over tabs
    }
  });
}, 500); // check every second0
