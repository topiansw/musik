// Runs in an embed, never in the page that hosts it. No seeking or media rewriting.
(async()=>{
  if(window.top===window || document.referrer.split('/')[2]!=='topiansw.github.io')return;
  const api=globalThis.browser??globalThis.chrome;
  if(!await api.runtime.sendMessage('nada:skip').catch(()=>false))return;
  function skip(){
    for(const button of document.querySelectorAll('.ad-showing button.ytp-skip-ad-button, .ad-showing button.ytp-ad-skip-button-modern, .ad-showing button.ytp-ad-skip-button')){
      if(!button.disabled && button.getAttribute('aria-disabled')!=='true' && button.getClientRects().length && getComputedStyle(button).visibility==='visible'){button.click();break}
    }
  }
  let pending=false;
  new MutationObserver(()=>{if(!pending){pending=true;setTimeout(()=>{pending=false;skip()},200)}})
    .observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','disabled','aria-disabled','hidden']});
  skip();
})();