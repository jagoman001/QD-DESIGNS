(function(){
  var $=function(id){return document.getElementById(id)};
  var nav=$('nav'),mm=$('mmenu');
  if(nav)addEventListener('scroll',function(){nav.classList.toggle('scrolled',scrollY>10)},{passive:true});
  if(mm&&$('burger')){
    $('burger').onclick=function(){mm.classList.add('open');mm.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
    mm.querySelectorAll('[data-close]').forEach(function(a){a.addEventListener('click',function(){mm.classList.remove('open');mm.setAttribute('aria-hidden','true');document.body.style.overflow=''})});
  }
  if($('totop'))$('totop').onclick=function(){scrollTo({top:0,behavior:'smooth'})};

  // reveal on scroll
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
  }else document.querySelectorAll('.rv').forEach(function(el){el.classList.add('in')});

  // typing greeting
  var t=$('typed');
  if(t){
    var names=['Adeshina Quadri','Jago','a Web Designer','a Developer'],ni=0,ci=names[0].length,del=true;
    setTimeout(function tick(){
      if(del){ci--;t.textContent=names[ni].slice(0,ci);if(ci===0){del=false;ni=(ni+1)%names.length}setTimeout(tick,45)}
      else{ci++;t.textContent=names[ni].slice(0,ci);if(ci===names[ni].length){del=true;setTimeout(tick,2200)}else setTimeout(tick,85)}
    },2600);
  }

  // count-up stats
  var counters=document.querySelectorAll('[data-count]');
  if(counters.length&&'IntersectionObserver' in window){
    var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;cio.unobserve(e.target);
      var el=e.target,end=+el.dataset.count,suf=el.querySelector('span').outerHTML,s=performance.now();
      (function f(n){var p=Math.min((n-s)/1200,1);el.innerHTML=Math.round(end*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(f)})(s);
    })},{threshold:.6});
    counters.forEach(function(el){cio.observe(el)});
  }

  // tap-to-cycle skill cards
  var stack=$('stack');
  if(stack){
    var cards=[].slice.call(stack.children),dots=document.querySelectorAll('#stackDots i'),front=0;
    var lay=function(){cards.forEach(function(c,i){c.dataset.pos=(i-front+cards.length)%cards.length});dots.forEach(function(d,i){d.classList.toggle('on',i===front)})};
    var next=function(){front=(front+1)%cards.length;lay()};
    stack.addEventListener('click',next);
    stack.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();next()}});
    lay();
  }

  // journey timeline fill
  var tl=$('tl'),fill=$('tlFill');
  if(tl&&fill){
    var items=tl.querySelectorAll('.tl-item');
    var tlUpdate=function(){var r=tl.getBoundingClientRect(),mid=innerHeight*.6,p=Math.max(0,Math.min(1,(mid-r.top)/r.height));fill.style.height=(p*100)+'%';
      items.forEach(function(it){it.classList.toggle('lit',it.getBoundingClientRect().top+30<mid)})};
    addEventListener('scroll',tlUpdate,{passive:true});addEventListener('resize',tlUpdate);tlUpdate();
  }

  // active nav link
  var secs=document.querySelectorAll('section[id]'),links=document.querySelectorAll('.nav-links a[href^="#"]');
  if(secs.length&&links.length)addEventListener('scroll',function(){var cur='';secs.forEach(function(s){if(s.getBoundingClientRect().top<innerHeight*.35)cur=s.id});links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+cur)})},{passive:true});

  // contact form -> WhatsApp
  var form=$('waForm');
  if(form)form.addEventListener('submit',function(e){e.preventDefault();var f=e.target;
    if(!f.name.value.trim()||!f.message.value.trim()){(f.name.value.trim()?f.message:f.name).focus();return}
    var msg='Hi Quadri, I\'m '+f.name.value.trim()+(f.email.value.trim()?' ('+f.email.value.trim()+')':'')+'.\n'+(f.subject.value.trim()?'\nSubject: '+f.subject.value.trim()+'\n':'')+'\n'+f.message.value.trim();
    window.open('https://wa.me/2349074318065?text='+encodeURIComponent(msg),'_blank');
  });
  if($('yr'))$('yr').textContent=new Date().getFullYear();
})();
