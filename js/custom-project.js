(function($) {
jQuery(document).ready(function(){
  $("#formDisplay").load("flows/initial-flow.html");


  $('#prevBtn').click(function(){
      prevslide();
  }); 

  $('#nextBtn').click(function(){
    if(validateOption()){
      nextslide();
    }
    
  }); 
});


function nextslide() {
  var nextTab = $(".active").next();
  var currentTab = $(".active");

  if(!nextTab.hasClass("last-tab")){
    $('#nextBtn').show();
    $('#prevBtn').show();
  }else{
    $('#nextBtn').hide();
  }
  
  $(".active").removeClass("active");
  nextTab.addClass("active");

}

function prevslide() {
  var prevTab = $(".active").prev();
  var currentTab = $(".active");


  if(!prevTab.hasClass("initial-tab")){
    $('#nextBtn').show();
    $('#prevBtn').show();
  }else{
    $('#prevBtn').hide();
  }
  
  $(".active").removeClass("active");
  prevTab.addClass("active");
}

function validateOption(){
  var currentTabOptionChecked = $('.active input[type=radio]:checked').val();

  if(!currentTabOptionChecked){

    if( !$(".active p").hasClass("invalid")){
      $(".active p").append("<span class='invalid-message'>*Please make a selection</span>");
      $(".active p").addClass("invalid");
    }

    return false;
  }else{
    $(".active p").removeClass("invalid");
    $(".invalid-message").remove();
    return true;
  }


}

}(jQuery));
