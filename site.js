function setLang(lang){
  document.getElementById('htmlRoot').setAttribute('lang', lang);
  var frBtn = document.getElementById('langFrBtn');
  var enBtn = document.getElementById('langEnBtn');
  if(frBtn) frBtn.classList.toggle('active', lang === 'fr');
  if(enBtn) enBtn.classList.toggle('active', lang === 'en');
  if(window.PAGE_TITLE && window.PAGE_TITLE[lang]){ document.title = window.PAGE_TITLE[lang]; }
  try{ localStorage.setItem('litebiz_lang', lang); }catch(e){}
}
// The <head> already set the correct lang from localStorage (avoids a flash of
// French before this script runs) — just sync the toggle buttons/title to it.
var initialLang = document.getElementById('htmlRoot').getAttribute('lang') || 'en';
setLang(initialLang);

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

// ---- enquiry / demo request form: posts to the app's /api/enquiry endpoint ----
(function(){
  var form = document.getElementById('enquiryForm');
  if(!form) return;
  var ENDPOINT = 'https://app.litebizerp.com/api/enquiry';
  var ok = document.getElementById('enqOk'), err = document.getElementById('enqErr'),
      invalid = document.getElementById('enqInvalid'), btn = document.getElementById('enquirySubmit');
  function hideAll(){ ok.hidden = err.hidden = invalid.hidden = true; }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    hideAll();
    var f = form.elements;
    var kind = form.querySelector('input[name=kind]:checked').value;
    var data = {
      name: f.name.value.trim(), email: f.email.value.trim(), phone: f.phone.value.trim(),
      company: f.company.value.trim(), message: f.message.value.trim(), kind: kind,
      lang: document.getElementById('htmlRoot').getAttribute('lang') || 'en',
      website: f.website.value
    };
    var emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email);
    if(!data.name || !emailOk || (kind === 'contact' && !data.message)){ invalid.hidden = false; return; }
    btn.disabled = true;
    fetch(ENDPOINT, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)})
      .then(function(r){ return r.json().then(function(j){ return {status:r.status, body:j}; }); })
      .then(function(res){
        btn.disabled = false;
        if(res.body && res.body.ok){ form.reset(); ok.hidden = false; }
        else if(res.status === 400){ invalid.hidden = false; }
        else { err.hidden = false; }
      })
      .catch(function(){ btn.disabled = false; err.hidden = false; });
  });
})();
