
    var animals = [];

    var buttons = {
        createButtons : function(animals) {
            $("#buttons-view").empty();

            for (var i = 0; i < animals.length; i++) {
                var a = $("<button>");

                a.addClass("animals-btn");
                a.attr("data-name", animals[i]);
                a.text(animals[i]);

                $("#buttons-view").append(a);
            }
        },
        resetButtons : function() {
            $("#buttons-view").empty();
            animals = ["cat", "dog", "bird", "snake", "lion"];
            this.createButtons(animals);
        }
    };

    $(".add-animals-btn").on("click", function() {
        console.log("add animal button clicked")
        event.preventDefault();
        animals.push($("#add-animal").val().trim());
        buttons.createButtons(animals);
    });

    function showGifs() {
        $("#gifs-appear-here").empty();
        console.log("animal button clicked");
        var animal = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
    
            console.log(response);
    
            var results = response.data

            for (var i = 0; i < results.length; i++) {
                var animalDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[0].rating);
                var animalImage = $("<img>");

                animalImage.addClass("gif");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                
                animalDiv.append(p);
                animalDiv.append(animalImage);
                $("#gifs-appear-here").prepend(animalDiv);
            }
      })
    };

    function toggleGif() {
        console.log("gif clicked");
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    $(document).on("click", ".animals-btn", showGifs);
    $(document).on("click", ".clear-buttons", buttons.resetButtons);
    $(document).on("click", ".gif", toggleGif);
    buttons.resetButtons();
