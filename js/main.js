(function(){
  var side=document.getElementById('side'),shade=document.getElementById('shade'),ob=document.getElementById('open');
  function set(o){side.classList.toggle('open',o);shade.classList.toggle('open',o);ob.setAttribute('aria-expanded',o);if(o)document.getElementById('close').focus()}
  ob.onclick=function(){set(true)};document.getElementById('close').onclick=function(){set(false)};shade.onclick=function(){set(false)};
  side.querySelectorAll('nav a').forEach(function(a){a.onclick=function(){set(false)}});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
  document.getElementById('f').addEventListener('submit',function(e){
    e.preventDefault();
    var t=i18n.ui('name')+': '+n.value+'\n'+i18n.ui('contact')+': '+c.value+'\n'+m.value;
    try{navigator.clipboard.writeText(t)}catch(x){}
    document.getElementById('ok').textContent=i18n.ui('ok');
    window.open('https://t.me/Shisui_Look123','_blank','noopener');
  });
  var up=document.getElementById('up');
  function chk(){up.classList.toggle('show',(window.scrollY||document.documentElement.scrollTop)>400)}
  window.addEventListener('scroll',chk,{passive:true});chk();
  up.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};
})();
