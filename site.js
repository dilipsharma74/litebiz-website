function setLang(lang){
  document.getElementById('htmlRoot').setAttribute('lang', lang);
  var frBtn = document.getElementById('langFrBtn');
  var enBtn = document.getElementById('langEnBtn');
  if(frBtn) frBtn.classList.toggle('active', lang === 'fr');
  if(enBtn) enBtn.classList.toggle('active', lang === 'en');
  if(window.PAGE_TITLE && window.PAGE_TITLE[lang]){ document.title = window.PAGE_TITLE[lang]; }
}
setLang('fr');

function toggleMenu(){
  var nav = document.getElementById('mainNav');
  if(nav) nav.classList.toggle('open');
}

document.addEventListener('click', function(e){
  var nav = document.getElementById('mainNav');
  var btn = document.getElementById('menuBtn');
  if(!nav || !nav.classList.contains('open')) return;
  if(nav.contains(e.target) || (btn && btn.contains(e.target))) return;
  nav.classList.remove('open');
});

var yearEls = document.querySelectorAll('.js-year');
for(var i=0;i<yearEls.length;i++){ yearEls[i].textContent = new Date().getFullYear(); }
