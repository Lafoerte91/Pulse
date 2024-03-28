// $(document).ready(function(){
//   $('.carousel__inner').slick({
//     speed: 1200,
//     prevArrow: '<button type="button" class="slick-prev"><img src="./icons/left.svg"></button>',
//     nextArrow: '<button type="button" class="slick-next"><img src="./icons/right.svg"></button>',
//   });
// });

const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false, 
  nav: false
});

document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
})

document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
})

$(document).ready(function(){
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab--active)', function() {
    $(this)
      .addClass('catalog__tab--active').siblings().removeClass('catalog__tab--active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
  });

  $('.catalog__link').each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog__item-content').eq(i).toggleClass('catalog__item-content--active');
      $('.catalog__list').eq(i).toggleClass('catalog__list--active');
    })
  })

  $('.catalog__back').each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog__item-content').eq(i).toggleClass('catalog__item-content--active');
      $('.catalog__list').eq(i).toggleClass('catalog__list--active');
    })
  })

  // Modal
  $('[data-modal="consultation"]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  })
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  })
  $('.button__catalog').each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('#order').fadeIn('slow');
      $('.overlay').fadeIn('slow');
    })
  })
  $('.button__catalog').each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('#order .modal__descr').text($('.catalog__subtitle').eq(i).text());
    })
  })

  // Validation
  function valideForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа!")
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты"
        }
      }
  });
  }

  valideForms('#consultation form')
  valideForms('#consultation-form')
  valideForms('#order form')

  // Mask
  $('input[name=phone]').mask("+7 (999) 999-9999")

  // Ajax
  $('form').submit(function(e) {
    e.preventDefault();
    if(!$(this).valid()) {
      return;
    }
    $.ajax({
      type: "POST",
      url: "/Pulse/src/mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');
      $('form').trigger('reset');
    })
    return false;
  })

  // Smooth scroll
  $(window).scroll(function() {
    if($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  })

  $('a[href^="#"]').click(function(){ // #1
    let anchor = $(this).attr('href'); // #2
    $('html, body').animate({ // #3
    scrollTop: $(anchor).offset().top // #4
    }, 1500); // #5
  });
})