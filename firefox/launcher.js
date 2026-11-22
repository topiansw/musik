// Install the rule before navigating, and only in the tab opened by the user.
browser.action.onClicked.addListener(async () => {
  const tab = await browser.tabs.create({url: 'about:blank'});
  try {
    await browser.declarativeNetRequest.updateSessionRules({addRules: [{
      id: tab.id + 1, priority: 1, action: {type: 'block'},
      condition: {tabIds: [tab.id], requestDomains: ['doubleclick.net', 'googlesyndication.com'],
        resourceTypes: ['script', 'image', 'xmlhttprequest', 'sub_frame', 'media', 'ping', 'other']}
    }]});
  } finally {
    await browser.tabs.update(tab.id, {url: 'https://topiansw.github.io/musik/'});
  }
});
browser.tabs.onRemoved.addListener(id => browser.declarativeNetRequest.updateSessionRules({removeRuleIds: [id + 1]}));