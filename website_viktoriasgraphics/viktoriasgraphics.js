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
  contactname = $("#contact_name")[0].value;
  if ( contactname.length < 2 ) { 
    $("#contact_name")[0].style.borderColor = 'red';
    $("#contact_name")[0].style.borderWidth = '2px';
    $("#contact_name")[0].style.borderStyle = 'solid';
    $("#contact_name_error")[0].style.visibility = 'visible';
    return false;
  } else {
    $("#contact_name")[0].style.borderColor = ''; 
    $("#contact_name_error")[0].style.visibility = 'hidden';
    $("#contact_name")[0].style.borderWidth = ''; 
    $("#contact_name")[0].style.borderStyle = '';
    return true;
  }
}

function VerifyEmail(){
  if (viktoriasgraphics_wip != "on") {
    return true;
  }
  contactemail = $("#contact_email")[0].value;
  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if ( !re.test(contactemail) ) { 
    $("#contact_email")[0].style.borderColor = 'red';
    $("#contact_email_error")[0].style.visibility = 'visible';
    $("#contact_email")[0].style.borderWidth = '2px';
    $("#contact_email")[0].style.borderStyle = 'solid';
    return false;
  } else {
    $("#contact_email")[0].style.borderColor = '';
    $("#contact_email_error")[0].style.visibility = 'hidden';
    $("#contact_email")[0].style.borderWidth = '';
    $("#contact_email")[0].style.borderStyle = '';
    return true;
  }
}

function VerifyMessage(){
  if (viktoriasgraphics_wip != "on") {
    return true;
  }
  contactmessage = $("#contact_message")[0].value;
  if ( contactmessage.length < 12 ) {
    $("#contact_message")[0].style.borderColor = 'red';
    $("#contact_message_error")[0].style.visibility = 'visible';
    $("#contact_message")[0].style.borderWidth = '2px';
    $("#contact_message")[0].style.borderStyle = 'solid';
    return false;
  } else if ( contactmessage.length > 2000) {
    $("#contact_message")[0].style.borderColor = 'red';
    $("#contact_message_error")[0].style.visibility = 'visible';
    $("#contact_message")[0].style.borderWidth = '2px';
    $("#contact_message")[0].style.borderStyle = 'solid';
    return false;
  } else {
    $("#contact_message")[0].style.borderColor = '';
    $("#contact_message_error")[0].style.visibility = 'hidden';
    $("#contact_message")[0].style.borderWidth = '';
    $("#contact_message")[0].style.borderStyle = '';
    return true;
  }
}

function VerifyCaptcha(){
  if (viktoriasgraphics_wip != "on") {
    return true;
  }
  captchatext = $("#captcha_text")[0].value;
  if ( captchatext.length != 6 ) {
    $("#captcha_text")[0].style.borderColor = 'red';
    $("#captcha_text_error")[0].style.visibility = 'visible';
    $("#captcha_text")[0].style.borderWidth = '2px';
    $("#captcha_text")[0].style.borderStyle = 'solid';
    return false;
  } else {
    $("#captcha_text")[0].style.borderColor = '';
    $("#captcha_text_error")[0].style.visibility = 'hidden';
    $("#captcha_text")[0].style.borderWidth = '';
    $("#captcha_text")[0].style.borderStyle = '';
    return true;
  }
}

function VerifyDPCheckbox(){
  if (viktoriasgraphics_wip != "on") {
    return true;
  }
  if ( $("#dp_checkbox")[0].checked ) {
    $("#dp_checkbox")[0].style.borderColor = '';
    $("#dp_checkbox_text_error")[0].style.visibility = 'hidden';
    $("#dp_checkbox")[0].style.borderWidth = '';
    $("#dp_checkbox")[0].style.borderStyle = '';
    return true;
  } else {
    $("#dp_checkbox")[0].style.borderColor = 'red';
    $("#dp_checkbox_text_error")[0].style.visibility = 'visible';
    $("#dp_checkbox")[0].style.borderWidth = '2px';
    $("#dp_checkbox")[0].style.borderStyle = 'solid';
    return false;
  }
}

// send email
function ContactEmail(){
  // get the values
  contactname = $("#contact_name")[0].value;
  contactemail = $("#contact_email")[0].value;
  contactmessage = $("#contact_message")[0].value;
  captchatext = $("#captcha_text")[0].value;
  
  // force verify content of fields
  viktoriasgraphics_wip = "on";

  // name
  name_ok = VerifyContactName(contactname);
  
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
       contact_name: contactname,
       contact_email: contactemail,
       contact_message: contactmessage,
       captcha_text: captchatext
     },
     function(result) {
       if (result == 'captcha_failed') {
         $("#captcha_text")[0].style.borderColor = 'red';
         $("#captcha_text_error")[0].style.visibility = 'visible';
         $("#captcha_text")[0].style.borderWidth = '2px';
         $("#captcha_text")[0].style.borderStyle = 'solid';
       } else if (result == 'email_failed') {
         $("#email_error_message")[0].innerText="Could not send email. Please try again later.";
         $("#email_error_message")[0].style.display = 'block';
         $("html, body").animate({ scrollTop: ($("#email_error_message").offset().top) },800);
       } else if (result == 'email_sent') {
         contactform = $("#contact_form");
         messageSent = $("#sent_message_container");
         contactform.css("display", "none");
         messageSent.css("display", "block");
         $("#email_error_message")[0].innerText="";
         $("#email_error_message")[0].style.display = 'none';
       } else {
         $("#email_error_message")[0].innerText="Could not contact server. Please try again later.";
         $("#email_error_message")[0].style.backgroundColor = '#e60000';
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