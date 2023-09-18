$(document).ready(function() {

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
    updateActiveSection();
  });

  $(".header ul li a").click(function(e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0
        },
        500
      );
    } else {
      var offset = $(target).offset().top - 40;

      $("html, body").animate(
        {
          scrollTop: offset
        },
        500
      );
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom"
  });

  const scriptURL = 'https://script.google.com/macros/s/AKfycbwLSg1M_UNufts9c6TKDMts6Orym3gOKDyP8ULW3FpAS0hJ8tS9LL6DpvqIAszMafXR/exec';
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({
            NAME: form.NAME.value,
            EMAIL: form.EMAIL.value,
            SUBJECT: form.SUBJECT.value,
            MESSAGE: form.MESSAGE.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.text())
    .then(data => {
        msg.innerHTML = data;
        setTimeout(function() {
            msg.innerHTML = "";
        }, 5000);
        form.reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
        msg.innerHTML = "Message Sent";
    });
  });

  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();

    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }

    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();

      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }
});
