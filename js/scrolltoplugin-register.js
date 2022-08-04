//scrolltoplugin-register.js

gsap.registerPlugin(ScrollToPlugin)


//locomotive-navigation.js


let anchorArea;
const anchorLinks = ["0", "1", "2"];

anchorLinks.forEach((item, index) => {

    anchorArea = document.querySelectorAll('.img-block__navlink-wrapper')[index];

    anchorArea.addEventListener("click", scrollToEl);
    function scrollToEl() {
        locomotiveScroll.scrollTo(document.querySelectorAll('.page-link')[index], {'duration': 500});
    };
})
