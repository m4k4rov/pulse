/*  tabs & item change */
/* const catalogTab=document.querySelectorAll('.catalog__tab'),
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
}; */

/* modal */
/* const modalElem=document.querySelectorAll('[data-modal]'),
      overlay=document.querySelector('.overlay'),
      modalClose=document.querySelectorAll('.modal__close');

modalElem.forEach(item=>{
    item.addEventListener('click',(e)=>{
        overlay.style='visibility: visible; opacity: 1';
        document.getElementById(e.target.dataset.modal).style.display="block";
        if (e.target.dataset.modal=='order') {
            document.getElementById('order').querySelector('.modal__descr').textContent=e.target.parentNode.parentNode.querySelector('.catalog-item__subtitle').textContent;
        }
    })
})
modalClose.forEach(item=>{
    item.addEventListener('click',()=>{
        overlay.style='visibility: hidden; opacity: 0';
        document.querySelectorAll('.modal').forEach(item=>item.style.display="none");
    })
})  */

$(document).ready(function(){
    // Tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    //change catalog-item content
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    //validate
    let options={
        rules: {
            name: {
                required: true,
                minlength:2
            },
            phone: "required",
            email: {
                required: true,
                email:true
            }
        },
        messages: {
            name:{
                required: "Пожалуйста, введите своё имя",
                minlength: jQuery.validator.format("Введите не менее {0} символов")
            },
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
                required: "Пожалуйста, введите свою почту",
                email: "Неправильно введён адрес почты"
            }
        }
    };
    $('#consul-form').validate(options);
    $('#consultation form').validate(options);
    $('#order form').validate(options);

    // Mask
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //send mail
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url:"mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");


            $('form').trigger('reset');
        });
        return false;
    });

/*     const form = document.querySelectorAll("form");
    form.forEach(item=>{
        item.addEventListener('submit', function(ev) {
            ev.preventDefault();
            let formData = new FormData(item);
            let request = new XMLHttpRequest();
            request.open("POST", "mailer/smart.php");
            request.onload = function () {
                console.log('DONE', request.readyState); // readyState будет равно 4
                item.reset();
            };
            request.send(formData); 
        }, false);
    }); */
});

