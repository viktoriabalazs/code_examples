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
  contactName = $("#contact_name")[0];
  contactnameValue = contactName.value;
  if ( contactnameValue.length < 2 ) { 
    contactName.style.borderColor = '#ff6600';
    contactName.style.borderWidth = '3px';
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
  if (krettingerjanos_wip != "on") {
    return true;
  }
  contactEmail = $("#contact_email")[0];
  contactemailValue = contactEmail.value;
  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if ( !re.test(contactemailValue) ) { 
    contactEmail.style.borderColor = '#ff6600';
    $("#contact_email_error")[0].style.visibility = 'visible';
    contactEmail.style.borderWidth = '3px';
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
  if (krettingerjanos_wip != "on") {
    return true;
  }
  contactMessage = $("#contact_message")[0];
  contactmessageValue = contactMessage.value;
  if ( contactmessageValue.length < 12 ) {
    contactMessage.style.borderColor = '#ff6600';
    $("#contact_message_error")[0].style.visibility = 'visible';
    contactMessage.style.borderWidth = '3px';
    contactMessage.style.borderStyle = 'solid';
    return false;
  } else if ( contactmessageValue.length > 2000) {
    contactMessage.style.borderColor = '#ff6600';
    $("#contact_message_error")[0].style.visibility = 'visible';
    contactMessage.style.borderWidth = '3px';
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
  if (krettingerjanos_wip != "on") {
    return true;
  }
  captchaText = $("#captcha_text")[0];
  captchatextValue = captchaText.value;
  if ( captchatextValue.length != 6 ) {
    captchaText.style.borderColor = '#ff6600';
    $("#captcha_text_error")[0].style.visibility = 'visible';
    captchaText.style.borderWidth = '3px';
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
  if (krettingerjanos_wip != "on") {
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
    checkBox.style.borderColor = '#ff6600';
    $("#dp_checkbox_text_error")[0].style.visibility = 'visible';
    checkBox.style.borderWidth = '3px';
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
  krettingerjanos_wip = "on";

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
               captchaText.style.borderColor = '#ff6600';
               $("#captcha_text_error")[0].style.visibility = 'visible';
               captchaText.style.borderWidth = '3px';
               captchaText.style.borderStyle = 'solid';
             } else if (result == 'email_failed') {
               textError.innerText="Could not send email. Please try again later.";
               textError.style.display = 'block';
               $("html, body").animate({ scrollTop: ($("#email_error_message").offset().top) },800);
             } else if (result == 'email_failed_all') {
               textError.innerText="Could not send email. Please try again later.";
               textError.style.display = 'block';
               $("html, body").animate({ scrollTop: ($("#email_error_message").offset().top) },800);
             } else if (result == 'email_sent_sf') {
               textError.innerText="Your message was send, but a confirmation message to your email address has failed. It's likely you have a typo in your email or you entered wrong email address. Please verify and try again, otherwise I might not be able to contact you.";
               textError.style.display = 'block';
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
               textError.innerText="";
               textError.style.display = 'none';
             } else {
               textError.innerText="Could not contact server. Please try again later.";
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