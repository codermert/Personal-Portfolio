  /*
* ----------------------------------------------------------------------------------------
Author        : Rama Hardian
Template Name : mayaclay - personal html portfolio
Version       : 1.1
* ----------------------------------------------------------------------------------------
*/

$(function() {
    "use strict";
    var Window = $(window);
    var royhero = $(".clayhero-img");
    var testimon = $(".testimonial-section");
    var Brand = $('#the-brand');
    var BodyElement = $('html, body');
    var Header = $('#clay-headermain');
    var popupImage = $(".popup-image");
    var imagezoom = $('.img-popup-btn');
    var videoPopup = $(".video-popup");
    var Piechart = $('.pies');
    var Moreskill = $('.more-skill-per');
    var Word = $('.word');
    var ur = document.location.href;
    var hash = ur.split('#');
    var Forms = $('#contactform');
    Number.prototype.pad = function(size) {
        var sign = Math.abs(this) === -1 ? '-' : '';
        return sign + new Array(size).concat([Math.abs(this)]).join('0').slice(-size);
    }
    // landding zero number init -------
    function paddy(num, padlen, padchar) {
        var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
        var pad = new Array(1 + padlen).join(pad_char);
        return (pad + num).slice(-pad.length);
    }
    // OwlCarousel hero init
    var slider = function() {
        royhero.on('initialized.owl.carousel changed.owl.carousel', function(e) {
            if (!e.namespace) {
                return;
            }
            royhero.find('.item').show();
            royhero.find('.loading-placeholder').hide();
            var carousels = e.relatedTarget;
            $('.counts-wrap').text((carousels.relative(carousels.current()) + 1).pad(2));

        }).owlCarousel({
            items: 1,
            loop: true,
            nav: false,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            lazyLoad: true,
            touchDrag: false,
            slideSpeed: 1500,
            dots: true,
            dotsContainer: '.dots-nav',
            mouseDrag: false,
            autoplay: true,
            autoplayTimeout: 12000,
            autoplayHoverPause: true,
        });
        royhero.on('changed.owl.carousel', function(property) {
            var current = property.item.index;
            var src = $(property.target).find(".owl-item").eq(current).find('.image-hero').attr('data-img');
            $(".mini-hero").css("background", "url(" + src + ") no-repeat");
        });
        royhero.trigger('refresh.owl.carousel');
    }
// OwlCarousel brand init
var carouselclient = function(event) {
        Brand.owlCarousel({
            responsiveClass: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            loop: true,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 2
                },
                680: {
                    items: 3
                },
                960: {
                    items: 3
                }
            }
        });
    }
    // OwlCarousel hero init
var testimoni = function() {
        testimon.on('initialized.owl.carousel changed.owl.carousel', function(e) {
            if (!e.namespace) {
                return;
            }
            testimon.find('.item').show();
            testimon.find('.loading-placeholder').hide();
            var carousels = e.relatedTarget;
        }).owlCarousel({
            autoplay: true,
            autoplayTimeout: 4000,
            loop: true,
            items: 1,
            autoplayHoverPause: true,
            center: true,
            nav: false,
        });
        testimon.trigger('refresh.owl.carousel');
    };
