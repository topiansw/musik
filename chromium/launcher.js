// Install the rule before navigating, and only in the tab opened by the user.
const api=globalThis.browser??globalThis.chrome;
const studio='https://topiansw.github.io/musik/';
const filter=api.declarativeNetRequest;
api.runtime.onMessage.addListener((message,sender,reply)=>{
  if(message!=='nada:skip')return;
  if(!sender.frameId || !sender.tab?.url?.startsWith(studio)){reply(false);return}
  filter.getSessionRules().then(rules=>reply(rules.some(r=>r.condition.tabIds?.includes(sender.tab.id))),()=>reply(false));
  return true;
});
api.action.onClicked.addListener(async () => {
  const tab = await api.tabs.create({url: 'about:blank'});
  try {
    await filter.updateSessionRules({addRules: [{
      id: tab.id + 1, priority: 1, action: {type: 'block'},
      condition: {tabIds: [tab.id], requestDomains: ['doubleclick.net', 'googlesyndication.com'],
        resourceTypes: ['script', 'image', 'xmlhttprequest', 'sub_frame', 'media', 'ping', 'other']}
    }]});
  } finally {
    await api.tabs.update(tab.id, {url: studio});
  }
});
api.tabs.onRemoved.addListener(id => filter.updateSessionRules({removeRuleIds: [id + 1]}));