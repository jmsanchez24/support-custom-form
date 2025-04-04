(function($) {
  var MenuOptionVal;
  var MenuOptionText;

  function showNextPrevBtn(){
    console.log("showNextPrevBtn");
    console.log(!$(".active").hasClass("last-tab"));
    if(!$(".active").hasClass("last-tab")){
      $('#nextBtn').show();
      $('#prevBtn').show();
    }else{
      $('#nextBtn').hide();
    }

    if($(".active").hasClass("initial-tab")){
      $('#nextBtn').show();
      $('#prevBtn').hide();
    }
    
  }
  
  function loadDeptFlow(currentTabOptionChecked){
    console.log("Dept Function");
    console.log(MenuOptionVal);

    if(currentTabOptionChecked == "is_prod"){
  
      $(".active").removeClass("active");
  
      $('#FormUpdate').load('flows/prod-custom-flow.html', function() {
        $(".prod-flow .tab").first().addClass("active");
        $(".prod-customproject-name").text(MenuOptionText);
        if(MenuOptionText == "Homepage Redevelopment"){
          $(".confluence-prod-link").attr("href", "https://carscommerce.atlassian.net/wiki/spaces/PRODSQUAD/pages/2431911308/Custom+and+Redevelopments+Scope+Work+Production#%F0%9F%8E%AD-How-to%3A-Roles-and-Responsibilities");
        }else{
          $(".confluence-prod-link").attr("href", "https://carscommerce.atlassian.net/wiki/spaces/PRODSQUAD/pages/4599251433/Template+Swaps");
        }
        
        showNextPrevBtn();
      });
  
    }else if(currentTabOptionChecked == "is_support"){
  
      $(".active").removeClass("active");
  
      $('#FormUpdate').load('flows/support-custom-flow.html', function() {
        if(MenuOptionVal == "homeTmpSwapSupport"){
          $(".support-flow .tab.sb-temp-swap").addClass("active");
          $(".sb-tmp-text").text(MenuOptionText);

        }else{
          $(".support-flow .tab.support-number-sites").addClass("active");

        }
        showNextPrevBtn();
      });
  
    }else if(currentTabOptionChecked == "is_ms"){  
  
      $(".active").removeClass("active");
  
      $('#FormUpdate').load('flows/ms-custom-flow.html', function() {
        $(".ms-flow .tab").first().addClass("active");

        $(".ms-customproject-name").text(MenuOptionText);
        
        showNextPrevBtn();
      });
  
      }
  
   
      
  }
  
  function nextslide() {
  
    var nextTab = $(".active").next();

  
    if($(".active").hasClass("custom-menu")){

      var currentTabOptionChecked = $('input[name=customProjMenu]:checked').val();
      MenuOptionVal = $('input[name=customProjMenu]:checked').attr("id");
      MenuOptionText = $('input[name=customProjMenu]:checked + label .custom-project-label').text();

      if(MenuOptionVal == "customProjOther"){
        window.open("https://carscommerce.enterprise.slack.com/archives/C060TH869ME", "_blank");
      }else{
        loadDeptFlow(currentTabOptionChecked);
      }

      
    }else{
  
      //JS for Support specific flow
      if($(".active").parent().hasClass("support-flow")){

        SupportFlow(MenuOptionVal, MenuOptionText);
 
      }
  
      //JS for MS specific flow
      if($(".active").parent().hasClass("ms-flow")){
        MsFlow("next");
      }else{
        $(".active").removeClass("active");
        nextTab.addClass("active");
        showNextPrevBtn();
      }

    }
  
  }
  function SupportFlow(MenuOptionVal, MenuOptionText){

    var getSiteNumber = Number($('#numSites').val());
    var hasGP = $('input[name=gp]:checked').val();

    var SupportTotalPrice = MenuPriceLookUp(MenuOptionVal);

    var needsMockUp = $('input[name=supportMockup]:checked').val();
    var mockUpPrice = 500;

    $(".ProjName").text(MenuOptionText);
    $(".ProjCost").text("$" + SupportTotalPrice);



    if(hasGP == "no_gp" && getSiteNumber != 1){

      var costPerSite = getSiteNumber * 125;
      costPerSite = costPerSite - 125; 

      var siteNumPrice = getSiteNumber * 125;
      SupportTotalPrice = MenuPriceLookUp(MenuOptionVal) + siteNumPrice ;

      $(".NumSites").text(getSiteNumber);
      $(".NumSitesCost").text("$" + costPerSite + " ($125/per additional site)");

    }else{
      $(".NumSites").text(getSiteNumber);
      $(".NumSitesCost").text("0");
    }

    if(needsMockUp == "yes_mu"){
      SupportTotalPrice += mockUpPrice;

      $(".MockupName").text("Yes");
      $(".MockupCost").text("$" + mockUpPrice);

    }else{
      $(".MockupName").text("No");
      $(".MockupCost").text("0");

    }

    $(".supportPrice").text("$" + new Intl.NumberFormat('en-US').format(SupportTotalPrice));
    $(".finalCost").text("$" + new Intl.NumberFormat('en-US').format(SupportTotalPrice));


  }

  function MsFlow(buttonDirection){
    if(buttonDirection == "next"){
      var IsMsTemplate = $('input[name=isMS]:checked').val();
      var isSupportTab = $(".is-support-proj").hasClass("active");

      $(".active").removeClass("active");

      if(IsMsTemplate == "is_ms"){
        $(".ms-description-tab").addClass("active");
      }else{
        if(isSupportTab){
          $("#tmpBuild").prop( "checked", true );
          MenuOptionVal = "tmpBuild";
          MenuOptionText = "Custom Page Template ";

          loadDeptFlow("is_support");
        }else{
          $(".is-support-proj").addClass("active");
        }

      }
    }else{
      $(".initial-flow-start").addClass("active");
    }
    showNextPrevBtn();
  }

  function prevslide() {

    var prevTab = $(".active").prev();
    var isMsFlow = $(".active").parent().hasClass("ms-flow");
    var IsMsTemplate = $('input[name=isMS]:checked').val();

    if($(".active").hasClass("initial-flow-start")){

      $(".active").removeClass("active");
  
      $('#FormUpdate').load('flows/initial-flow.html', function() {
        $(".active").removeClass("active");

        $(".custom-menu").addClass("active");

        showNextPrevBtn();
      });
  
    }else{
      $(".active").removeClass("active");
      if(isMsFlow && IsMsTemplate == "is_ms"){
        MsFlow("prev");
      }else{
        prevTab.addClass("active");
      }
    }


  }
  
  function validateOption(){
    var currentTabOptionChecked = $(".active input[type=radio]:checked").val();
  
    if($(".active").hasClass("support-number-sites")){
  
      var siteNumber= $(".active input[type=number]").val();
      
      if(siteNumber < 1){
        if( !$(".active .mainQuestion").hasClass("invalid")){
          $(".active .mainQuestion").append("<span class='invalid-message'>Please make a selection</span>");
          $(".active .mainQuestion").addClass("invalid");
          return false;
        }
      }else{
        $(".active .mainQuestion").removeClass("invalid");
        $(".invalid-message").remove();
        return true;
      }
  
    }else if(!currentTabOptionChecked){
  
      if( !$(".active .mainQuestion").hasClass("invalid")){
        $(".active .mainQuestion").append("<span class='invalid-message'>Please make a selection</span>");
        $(".active .mainQuestion").addClass("invalid");
        
      }
  
      return false;
    }else{
      $(".active .mainQuestion").removeClass("invalid");
      $(".invalid-message").remove();
      return true;
    }
  
  
  }
  
  function MenuPriceLookUp(menuOption){
  
    const menuOptionList = [
      ["tmpBuild",750],
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

  jQuery(document).ready(function(){
    $("#FormUpdate").load("flows/initial-flow.html");
  
  
    $(document).on('click', '#prevBtn', function(){
      prevslide();
    });
  
    $(document).on('click', '#nextBtn', function(){
      if($(".active").hasClass("validate-form")){
        if(validateOption()){
          nextslide();
        }
      }else{
        nextslide();
      }
    });
  });
  
  
  }(jQuery));