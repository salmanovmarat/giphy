$("#addAnimal").click(function () {
    var btnTxt = $("#animal-input").val();
    if (btnTxt === "") {
        $("#animal-input").focus();
    } else {

        var newbtn = $("<button class='animalBTN'>");
        newbtn.attr("value", btnTxt);
        newbtn.text(btnTxt);
        $("#animalSwitch").append(newbtn);
        $("#animal-input").val("");
        $("#animal-input").focus();
    }
    return false;
})

$("#animalSwitch").on("click", "button", function (res) {

    var apikey = "6rvZikSkdbHSZ8jxAXPHuGvVUge4Yj0T";
    var fullpath = "https://api.giphy.com/v1/gifs/search";
    var limit = 10;
    var search = this.value;
    fullpath = fullpath + "?api_key=" + apikey;
    fullpath = fullpath + "&q=" + search;
    fullpath = fullpath + "&limit=" + limit;
    $.ajax({
        "url": fullpath,
        "method": "GET"
    }).then(function (response) {
        $("#animals").html("");

        for (var i = 0; i < response.data.length; i++) {
            console.log(response);
            console.log(response.data[i].images.downsized_still.url);
            console.log(response.data[i].images.downsized.url);
            console.log(response.data[i].rating);
            var newImage = $("<img class='imgAnimate'>");
            newImage.attr("src", response.data[i].images.fixed_height_still.url);
            newImage.attr("data-animate", response.data[i].images.fixed_height.url);
            newImage.attr("data-still", response.data[i].images.fixed_height_still.url);
            newImage.attr("data-state", "still");
            newImage.on("click", playGif);
            var newdiv = $("<div class='containerdiv'>");
            var ratingDiv = $("<div class='ratingDiv'>");
            ratingDiv.text("Rating: " + response.data[i].rating.toUpperCase());
            newdiv.append(ratingDiv);
            newdiv.append(newImage);

            $("#animals").prepend(newdiv);

        }

    });

});

$(document).on("click", "img", function () {
    alert(this.attr("data-still"));
});

function playGif() {
    var state = $(this).attr("data-state");

    if (state == "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
}