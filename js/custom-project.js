(function($) {
  let MenuOptionVal;
  let MenuOptionText;

  function showNextPrevBtn() {
    const $active = $(".active");

    if ($active.hasClass("last-tab")) {
      $('#nextBtn').hide();
    } else {
      $('#nextBtn').show();
    }

    $('#prevBtn').toggle(!$active.hasClass("initial-tab"));
  }

  function loadDeptFlow(selectedOption) {
    $(".active").removeClass("active");

    const flows = {
      is_prod: 'flows/prod-custom-flow.html',
      is_support: 'flows/support-custom-flow.html',
      is_ms: 'flows/ms-custom-flow.html'
    };

    const flowPath = flows[selectedOption];
    if (!flowPath) return;

    $('#FormUpdate').load(flowPath, function() {
      if (selectedOption === "is_prod") {
        $(".prod-flow .tab").first().addClass("active");
        $(".prod-customproject-name").text(MenuOptionText);

        const url = MenuOptionText === "Homepage Redevelopment"
          ? "https://carscommerce.atlassian.net/wiki/spaces/PRODSQUAD/pages/2431911308/Custom+and+Redevelopments+Scope+Work+Production#%F0%9F%8E%AD-How-to%3A-Roles-and-Responsibilities"
          : "https://carscommerce.atlassian.net/wiki/spaces/PRODSQUAD/pages/4599251433/Template+Swaps";

        $(".confluence-prod-link").attr("href", url);
      }

      if (selectedOption === "is_support") {
        if (MenuOptionVal === "homeTmpSwapSupport") {
          $(".support-flow .tab.sb-temp-swap").addClass("active");
          $(".sb-tmp-text").text(MenuOptionText);
        } else {
          $(".support-flow .tab.support-number-sites").addClass("active");
        }
      }

      if (selectedOption === "is_ms") {
        $(".ms-flow .tab").first().addClass("active");
        $(".ms-customproject-name").text(MenuOptionText);
      }

      showNextPrevBtn();
    });
  }

  function nextslideLogic() {
    const $active = $(".active");
    const nextTab = $active.next();
    const currentFlow = $active.parent().attr('class');

    if (currentFlow === "inital-flow") {
      const $checked = $('input[name=customProjMenu]:checked');
      MenuOptionVal = $checked.attr("id");
      MenuOptionText = $('input[name=customProjMenu]:checked + label .custom-project-label').text();

      if (MenuOptionVal === "customProjOther") {
        window.open("https://carscommerce.enterprise.slack.com/archives/C060TH869ME", "_blank");
      } else {
        loadDeptFlow($checked.val());
      }

    } else if (currentFlow === "support-flow") {
      SupportFlow(MenuOptionVal, MenuOptionText);
      $active.removeClass("active");
      nextTab.addClass("active");
      showNextPrevBtn();

    } else if (currentFlow === "ms-flow") {
      MsFlow("next");
    }
  }

  function SupportFlow(optionVal, optionText) {
    const siteNum = Number($('#numSites').val());
    const hasGP = $('input[name=gp]:checked').val();
    const needsMockUp = $('input[name=supportMockup]:checked').val();

    let total = MenuPriceLookUp(optionVal);

    const projCost = MenuPriceLookUp(optionVal); 

    let extraCost = 0;

    $(".ProjName").text(optionText);

    if (siteNum > 1) {
      extraCost = (siteNum - 1) * 125;
      total += extraCost;

    }

    $(".NumSites").text(siteNum);
    $(".NumSitesCost").text(extraCost ? `$${extraCost} ($125/per additional site)` : "0");

    if (needsMockUp === "yes_mu") {

      total += 500;

      $(".MockupName").text("Yes");
      $(".MockupCost").text("$500");
    } else {
      $(".MockupName").text("No");
      $(".MockupCost").text("0");
    }

    const formattedPrice = new Intl.NumberFormat('en-US').format(total);
    const formattedProjPrice = new Intl.NumberFormat('en-US').format(projCost);

    $(".ProjCost").text(`$${formattedProjPrice}`);
    $(".supportPrice, .finalCost").text(`$${formattedPrice}`);

  }

  function MsFlow(direction) {
    const $active = $(".active");
    const nextTab = $active.next();


      const isMs = $('input[name=isMS]:checked').val() === "is_ms";
      const initialisMS = $('input[name=InitialisMS]:checked').val() === "is_ms";
      const isSupportActive = $(".is-support-proj").hasClass("active");

      $(".active").removeClass("active");

      if (isMs || initialisMS) {
        $(".ms-description-tab").addClass("active");
      } else if (isSupportActive) {
        $("#tmpBuild").prop("checked", true);
        MenuOptionVal = "tmpBuild";
        MenuOptionText = "Custom Page Template ";
        loadDeptFlow("is_support");
      } else{
        $active.removeClass("active");
        nextTab.addClass("active");
      }

    showNextPrevBtn();
  }

  function prevslideLogic() {
    const $active = $(".active");
    const prevTab = $active.prev();
    const isMsFlow = $active.parent().hasClass("ms-flow");
    const isMs = $('input[name=isMS]:checked').val() === "is_ms";
    const InitialisMs = $('input[name=InitialisMS]:checked').val() === "is_ms";


    if ($active.hasClass("initial-flow-start")) {
      $active.removeClass("active");

      $('#FormUpdate').load('flows/initial-flow.html', function() {
        $(".custom-menu").addClass("active");
        showNextPrevBtn();
      });
    } else {
      $active.removeClass("active");

      if (isMsFlow && isMs) {
        console.log("is MS on both question");
        $(".initial-flow-start").addClass("active");
      } else if(isMsFlow && !isMs && InitialisMs){
        console.log("is MS on first question");
        $(".ms-template-question").addClass("active");
      }else {
        prevTab.addClass("active");
      }
    }
    showNextPrevBtn();

  }

  function validateOption() {
    const $active = $(".active");
    const $mainQuestion = $active.find(".mainQuestion");
    const $invalidMsg = $mainQuestion.find(".invalid-message");

    if ($active.hasClass("support-number-sites")) {
      const siteNumber = Number($active.find("input[type=number]").val());

      if (siteNumber < 1) {
        if (!$mainQuestion.hasClass("invalid")) {
          $mainQuestion.addClass("invalid").append("<span class='invalid-message'>Please make a selection</span>");
        }
        return false;
      }
    } else if (!$active.find("input[type=radio]:checked").length) {
      if (!$mainQuestion.hasClass("invalid")) {
        $mainQuestion.addClass("invalid").append("<span class='invalid-message'>Please make a selection</span>");
      }
      return false;
    }

    $mainQuestion.removeClass("invalid");
    $invalidMsg.remove();
    return true;
  }

  function MenuPriceLookUp(menuOption) {
    const priceMap = {
      tmpBuild: 750,
      dlrLocPage: 750,
      homepageSupUpdate: 1000,
      headerRedev: 625,
      footerRedev: 250,
      sqzPage: 500,
      customNav: 500,
      customPageBlock: 500
    };

    return priceMap[menuOption] || 0;
  }

  $(document).ready(function() {
    $("#FormUpdate").load("flows/initial-flow.html");

    $(document).on('click', '#prevBtn', prevslideLogic);

    $(document).on('click', '#nextBtn', function() {
      if ($(".active").hasClass("validate-form")) {
        if (validateOption()) nextslideLogic();
      } else {
        nextslideLogic();
      }
    });
  });

})(jQuery);