// magnific portfolio init ----------------------
$('.popup-image').magnificPopup({
  type: 'ajax',
  alignTop: true,
  overflowY: 'scroll',
  gallery: {
      enabled: false
  },
  callbacks: {
      open: function () {
          $.magnificPopup.instance.close = function () {
              $('body').removeClass('lock');
              $.magnificPopup.proto.close.call(this);
          }
      }
  }
});
    //-------------contact form init
    var subform = function() {
        Forms.submit(function(e) {
            e.preventDefault();
        }).validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                name: {
                    required: true,
                    minlength: 5
                },
                comment: {
                    required: true
                }
            },
            messages: {
                email: {
                    required: 'Check your email input'
                },
                name: {
                    required: 'Please check your first name input'
                },
                comment: {
                    required: 'Please write something for me'
                },
                mobile: {
                    required: 'Phone number invalid'
                }
            },
            submitHandler: function(form) {
                $.ajax({
                    type: "POST",
                    url: "/mail.php",
                    data: $(form).serialize(),
                    beforeSend: function() {
                        $('input, textarea').attr('readonly', "readonly");
                        $('.tombol-submit').html('SENDDING...');
                    },
                    success: function(msg) {
                        if (msg == 'your message send') {
                            Forms.trigger("reset"); 
                            $('.alert').show(); 
                            $('.tombol-submit').removeAttr('disabled');
                            $('input, textarea').removeAttr('readonly');
                            $('.tombol-submit').html('SUBMIT NOW');
                        } else {
                          $('.alert').hide(); 
                          $('.tombol-submit').removeAttr('disabled');
                          $('input, textarea').removeAttr('readonly');
                          $('.tombol-submit').html('SUBMIT NOW');
                            Forms.trigger("reset");
                        }
                    }
                });
                return false;
            }
        });
    }
    $(document).on("click",".close",function() {
      $('.alert').hide();
   });
    // animated headline init ------------------------
    Word.animatedHeadline({
        animationType: "slide",
        animationDelay: 2500,
        barAnimationDelay: 3800,
        barWaiting: 800,
        lettersDelay: 50,
        typeLettersDelay: 150,
        selectionDuration: 500,
        typeAnimationDelay: 1300,
        revealDuration: 600,
        revealAnimationDelay: 1500
    });
    // fixed header init ----------------------
    var fixi = function() {
        if (Window.scrollTop() > 300) {
            Header.addClass('transparant');
        } else {
            Header.removeClass('transparant');
        }
    };
    // CircularProgressBar init ----------------------
    Piechart.each(function() {
        var $this = $(this);
        var no = $this.attr('data-no');
        new CircularProgressBar('pie-chart-' + no);
    });
    // ProgressBar init ----------------------
    Moreskill.each(function() {
        var $this = $(this);
        var per = $this.attr('data-num');
        $({ animatedValue: 0 }).animate({ animatedValue: per }, {
            duration: 10000,
            step: function() {
                $this.attr('data-num', Math.floor(this.animatedValue) + '%');
                $this.css("width", Math.floor(this.animatedValue) + '%');
            },
            complete: function() {
                $this.attr('data-num', Math.floor(this.animatedValue) + '%');
            }
        });
    });
    // onclick button and link init -------
    $('body').on('click', '[data-type="page-efek"]', function(event) {
        event.preventDefault();
        var url = $(this).attr('href');
        $('body').addClass('page-leave');
        $(".wrap-thelogo").show(0);
        $(".wrap-thelogo > img").addClass('itsload');
        setTimeout(function() {
            $(".wrap-thelogo").hide(0);
            $(".wrap-thelogo > img").removeClass('itsload');
            $('body').removeClass('page-leave');
            $("section[id^='clay-']").hide(0);
            $("section[id='clay-" + url.split('#')[1] + "']").show(0);
            window.location.hash = '#' + url.split('#')[1];
            window.scrollTo(0, 0);
        }, 1500);
    });
    // onclick button and link init -------
    $('body').on('click', '.clay-menu li a[data-type="page-efek"]', function(event) {
        event.preventDefault();
        var url = $(this).attr('href');
        $('body').addClass('page-leave');
        $(".wrap-thelogo").show(0);
        $(".wrap-thelogo > img").addClass('itsload');
        $('.wrap-close').hide();
        $('.wrap-claymenumobile').removeClass('showmenu');
        $('.wrap-claymenumobile').addClass('closemenu');
        $('.menu-mobile-overlay').fadeOut();
        $('.menu-bar').show();
        window.location.replace('#' + url.split('#')[1]);
        setTimeout(function() {
            $(".wrap-thelogo").hide(0);
            $(".wrap-thelogo > img").removeClass('itsload');
            $('body').removeClass('page-leave');
            $("section[id^='clay-']").hide(0);
            $("section[id='clay-" + url.split('#')[1] + "']").show(0);
            window.location.hash = '#' + url.split('#')[1];
            window.scrollTo(0, 0);
        }, 1500);
    });
    // onclick button and link init -------
    $('body').on('click', '.menu-bar', function(e) {
        $('.menu-bar').hide();
        $('.wrap-claymenumobile').show(0);
        $('.wrap-claymenumobile').removeClass('closemenu');
        $('.wrap-claymenumobile').addClass('showmenu');
        $('.menu-mobile-overlay').fadeIn();
        $('.wrap-close').show();
        e.preventDefault();
    })
    // onclick button and link init -------
    $('body').on('click', '.wrap-close', function(e) {
        $('.wrap-close').hide();
        $('.wrap-claymenumobile').removeClass('showmenu');
        $('.wrap-claymenumobile').addClass('closemenu');
        $('.menu-mobile-overlay').fadeOut();
        $('.menu-bar').show();
    });
    Window.on('scroll', function() {
        fixi();
    });
    Window.load(function() {
        $(".wrap-thelogo").show(0);
        $(".wrap-thelogo > img").addClass('itsload');
        setTimeout(function() {
            $('.clay-preloader').addClass('is-hidden');
            if (window.location.hash) {
                $("section[id^='clay-']").hide(0);
                $("section[id='clay-" + hash[1] + "']").show(0);
                $(".wrap-thelogo  >img").removeClass('itsload');
                $(".wrap-thelogo").hide(0);
            } else {
                $(".wrap-thelogo > img").removeClass('itsload');
                $(".wrap-thelogo").hide(0);
                $("section[id^='clay-']").hide(0);
                $("section[id^='clay-herosection']").show(0);
            }
            window.scrollTo(0, 0);
        }, 1500);
    });
    // documennt ready
$(document).ready(function () {
    subform();
    slider();
    carouselclient();
    testimoni();
});
});
