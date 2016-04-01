function getAddOnStates(string) {
  var array = string ? string.split('') : null;
  return array;
}

function getHeaderOffset() {
  var headerOffset = $('.details-header-wrapper');
  return headerOffset.length ? headerOffset.offset().top : null;
}

sessionStorage.setItem('testsInstalled', '1000');

$(function () {
  var testList = getAddOnStates(sessionStorage.getItem('testsInstalled'));
  var stickyHeaderTop = getHeaderOffset();

  $(window).scroll(function () {
    if ($(window).scrollTop() > stickyHeaderTop) {
      $('.details-header-wrapper').addClass('sticky');
    } else {
      $('.details-header-wrapper').removeClass('sticky');
    }
  });

  $('[data-trigger=toggle]').click(function () {
    $('[data-response=toggle]').toggleClass('no-display');
  });

  $('[data-trigger=install-addon]').click(function () {
    var w = $(this).width();
    $(this).find('.state-change-inner').removeClass('no-display');
    $(this).find('span').text('Installing Test Pilot...');
    $(this).width(w);
    $('.intro .copter').removeClass('fly-down').addClass('fly-out');
    $('.intro .copter-wrapper').add('.intro h2').addClass('delayed-fade-out');

    setTimeout(function () {
      $('.intro > div').addClass('scale-out');
    }, 1500);

    setTimeout(function () {
      $('.centered-banner').html('<h2 class="emphasis">Test Pilot installed!</h2>')
                           .addClass('quick-pop');
      $('[data-trigger=install-addon]').find('.state-change-inner').addClass('no-display');
      $('#browser-doorhanger .copter').addClass('fly-down');
      $('.button').addClass('quick-pop');
      $('[data-response=install-addon]').toggleClass('no-display');
    }, 4000);
  });

  $('#browser-doorhanger-wrapper:not(.main)').click(function () {
    $(this).remove();
    $('.centered-banner')
    .append('<a href="home.html" class="button large default quick-pop">Let\'s Go</a>');
  });

  $('#home .test-summary').each(function (index) {
    if (testList[index] === '1') {
      $(this).addClass('active');
      $(this).find('.actions').toggleClass('no-display');
    }
  });

  // Enable Flow

  $('[data-trigger=enable]').click(function () {
    $(this).find('.state-change-inner').removeClass('no-display');

    setTimeout(function () {
      $('[data-trigger=enable]')
        .fadeOut(500);
      $('.modal-container').toggleClass('no-display').toggleClass('fade-in');
      $('.onboarding-modal').toggleClass('no-display');
    }, 2000);
  });

  $('[data-hook=settings-button]').click(function () {
    $('.settings-menu').toggleClass('no-display');
  });

  // DISABLE FLOW

  $('[data-hook=disable]').click(function () {
    var that = this;
    $(this).find('.state-change-inner').removeClass('no-display');
    $(this).find('span').html('Disabling...');

    setTimeout(function () {
      $('.quit-thanks-modal, .modal-container').toggleClass('no-display');
      $(that).find('span').html('Disable');
      $('[data-trigger=enable]').fadeIn(500).find('.state-change-inner').toggleClass('no-display');
    }, 2000);
  });

  // FEEDBACK FLOW

  $('[data-hook=feedback]').click(function () {
    $(this).find('.state-change-inner').removeClass('no-display');
    $(this).find('span').html('Loading survey...');
    setTimeout(function () {
      var l = 'https://people.mozilla.org/~jgruen/test-pilot/external-survey.html';
      openInNewTab(l);
    }, 2000);
  });

  // RETIRE FLOW

  $('[data-hook=retire]').click(function () {
    $('.retire-modal, .modal-container, .settings-menu')
      .toggleClass('no-display');
  });

  if ($('#retire').length) {
    setTimeout(function () {
      $('.loading-pill').addClass('fade-out');
    }, 2000);

    setTimeout(function () {
      $('.loading-pill').addClass('no-display');
      $('.copter').add('.modal').removeClass('no-display').addClass('fade-in');
    }, 2500);
  }

  // MODAL CANCEL

  $('[data-hook=cancel-modal]').click(function () {
    $('.modal-container')
      .toggleClass('no-display').toggleClass('fade-in');
    $(this).closest('.modal').toggleClass('no-display');
    if ($(this).closest('.modal').hasClass('onboarding-modal') ||
      $(this).closest('.modal').hasClass('tour-modal') ||
      $(this).closest('.modal').hasClass('quit-thanks-modal')) {
      $('[data-response=enable]').toggleClass('no-display');
    }
  });
});


// Onboarding Tour

$('.tour-next').click(function () {
  var length = $('.tour-content').length - 1;
  var index = $('.tour-content:not(.no-display').index();
  if (index < length) {
    $('.tour-back').removeClass('hidden');
    $('.tour-content').eq(index).addClass('no-display');
    $('.tour-content').eq(index + 1).removeClass('no-display');
  }

  if (index === length - 1) {
    $('.tour-next, .tour-back, .tour-actions .button').toggleClass('no-display');
  }
});

$('.tour-back').click(function () {
  var index = $('.tour-content:not(.no-display').index();
  var nextIndex = index - 1;

  if ($(this).hasClass('hidden')) return;

  $('.tour-content').eq(index).addClass('no-display');
  $('.tour-content').eq(nextIndex).removeClass('no-display');
});

$('[data-hook=start-tour]').click(function () {
  $('.onboarding-modal, .tour-modal').toggleClass('no-display');
});

$('[data-hook = toggle-active-doorhanger]').click(function () {
  $('.doorhanger-experiment').eq(0).toggleClass('active')
  .find('.active-span').toggleClass('no-display');
});

$('[data-hook=toggle-active]').click(function () {
  $('.experiment-summary').eq(0).toggleClass('active')
  .find('.actions').toggleClass('no-display');
});


$('.doorhanger-experiment').click(function () {
  window.location = 'https://people.mozilla.org/~jgruen/test-pilot/activity-stream.html';
});

var stars = 0;
$('.not-selected').hover(function(){
  stars = $(this).index();
  setStars(stars);
}, function() {
  $('.not-selected').removeClass('rated');
});

function setStars(index) {
  console.log(index);
  for(var i = 0; i <= index; i++) {
    $('.not-selected:eq(' + i + ')').addClass('rated');
  }
}

$('.star').click(function() {
  $('.star').each(function(){
    $(this).addClass('selected').removeClass('not-selected').addClass('quick-pop');
  })
  $('#ratings-scale').addClass('delayed-fade-out').find('p').text('Thank You!');
});

$('#ratings-scale .close').click(function(){
  $('#ratings-scale').addClass('no-display');
});


function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

$('#fpw .modal-container, #fpw .editorial-modal').toggleClass('no-display');

$('[data-hook=show-ratings]').click(function() {
  $('.modal-container').toggleClass('no-display');
  setTimeout(function(){
    $('#ratings-scale').toggleClass('no-display').toggleClass('fly-down');
  }, 400);
});




