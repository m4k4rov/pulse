/*  tabs & item change */
const catalogTab=document.querySelectorAll('.catalog__tab'),
      catalogContent=document.querySelectorAll('.catalog__content'),
      catalogItemLink=document.querySelectorAll('.catalog-item__link'),
      catalogItemBack=document.querySelectorAll('.catalog-item__back');

catalogTab.forEach((item, index) => {
    item.addEventListener('click',() => {
        catalogTab.forEach(it => it.classList.remove('catalog__tab_active'));
        item.classList.add('catalog__tab_active');
        catalogContent.forEach(it => it.classList.remove('catalog__content_active'));
        catalogContent[index].classList.add('catalog__content_active');
    });
})

catalogItemLink.forEach(item => {
    item.addEventListener('click', catalogItemChange);
})

catalogItemBack.forEach(item => {
    item.addEventListener('click', catalogItemChange);
})

function catalogItemChange(e) {
    e.preventDefault();
    e.target.parentNode.parentNode.childNodes[1].classList.toggle('catalog-item__content_active');
    e.target.parentNode.parentNode.childNodes[3].classList.toggle('catalog-item__list_active');
};

