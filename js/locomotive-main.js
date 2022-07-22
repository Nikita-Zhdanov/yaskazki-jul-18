
gsap.registerPlugin(ScrollTrigger);
const mediaQuery = window.matchMedia('(min-width: 992px)');
const scrollWrapper = document.querySelector('.scroll-wrapper');
const scrollView = document.querySelector('.scroll-view');
if (mediaQuery.matches && !window.disableScroll && scrollWrapper) {
  initLocomotiveScroll();
}
mediaQuery.addListener(() => window.location.reload());

function initLocomotiveScroll() {
  window.addEventListener('scroll', e => {
    console.log('scroll wrapper scroll', window.scrollY);
  });
  const locomotiveScroll = new LocomotiveScroll({
      el: scrollWrapper,
      smooth: true,
      lerp: is_touch_enabled() ? 0.054 : 0.1,
      touchMultiplier: 6.4, tablet: { smooth: true, },
      smartphone: { smooth: true, },
  });
  if (is_touch_enabled() && scrollView) {
      locomotiveScroll.on('scroll', args => window.scrollTo(0, args.scroll.y));
      scrollView.classList.add('-touchable');
  } else {
      console.log('touch event not found');
  }
  const onResizeContent = () => {
      console.log('RESIZE');
      locomotiveScroll.update();
      if (is_touch_enabled()) {
          document.body.style.height = locomotiveScroll.el.offsetHeight + 'px';
      }
  };
  new ResizeSensor(scrollWrapper, onResizeContent);
  setTimeout(() => onResizeContent, 300);
  locomotiveScroll.on("scroll", ScrollTrigger.update);
  window.addEventListener('load', onResizeContent);
  ScrollTrigger.scrollerProxy(scrollWrapper, {
      scrollTop(value) {
          return arguments.length ? locomotiveScroll.scrollTo(value, 0, 0) : locomotiveScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
          return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      pinType: scrollWrapper.style.transform ? "transform" : "fixed"
  });

  function is_touch_enabled() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }
  window.destroyLocomotiveScroll = function() {
    if (locomotiveScroll) {
      locomotiveScroll.destroy();
      scrollView.classList.remove('-touchable');
    }
  }




  let startVideoArc = true;
  let videoArc = document.querySelector('.main-3s__sticky-video');
  locomotiveScroll.on('scroll', (args) => {
      if(typeof args.currentElements['triggerSection'] === 'object') {
          let progress = args.currentElements['triggerSection'].progress;
          if (progress >= 0.9) {
              videoArc.style.opacity = "0";
              startVideoArc = false;
          } else if (progress <= 0.1){
              videoArc.style.opacity = "0";
              startVideoArc = false;
          } else if (progress > 0.1 && progress < 0.9) {
              videoArc.style.opacity = "1";
              startVideoArc = true;
          }
      }
  });






}

window.addEventListener('load', ()=>{
  const imagesWithLazyLoad = [...document.querySelectorAll("[loading='auto'], [loading='lazy']")];
  imagesWithLazyLoad.forEach(el=>{
    el.setAttribute('loading', 'eager')
  })
})
