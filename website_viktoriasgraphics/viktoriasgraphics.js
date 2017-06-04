//scroll to somewhere
function scrollToThat(identity, duration) {
  $("html, body").animate({
    scrollTop: ($(identity).offset().top)
  },duration);
}

//image slider
$(function() {
  $(".img_container").find("img").first().one("load", function() {
    $(".slider").slider();
  }).each(function() {
    if(this.complete) $(this).load();
  });
});

//nav animation
$(function() {
	var iconLinks = $("#nav").find("a");
  if($(window).width() > 980) {
		iconLinks.on("mouseenter", function() {
      $(this).find(".main_icon").animate({
        "opacity": "0"
      }, 600);
      $(this).find(".icon_hover").animate({
        "opacity": "1"
      }, 400);
    }).on("mouseleave", function() {
      $(this).find(".main_icon").animate({
        "opacity": "1"
      }, 400);
      $(this).find(".icon_hover").animate({
        "opacity": "0"
      }, 600);
    });
	} else {
		return;
	}
});


//portfolio animation
$(function() {
	var typeLinks = $("#portfolio li");
  if($(window).width() > 980) {
		typeLinks.on("mouseenter", function() {
      $(this).find(".port_info").animate({
        "padding": "50px 30px 50px 30px"
      }, 200);
      $(this).find("span").animate({
        "opacity": "1"
      }, 200);
    }).on("mouseleave", function() {
      $(this).find(".port_info").animate({
        "padding": "90px 30px 10px 30px"
      }, 200);
      $(this).find("span").animate({
        "opacity": "0"
      }, 200);
    });
	} else {
		return;
	}
});


function VerifyContactName(){
  if (viktoriasgraphics_wip != "on") {
    return true;
  }
  contactName = $("#contact_name")[0];
  contactnameValue = contactName.value;
  if ( contactnameValue.length < 2 ) { 
    contactName.style.borderColor = 'red';
    contactName.style.borderWidth = '2px';
    contactName.style.borderStyle = 'solid';
    $("#contact_name_error")[0].style.visibility = 'visible';
    return false;
  } else {
    contactName.style.borderColor = ''; 
    $("#contact_name_error")[0].style.visibility = 'hidden';
    contactName.style.borderWidth = ''; 
    contactName.style.borderStyle = '';
    return true;
  }
}

function VerifyEmail(){
  if (viktoriasgraphics_wip != "on") {
    return true;
  }
  contactEmail = $("#contact_email")[0];
  contactemailValue = contactEmail.value;
  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if ( !re.test(contactemailValue) ) { 
    contactEmail.style.borderColor = 'red';
    $("#contact_email_error")[0].style.visibility = 'visible';
    contactEmail.style.borderWidth = '2px';
    contactEmail.style.borderStyle = 'solid';
    return false;
  } else {
    contactEmail.style.borderColor = '';
    $("#contact_email_error")[0].style.visibility = 'hidden';
    contactEmail.style.borderWidth = '';
    contactEmail.style.borderStyle = '';
    return true;
  }
}

function VerifyMessage(){
  if (viktoriasgraphics_wip != "on") {
    return true;
  }
  contactMessage = $("#contact_message")[0];
  contactmessageValue = contactMessage.value;
  if ( contactmessageValue.length < 12 ) {
    contactMessage.style.borderColor = 'red';
    $("#contact_message_error")[0].style.visibility = 'visible';
    contactMessage.style.borderWidth = '2px';
    contactMessage.style.borderStyle = 'solid';
    return false;
  } else if ( contactmessageValue.length > 2000) {
    contactMessage.style.borderColor = 'red';
    $("#contact_message_error")[0].style.visibility = 'visible';
    contactMessage.style.borderWidth = '2px';
    contactMessage.style.borderStyle = 'solid';
    return false;
  } else {
    contactMessage.style.borderColor = '';
    $("#contact_message_error")[0].style.visibility = 'hidden';
    contactMessage.style.borderWidth = '';
    contactMessage.style.borderStyle = '';
    return true;
  }
}

