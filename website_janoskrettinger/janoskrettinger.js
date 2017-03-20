$(function () {
  var workHeader = $(".work_header");
  var workContent = $(".work_content");
  var showArrow = $(".show_arrow");
  var hideArrow = $(".hide_arrow");
  workHeader.not(":first").hover(function() {
    $(this).css("cursor","pointer");
  });
  workContent.not(":first").hide();
  workHeader.not(":first").on("click", function() {
    $(this).next().stop(true,true).toggle(600);
    var t = $(this);
    var tDes = t.next();
    var timer = function() {
      if(!tDes.is(":visible")) {
        t.find(showArrow).css("display","block");
        t.find(hideArrow).css("display","none");
      } else {
        t.find(showArrow).css("display","none");
        t.find(hideArrow).css("display","block");
      }
    };
    setTimeout(timer, 610);
  });
});

function scrollToThat(identity, duration) {
  $("html, body").animate({
    scrollTop: ($(identity).offset().top)
  },duration);
}

function VerifyContactName(){
  if (krettingerjanos_wip != "on") {
    return true;
  }
  contactname = $("#contact_name")[0].value;
  if ( contactname.length < 2 ) { 
    $("#contact_name")[0].style.borderColor = '#ff6600';
    $("#contact_name")[0].style.borderWidth = '3px';
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
  if (krettingerjanos_wip != "on") {
    return true;
  }
  contactemail = $("#contact_email")[0].value;
  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if ( !re.test(contactemail) ) { 
    $("#contact_email")[0].style.borderColor = '#ff6600';
    $("#contact_email_error")[0].style.visibility = 'visible';
    $("#contact_email")[0].style.borderWidth = '3px';
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
  if (krettingerjanos_wip != "on") {
    return true;
  }
  contactmessage = $("#contact_message")[0].value;
  if ( contactmessage.length < 12 ) {
    $("#contact_message")[0].style.borderColor = '#ff6600';
    $("#contact_message_error")[0].style.visibility = 'visible';
    $("#contact_message")[0].style.borderWidth = '3px';
    $("#contact_message")[0].style.borderStyle = 'solid';
    return false;
  } else if ( contactmessage.length > 2000) {
    $("#contact_message")[0].style.borderColor = '#ff6600';
    $("#contact_message_error")[0].style.visibility = 'visible';
    $("#contact_message")[0].style.borderWidth = '3px';
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
  if (krettingerjanos_wip != "on") {
    return true;
  }
  captchatext = $("#captcha_text")[0].value;
  if ( captchatext.length != 6 ) {
    $("#captcha_text")[0].style.borderColor = '#ff6600';
    $("#captcha_text_error")[0].style.visibility = 'visible';
    $("#captcha_text")[0].style.borderWidth = '3px';
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
  if (krettingerjanos_wip != "on") {
    return true;
  }
  if ( $("#dp_checkbox")[0].checked ) {
    $("#dp_checkbox")[0].style.borderColor = '';
    $("#dp_checkbox_text_error")[0].style.visibility = 'hidden';
    $("#dp_checkbox")[0].style.borderWidth = '';
    $("#dp_checkbox")[0].style.borderStyle = '';
    return true;
  } else {
    $("#dp_checkbox")[0].style.borderColor = '#ff6600';
    $("#dp_checkbox_text_error")[0].style.visibility = 'visible';
    $("#dp_checkbox")[0].style.borderWidth = '3px';
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
  krettingerjanos_wip = "on";

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
               $("#captcha_text")[0].style.borderColor = '#ff6600';
               $("#captcha_text_error")[0].style.visibility = 'visible';
               $("#captcha_text")[0].style.borderWidth = '3px';
               $("#captcha_text")[0].style.borderStyle = 'solid';
             } else if (result == 'email_failed') {
               $("#email_error_message")[0].innerText="Could not send email. Please try again later.";
               $("#email_error_message")[0].style.display = 'block';
               $("html, body").animate({ scrollTop: ($("#email_error_message").offset().top) },800);
             } else if (result == 'email_failed_all') {
               $("#email_error_message")[0].innerText="Could not send email. Please try again later.";
               $("#email_error_message")[0].style.display = 'block';
               $("html, body").animate({ scrollTop: ($("#email_error_message").offset().top) },800);
             } else if (result == 'email_sent_sf') {
               $("#email_error_message")[0].innerText="Your message was send, but a confirmation message to your email address has failed. It's likely you have a typo in your email or you entered wrong email address. Please verify and try again, otherwise I might not be able to contact you.";
               $("#email_error_message")[0].style.display = 'block';
               $("html, body").animate({ scrollTop: ($("#email_error_message").offset().top) },800);
             } else if (result == 'email_sent') {
               formInput = $(".form_input");
               formInput.prop("disabled", true);
               formInput.css("background-color","transparent");
               formInput.css("box-shadow","none");
               formInput.css("border","3px solid #5a839e");
               formInput.css("color","#efefef");
               $("#contact_box2").slideUp(600);
               $("#contact_button").slideUp(400);
               $("#sent_message_container").slideDown(300);
               $("#new_message_button").slideDown(500);
               $("#email_error_message")[0].innerText="";
               $("#email_error_message")[0].style.display = 'none';
             } else {
               $("#email_error_message")[0].innerText="Could not contact server. Please try again later.";
               $("html, body").animate({ scrollTop: ($("#email_error_message").offset().top) },800);
             }
           }
           );
  } else {
    return false;
  }
}

function ReloadCaptcha() {
  $("#captcha_image")[0].src = "contact_email.php?t=" + new Date().getTime();
}

var krettingerjanos_wip = "off";

function wip() {
  krettingerjanos_wip = "on";
}

$(document).ready(function () {
    $(".hidden").hide().removeClass("hidden");
});
var resetForm = function() {
  var formInput = $(".form_input");
  var contactform = $("#contact_form");
  var contactError = $(".contact_error_text");
  contactform[0].reset();
  formInput.prop("disabled", false);
  formInput.css("background-color","#e4e4e4");
  formInput.css("border","3px solid #395e7f");
  formInput.css("box-shadow","0 2px 3px rgba(0,0,0,0.2) inset");
  formInput.css("color","#000");
  contactError.css("visibility","hidden");
  $("#contact_box2").slideDown(300);
  $("#contact_button").slideDown(500);
  $("#sent_message_container").slideUp(600);
  $("#new_message_button").slideUp(400);
  ReloadCaptcha();
}

function showcontactForm() {
  var contactform = $("#contact_form");
  contactform.toggle(800);
  scrollToThat(contactform,800);
  setTimeout(resetForm,500);
}

function gocontactForm() {
  var contactform = $("#contact_form");
  contactform.show(800);
  scrollToThat(contactform,800);
  setTimeout(resetForm,500);
}

function DataPrivacy() {
  $("#dp_span").toggle(500);
}