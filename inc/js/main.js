


$(function () {

    var elementDoc = $(document);

    /* Element document */
    skillAnimate(elementDoc);

    /* Togger label in focus of the contacts inputs */
    toggerLabelInputContact();

    /* Used for animate the skill bar, when show in screen */
    elementDoc.scroll(function () {
        skillAnimate($(this));
    });

    $(".skillItemMaxValue span").each(function () {

        /* Get element to animate */
        var currentElement = $(this);

        /* Set max value in data atribute e set text equals 0 */
        currentElement.data('valueCounter', parseInt(currentElement.html()));
        currentElement.html('0');

        /* Call function the increment */
        incrementador(currentElement);
    });

    $("#next").on("click", function() {
        if($('#slider1').is(':visible')) {
            $("#slider1").css("display", "none");
            $("#slider2").css("display", "block");
            $(".fa-chevron-left").css({
                opacity: 1,
                cursor: "pointer"
            });
        }
        else if($('#slider2').is(':visible')) {
            $("#slider2").css("display", "none");
            $(".fa-chevron-right").css({
                opacity: 0.3,
                cursor: "default"
            });
            $("#slider3").css("display", "block");
        }
    });

    $("#previous").on("click", function() {
        if($('#slider3').is(':visible')) {
            $("#slider3").css("display", "none");
            $("#slider2").css("display", "block");
            $(".fa-chevron-right").css({
                opacity: 1,
                cursor: "pointer"
            });
        }
        else if($('#slider2').is(':visible')) {
            $("#slider2").css("display", "none");
            $(".fa-chevron-left").css({
                opacity: 0.3,
                cursor: "default"
            });
            $("#slider1").css("display", "block");
        }
    });

    starCheckedClientFeedBack();
    equlsHeigtBoxTextClient();

    $(window).resize(function () {
        equlsHeigtBoxTextClient();
    });

    toggerCollapsedMenuFixed();
    scrollTo();
});

function toggerCollapsedMenuFixed() {

    var collapsedBtnMenu = $("#linkDropdown");
    var theHeader = $("header");

    collapsedBtnMenu.click(function (ev) {

        ev.preventDefault();

        var boxCollapsedHeader = $(".collapsedHeader");

        if (boxCollapsedHeader.hasClass("closedMenuHeader")) {

            collapsedBtnMenu.fadeOut(300);
            theHeader.css({
                'box-shadow': 'none'
            });

            setTimeout(function () {
                collapsedBtnMenu.html("<i class='fa fa-times' aria-hidden='true'></i>");
                collapsedBtnMenu.fadeIn("slow");
            }, 200);

            boxCollapsedHeader.removeClass("closedMenuHeader").addClass("openMenuHeader");
        } else {

            collapsedBtnMenu.fadeOut(300);
            theHeader.css({
                'box-shadow': '0 0.2rem .4rem 0 rgba(0, 0, 0, 0.25)'
            });

            setTimeout(function () {
                collapsedBtnMenu.html("<i class='fa fa-bars' aria-hidden='true'></i>");
                collapsedBtnMenu.fadeIn("slow");
            }, 200);

            boxCollapsedHeader.removeClass("openMenuHeader").addClass("closedMenuHeader");
        }
    });
}

function equlsHeigtBoxTextClient() {

    var allBox = $(".boxTextClient");
    var majorHeight = 0;
    //var heightP = 0;

    allBox.each(function () {

        currentBox = $(this);
        currentHeight = currentBox.height();
        //heightP = currentBox.children().first().height();

        if(currentHeight > majorHeight){
            majorHeight = currentHeight;
        }
    });

    allBox.each(function () {
       currentBox = $(this);

        currentBox.children().first().css({
            'margin-top': parseInt((majorHeight - currentBox.height()) / 2) + 'px'
        })
    });

    allBox.css({
        height: majorHeight + 40 + 'px'
    })
}

function toggerLabelInputContact() {

    $(".inputFieldContact").focus(function () {

        $(this).parent().addClass("focusInputFieldContact");
    }).focusout(function () {

        if ($(this).val() === "") {

            $(this).parent().removeClass("focusInputFieldContact");
        }
    });
}

function starCheckedClientFeedBack() {
    var allStar = $(".starUnity");

    allStar.each(function () {
        currentStar = $(this);

        if(currentStar.hasClass("starChecked")){

            currentStar.css({
                background: "url('inc/img/icons/star-full.svg')"
            });
        }
    })
}

function skillAnimate(doc) {
    var tamScroll = doc.scrollTop();

    if (tamScroll >= 320) {
        if ($("#skillBar").offset().top <= tamScroll + 320) {

            $('.elementSkillHtml').animate({width: '90%'}, 2000);
            $('.elementSkillCss').animate({width: '75%'}, 2000);
            $('.elementSkillJs').animate({width: '70%'}, 2000);
            $('.elementSkillPhp').animate({width: '50%'}, 2000);
        }
    }
}

/* Function to animate element */
function incrementador(element) {

    /* Get current value on element*/
    var current = parseInt(element.text());

    /* add 3 for paused effect */
    current = current + 3;

    /* add text on element */
    element.html(current);

    /* while current value minius the max value increment paused form */
    if (current > element.data('valueCounter')) {

        /* If currente value > max value, max value is used to text */
        element.html(element.data('valueCounter'));
    } else {
        var timeoutForElement = (2000/element.data('valueCounter'))*3;

        /* waits (2000/valueCounter)*3 milliseconds, call the increment function */
        setTimeout(function () {

            incrementador(element)
        }, timeoutForElement);
    }
}

function scrollTo() {

    $(".scrollTo").click(function (event) {

        event.preventDefault();

        var offSet = -80;
        var thisHref = $(this).attr('href');
        var collapsedBtnMenu = $("#linkDropdown");
        var theHeader = $("header");
        var boxCollapsedHeader = $(".collapsedHeader");

        console.log($(this).offset());

        if(thisHref === "#contactAndMap"){
            offSet = -120;
        }

        if(parseInt($(window).width()) < 768){
            offSet = -540;

            if(thisHref === "#contactAndMap"){
                offSet = -80;
            }
        }

        var totalScroll = parseInt($(this.hash).offset().top) + offSet;

        if(thisHref === "#headerHome"){
            totalScroll = 0;
        }else{
            collapsedBtnMenu.fadeOut(300);
            theHeader.css({
                'box-shadow': '0 0.2rem .4rem 0 rgba(0, 0, 0, 0.25)'
            });

            setTimeout(function () {
                collapsedBtnMenu.html("<i class='fa fa-bars' aria-hidden='true'></i>");
                collapsedBtnMenu.fadeIn("slow");
            }, 200);
            boxCollapsedHeader.removeClass("openMenuHeader").addClass("closedMenuHeader");
        }

        $('html,body').animate({

            scrollTop: totalScroll
        }, 800);
    });
}

/* Exemplo elegante de form e js */
/*
* formData = {
  'name'     : $('input[name=name]').val(),
  'email'    : $('input[name=email]').val(),
  'subject'  : $('input[name=subject]').val(),
  'message'  : $('textarea[name=message]').val(),
  'updates'  : $('input:checkbox[name=updates]').is(':checked')
  };
* */