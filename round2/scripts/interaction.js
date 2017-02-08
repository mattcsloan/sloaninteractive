$(document).ready(function() {
  //find querystring value and scroll to element
  var viewSection = get_urid('view');
  if($('a[name="' + viewSection + '"]').length) {
    var elem = $('a[name="' + viewSection + '"]');
    scrollToDiv(elem);
  }

  $('.navigation').addClass('transition');

  var messageDisplay = get_urid('message');
  if(messageDisplay) {
    if(messageDisplay === 'success') {
      var message = "Thank you! Your message has been submitted successfully, and we'll be in touch shortly!";
    } else if(messageDisplay === 'error') {
      var message = "An error occurred. Please fill out all fields and try again, or send us an email.";
    }

    if(message) {
      $('.message-bar .wrapper').append(message);
    }

    $('.message-bar').slideDown(300);
    setTimeout(function() {
      $('.message-bar').slideUp(300);
    }, 9000);
  }
});

$(document).on('click', '.message-bar a', function() {
  $('.message-bar').slideUp(300);
});

$(document).on('submit', '#contact-form', function() {
  var formIsValid = true;
  $('input[type="text"], textarea', this).each(function() {
    if($(this).val() === '' && !$(this).hasClass('website')) { // website input is a honeypot input to preent spam
      $(this).addClass('error');
      $('.validation-message').show();
      formIsValid = false;
    }
  });
  if(formIsValid === false || $('input#website').val().length != 0) {
    return false;
  } else {
    return true;
  }
});

$('input[type="text"], textarea').blur(function() {
  var formIsValid = false;
  $('input[type="text"], textarea', '#contact-form').each(function() {
    if($(this).val() === '' && !$(this).hasClass('website')) { // website input is a honeypot input to preent spam
      $(this).addClass('error');
      formIsValid = false;
      $('.validation-message').show();
    } else {
      $(this).removeClass('error');
      formIsValid = true;
      $('.validation-message').hide();
    }
  });
});

// check any link starting with # and scroll page to that anchor
$(document).on('click', 'a[href^="#"]', function() {
  if($(this).attr('href') === "#") {
    var target = '';
    var elem = $('body');
  } else {
    var target = $(this).attr('href').split('#')[1];
    var elem = $('a[name="' + target + '"]');
  }
  scrollToDiv(elem);

  if($(this).parent().hasClass('navigation')) {
    $('.navigation .active').removeClass('active');
    $(this).addClass('active');
  }

  if($(this).attr('data-check')) {
    var itemNumber = $(this).attr('data-check');
    $('.checkbox-list li').each(function(index) {
      if(parseInt(itemNumber) - 1 === index) {
        $('input', this).prop('checked', true);
      } else {
        $('input', this).prop('checked', false);
      }
    });
  }
  return false;
});

// Scroll Throttle Initialization
var rtime = new Date(1, 1, 2000, 12,00,00);
var timeout = false;
var delta = 100; // throttle timing

$(window).on('scroll', function () {
  rtime = new Date();
  if (timeout === false) {
    timeout = true;
    setTimeout(scrollEnd, delta);
  } 


});

function scrollEnd() {
  if (new Date() - rtime < delta) {
    setTimeout(scrollEnd, delta);
  } 
  else {
    timeout = false;
    var windowScroll = $(this).scrollTop();

    // var sectionMap = [{
    //   "sectionIndex": 0,
    //   "section": "top",
    //   "position": 0
    // }];

    // $('.navigation a').each(function(index) {
    //   var sectionName = $(this).attr('href').split('#')[1];
    //   var sectionPos = $('a[name="' + sectionName + '"]').next().offset();
    //   var sectionTop = sectionPos.top;
    //   sectionMap.push({
    //     "sectionIndex": index + 1,
    //     "section": sectionName,
    //     "position": sectionTop
    //   });
    // });

    // for(i=0;i<sectionMap.length;i++) {
    //   var currentSectionThreshold = Math.ceil(sectionMap[i].position - $('.header').height());
    //   if(currentSectionThreshold < 0) { 
    //     currentSectionThreshold = 0;
    //   }

    //   if(i === sectionMap.length - 1) { //is last section
    //     var nextSectionThreshold = null;
    //   } else {
    //     var nextSectionThreshold = Math.floor(sectionMap[i + 1].position - $('.header').height());
    //   }


    //   if((nextSectionThreshold && (windowScroll >= currentSectionThreshold && windowScroll < nextSectionThreshold)) || !nextSectionThreshold && windowScroll >= currentSectionThreshold) {
    //     $('.navigation .active').removeClass('active');
    //     $('.navigation a:nth-child(' + sectionMap[i].sectionIndex + ')').addClass('active');
    //     break;
    //   }
    // }

    if (windowScroll >= $('.header').height()) {
      $('body').addClass('scrolled');
    } else {
      $('body').removeClass('scrolled');
    }
  }
}

function scrollToDiv(element) {
  var offset = element.offset();
  if($('body').hasClass('scrolled')) {
    var offsetTop = offset.top - 50;
  } else {
    var offsetTop = offset.top - 82;
  }
  $('body, html').animate({
    scrollTop: offsetTop
  }, 500);
}

function get_urid(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if (results == null)
  return "";
  else
  return results[1];
}
