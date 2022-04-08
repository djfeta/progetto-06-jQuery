var scatolaAperta = "";
var immagineAperta = "";
var contatore = 0;
var imgTrovata = 0;

var radice = "#scatolaimmagini";

var immagini = [
    'img/amare.png',
    'img/amare1.png',
    'img/arrabbiato.png',
    'img/bello.png',
    'img/piangere.png',
    'img/ridere.png',
    'img/shock.png',
    'img/spavento.png'
];

function RandomFunction(MaxValue, MinValue) {
    return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
}

function mescola() {
    var ImgTutte = $(radice).children();
    var ImgQst = $(radice + " div:first-child");
    var ImgArr = new Array();

    for (var i = 0; i < ImgTutte.length; i++) {
        ImgArr[i] = $("#" + ImgQst.attr("id") + " img").attr("src");
        ImgQst = ImgQst.next();
    }

    ImgQst = $(radice + " div:first-child");

    for (var z = 0; z < ImgTutte.length; z++) {
        var RandomNumber = RandomFunction(0, ImgArr.length - 1);

        $("#" + ImgQst.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
        ImgArr.splice(RandomNumber, 1);
        ImgQst = ImgQst.next();
    }
}

function resetta() {
    mescola();
    $(radice + " div img").hide();
    $(radice + " div").css("visibility", "visible");
    contatore = 0;
    $("#success").remove();
    $("#contatore").html("" + contatore);
    scatolaAperta = "";
    immagineAperta = "";
    imgTrovata = 0;
    return false;
}

function OpenCard() {
    var id = $(this).attr("id");

    if ($("#" + id + " img").is(":hidden")) {
        $(radice + " div").unbind("click", OpenCard);

        $("#" + id + " img").slideDown('fast');

        if (immagineAperta == "") {
            scatolaAperta = id;
            immagineAperta = $("#" + id + " img").attr("src");
            setTimeout(function () {
                $(radice + " div").bind("click", OpenCard)
            }, 300);
        } else {
            CurrentOpened = $("#" + id + " img").attr("src");
            if (immagineAperta != CurrentOpened) {
                setTimeout(function () {
                    $("#" + id + " img").slideUp('fast');
                    $("#" + scatolaAperta + " img").slideUp('fast');
                    scatolaAperta = "";
                    immagineAperta = "";
                }, 400);
            } else {
                $("#" + id + " img").parent().css("visibility", "hidden");
                $("#" + scatolaAperta + " img").parent().css("visibility", "hidden");
                imgTrovata++;
                scatolaAperta = "";
                immagineAperta = "";
            }
            setTimeout(function () {
                $(radice + " div").bind("click", OpenCard)
            }, 400);
        }
        contatore++;
        $("#contatore").html("" + contatore);

        if (imgTrovata == immagini.length) {
            $("#contatore").prepend('<span id="success">hai risolto il memory in </span>');
        }
    }
}

$(function () {

    for (var y = 1; y < 3; y++) {
        $.each(immagini, function (i, val) {
            $(radice).append("<div id=card" + y + i + "><img src=" + val + " />");
        });
    }
    $(radice + " div").click(OpenCard);
    mescola();
});