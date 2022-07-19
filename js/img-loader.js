// Меняем подгрузку картинок
(()=>{
	window.addEventListener('load', ()=>{
		const imagesWithLazyLoad = [...document.querySelectorAll("[loading='auto'], [loading='lazy']")]
		imagesWithLazyLoad.forEach(el=>{
		  el.setAttribute('loading', 'eager')
		})
	})
})()
