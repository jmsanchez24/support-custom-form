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


function loadDeptFlow(currentTabOptionChecked){
  if(currentTabOptionChecked == "is_prod"){

    $(".active").removeClass("active");

    $('#FormUpdate').load('flows/prod-custom-flow.html', function() {
      $(".prod-flow .tab").first().addClass("active");
    });

  }else if(currentTabOptionChecked == "is_support"){

    $(".active").removeClass("active");

    $('#FormUpdate').load('flows/support-custom-flow.html', function() {
      $(".support-flow .tab").first().addClass("active");
      if(!$(".active").hasClass("last-tab")){
        $('#nextBtn').show();
        $('#prevBtn').show();
      }else{
        $('#nextBtn').hide();
      }
    });

  }else if(currentTabOptionChecked == "is_ms"){

    $(".active").removeClass("active");

    $('#FormUpdate').load('flows/ms-custom-flow.html', function() {
      $(".ms-flow .tab").first().addClass("active");

    });

    }

 
    
}

function nextslide() {

  var currentTabOptionChecked = $('.active input[name=customProjMenu]:checked').val();
  var nextTab = $(".active").next();

  if($(".active").hasClass("custom-menu")){

    console.log("menu option picked");
    loadDeptFlow(currentTabOptionChecked);
    
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
  var currentTabOptionChecked = $(".active input[type=radio]:checked").val();

  if($(".active").hasClass("support-number-sites")){

    var siteNumber= $(".active input[type=number]").val();
    
    if(siteNumber < 1){
      if( !$(".active p").hasClass("invalid")){
        $(".active p").append("<span class='invalid-message'>Please make a selection</span>");
        $(".active p").addClass("invalid");
        return false;
      }
    }else{
      $(".active p").removeClass("invalid");
      $(".invalid-message").remove();
      return true;
    }

  }else if(!currentTabOptionChecked){

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

function supportMenu(menuOption){

  const menuOptionList = [
    ["CustomTetmpBuild",750],
    ["dlrLocPage", 750],
    ["homepageSupUpdate", 1000],
    ["headerRedev", 625],
    ["footerRedev", 250],
    ["sqzPage", 500],
    ["customNav", 500],
    ["customPageBlock", 500]
    ];

  for(var i = 0; i < menuOptionList.length; i++) {

    if(menuOptionList[i].includes(menuOption)){

      return menuOptionList[i][1];

    }

}


}

}(jQuery));