function VerifyCaptcha(){
  if (viktoriasgraphics_wip != "on") {
    return true;
  }
  captchaText = $("#captcha_text")[0];
  captchatextValue = captchaText.value;
  if ( captchatextValue.length != 6 ) {
    captchaText.style.borderColor = 'red';
    $("#captcha_text_error")[0].style.visibility = 'visible';
    captchaText.style.borderWidth = '2px';
    captchaText.style.borderStyle = 'solid';
    return false;
  } else {
    captchaText.style.borderColor = '';
    $("#captcha_text_error")[0].style.visibility = 'hidden';
    captchaText.style.borderWidth = '';
    captchaText.style.borderStyle = '';
    return true;
  }
}

function VerifyDPCheckbox(){
  if (viktoriasgraphics_wip != "on") {
    return true;
  }
  checkBox = $("#dp_checkbox")[0];
  if ( checkBox.checked ) {
    checkBox.style.borderColor = '';
    $("#dp_checkbox_text_error")[0].style.visibility = 'hidden';
    checkBox.style.borderWidth = '';
    checkBox.style.borderStyle = '';
    return true;
  } else {
    checkBox.style.borderColor = 'red';
    $("#dp_checkbox_text_error")[0].style.visibility = 'visible';
    checkBox.style.borderWidth = '2px';
    checkBox.style.borderStyle = 'solid';
    return false;
  }
}

// send email
function ContactEmail(){
  // get the values
  contactnameValue = $("#contact_name")[0].value;
  contactemailValue = $("#contact_email")[0].value;
  contactmessageValue = $("#contact_message")[0].value;
  captchatextValue = $("#captcha_text")[0].value;
  
  // force verify content of fields
  viktoriasgraphics_wip = "on";

  // name
  name_ok = VerifyContactName(contactnameValue);
  
  // email
  email_ok = VerifyEmail();

  // message
  msg_ok = VerifyMessage();

  // captcha
  captcha_ok = VerifyCaptcha();
  
  dp_checkbox_ok = VerifyDPCheckbox();

  if ( name_ok && email_ok && msg_ok & captcha_ok && dp_checkbox_ok ) {
    // send request
    $.post("contact_email.php",
     {
       contact_name: contactnameValue,
       contact_email: contactemailValue,
       contact_message: contactmessageValue,
       captcha_text: captchatextValue
     },
     function(result) {
       captchaText = $("#captcha_text")[0];
       textError = $("#email_error_message")[0];
       if (result == 'captcha_failed') {
         captchaText.style.borderColor = 'red';
         $("#captcha_text_error")[0].style.visibility = 'visible';
         captchaText.style.borderWidth = '2px';
         captchaText.style.borderStyle = 'solid';
       } else if (result == 'email_failed') {
         textError.innerText="Could not send email. Please try again later.";
         textError.style.display = 'block';
         $("html, body").animate({ scrollTop: ($("#email_error_message").offset().top) },800);
       } else if (result == 'email_sent') {
         contactform = $("#contact_form");
         messageSent = $("#sent_message_container");
         contactform.css("display", "none");
         messageSent.css("display", "block");
         textError.innerText="";
         textError.style.display = 'none';
       } else {
         textError.innerText="Could not contact server. Please try again later.";
         textError.style.backgroundColor = '#e60000';
         $("html, body").animate({ scrollTop: ($("#email_error_message").offset().top) },800);
       }
     }
    );
  } else {
    return false;
  }
}

function resetForm() {
  contactform[0].reset();
  contactform.css("display", "block");
  messageSent.css("display", "none");
}

function ReloadCaptcha() {
  $("#captcha_image")[0].src = "contact_email.php?t=" + new Date().getTime();
}

var viktoriasgraphics_wip = "off";

function wip() {
  viktoriasgraphics_wip = "on";
}

function cookies() {
  $("#cookie_span").toggle(500);
  $("html, body").animate({
    scrollTop: ($("#copyright").offset().top)
  },500);
}

function DataPrivacy() {
  $("#dp_span").toggle(500);
  $("html, body").animate({
    scrollTop: ($("#copyright").offset().top)
  },500);
}