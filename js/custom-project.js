(function($) {
jQuery(document).ready(function(){
  $("#FormUpdate").load("flows/initial-flow.html");


  $(document).on('click', '#prevBtn', function(){
    prevslide();
  });

  $(document).on('click', '#nextBtn', function(){
    if(validateOption()){
      nextslide();
    }
  });
});


function nextslide() {

  var currentTabOptionChecked = $('.active input[type=radio]:checked').val();
  var nextTab = $(".active").next();

  $('.active input[type=radio]:checked').prop('checked', false);

  if(currentTabOptionChecked == "is_prod"){

    $(".active").removeClass("active");
    $("#FormUpdate").load("flows/prod-custom-flow.html");
    $(".prod-flow .initial-tab").addClass("active");

  }else{

    if(!nextTab.hasClass("last-tab")){
      $('#nextBtn').show();
      $('#prevBtn').show();
    }else{
      $('#nextBtn').hide();
    }
    
    $(".active").removeClass("active");
    nextTab.addClass("active");
  
  }

}

function prevslide() {
  var prevTab = $(".active").prev();

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
      $(".active p").append("<span class='invalid-message'>Please make a selection</span>");
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
