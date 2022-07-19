// Плавный скролл
(()=>{
	const mediaQuery = window.matchMedia('(min-width: 480px)')
	if(mediaQuery.matches && !document.body.dataset.disableSmoothScroll && !onlyNativeScroll()){
	  initLocomotiveScroll();
	}
	mediaQuery.addListener(()=>window.location.reload());
	function initLocomotiveScroll(){
	  const scrollWrapper = document.querySelector('.scroll-wrapper');
	  const scrollView = document.querySelector('.scroll-view');
	  console.log('init smooth scroll')
	  window.addEventListener('scroll', (e)=>{
	    console.log('scroll wrapper scroll', window.scrollY)
	  })
	  const scroll = new LocomotiveScroll({
	    el: scrollWrapper,
	    smooth: true,
	    touchMultiplier: 6.4,
	    tablet: {
	        smooth: true,
	    },
	    smartphone: {
	        smooth: true,
	    },
	    // scrollFromAnywhere:true
	  });
    window.locomotiveScroll = scroll
	  if(is_touch_enabled()){
	    scroll.on('scroll', (args) => window.scrollTo(0,args.scroll.y));
	    scrollView.classList.add('-touchable');
	  } else{
	    console.log('touch event not found')
	  }
    addResizeHandler()
    addLocomotiveGSAPScrollAnimations()
    addScrollTriggerConnect()
    function addLocomotiveGSAPScrollAnimations(){
      const customAnimations = {
        'scale': el => TweenMax.to(el, .3, {
          scale: 1.5
        })
      }
      const activeAnimations = {};
      const animationsNames = Object.keys(customAnimations);
      const elementsWithId = document.querySelectorAll('[data-scroll-id]');
      console.log({elementsWithId})
      const createAnimationForId = (element, animationName) => {
        const tween = customAnimations[animationName](element);
        tween.pause();
        if (!activeAnimations[element]) {
          activeAnimations[element] = {};
        }
        activeAnimations[element][animationName] = tween;
      }
      elementsWithId.forEach(element => {
        const animationsIds = element.dataset.scrollId
          .split(',')
          .map(e => e.trim())
          .filter(id => animationsNames.includes(id));
        animationsIds.forEach(id => createAnimationForId(element, id));
      });
      scroll.on('scroll', (args) => {
        animationsNames.forEach(animationName => {
          if (typeof args.currentElements[animationName] === 'object') {
            const {
              el,
              progress
            } = args.currentElements[animationName];
            const elementAnimations = activeAnimations[el]
            const tween = elementAnimations ? elementAnimations[animationName] : false;
            if (tween) {
              tween.totalProgress(progress);
            }
          }
        })
      })
    }
    function addScrollTriggerConnect(){
      if(!window['gsap'] || !window['ScrollTrigger']){
        return;
      }
      gsap.registerPlugin(ScrollTrigger);
      scroll.on("scroll", () => {
        ScrollTrigger.update()
      });
      ScrollTrigger.scrollerProxy('.scroll-wrapper', {
        scrollTop(value) {
          return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: 'transform'
      });
      ScrollTrigger.addEventListener("refresh", () => scroll.update());
      ScrollTrigger.refresh();
    }
    function addResizeHandler(){
      new ResizeSensor(scrollWrapper, onResizeContent);
      setTimeout(()=>onResizeContent,300)
      window.addEventListener('load', onResizeContent);
    }
    function onResizeContent(){
      scroll.update();
      if(is_touch_enabled()){
        document.body.style.height = scroll.el.offsetHeight + 'px';
      }
    }
	  function is_touch_enabled() {
	        return ( 'ontouchstart' in window ) ||
	               ( navigator.maxTouchPoints > 0 ) ||
	               ( navigator.msMaxTouchPoints > 0 );
	    }
	}
  function onlyNativeScroll(){
      const pages = ['/ru/library','/en/library', '/bio','/stories','/lib']
      const pathname = window.location.pathname.replace(/(.*)\/$/, '$1');
      return pages.some(p=>pathname.startsWith(p));
  }
})()
