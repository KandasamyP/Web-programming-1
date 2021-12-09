(function($) {
    var mySearchForm = $('#searchForm'),
		searchTermInput = $('#search_term');
        showListField = $('#showList');
        show = $('#show');
        back = $('#homeLink');
        error = $('#error');

    var requestConfig = {
        method: 'GET',
        url: 'http://api.tvmaze.com/shows'
    };

    $.ajax(requestConfig).then(function(responseMessage) {
        showListField.attr("hidden", false);
        show.attr("hidden", true);
        responseMessage.forEach(element => {
            let li = document.createElement('li');
            li.innerHTML = `<a href=${element._links.self.href}> ${element.name}</a>`;
            showListField.append(li);
        });
        showListField.children().each(function(index, element) {
            bindEventsToTodoItem($(element));
        });
    });	
	

	function bindEventsToTodoItem(listItem) {
		listItem.find("a").on('click', function(event) {
			event.preventDefault();
			let currentLink = $(this);
			let currentUrl = currentLink.context.href;

			let requestConfig = {
				method: 'GET',
				url: currentUrl
			};

			$.ajax(requestConfig).then(function(responseMessage) {
                showListField.attr("hidden", true);
                show.attr("hidden", false);
                back.attr("hidden", false);
                error.hide();
                show.empty();

                console.log(responseMessage);

                let h1 = document.createElement('h1');
                h1.innerHTML = responseMessage.name;
                show.append(h1);
                let img = document.createElement('img');
                if (responseMessage.image !== null && responseMessage.image.medium){
                    img.src = responseMessage.image.medium;
                }
                else{
                    img.src = "public/js/no_image.jpeg";
                }
                show.append(img);

                let dl = document.createElement('dl');
                let dt_Language = document.createElement('dt');
                dt_Language.innerText = "Language";
                dl.append(dt_Language);
                let dd_Language = document.createElement('dd');
                if(responseMessage.language) {
                    dd_Language.innerText = responseMessage.language;
                } else {
                    dd_Language.innerText = "N/A";
                }
                dt_Language.append(dd_Language);

                let dt_Genre = document.createElement('dt');
                dt_Genre.innerText = "Genre";
                dl.append(dt_Genre);
                let dd_Genre = document.createElement('dd');
                let ul = document.createElement('ul');
                if  (responseMessage.genres && responseMessage.genres.length > 0) {
                        responseMessage.genres.forEach(element => {
                        let li = document.createElement('li');
                        li.innerHTML = element;
                        ul.append(li);
                    });
                } else {
                    ul.innerText = "N/A";
                }
                dd_Genre.append(ul);
                dt_Genre.append(dd_Genre);

                let dt_Rating = document.createElement('dt');
                dt_Rating.innerText = "Average Rating";
                dl.append(dt_Rating);
                let dd_Rating = document.createElement('dd');
                if(responseMessage.rating && responseMessage.rating.average) {
                    dd_Rating.innerText = responseMessage.rating.average;
                } else {
                    dd_Rating.innerText = "N/A";
                }
                dt_Rating.append(dd_Rating);

                let dt_Network = document.createElement('dt');
                dt_Network.innerText = "Network";
                dl.append(dt_Network);
                let dd_Network = document.createElement('dd');
                if(responseMessage.network && responseMessage.network.name) {
                    dd_Network.innerText = responseMessage.network.name;
                } else {
                    dd_Network.innerText = "N/A";
                }
                dt_Network.append(dd_Network);

                let dt_Summary = document.createElement('dt');
                dt_Summary.innerText = "Summary";
                dl.append(dt_Summary);
                let dd_Summary = document.createElement('dd');
                if (responseMessage.summary) {
                    dd_Summary.innerHTML = responseMessage.summary;
                } else {
                    dd_Summary.innerHTML = "N/A";
                }
                dt_Summary.append(dd_Summary);

                show.append(dl);   			
			});
		});
	}

	showListField.children().each(function(index, element) {
		bindEventsToTodoItem($(element));
	});

	mySearchForm.submit(function(event) {
		event.preventDefault();

        if(!searchTermInput.val() || searchTermInput.val().trim().length == 0) {
            error.show();
            return;
        } 

        var requestConfig = {
            method: 'GET',
            url: `http://api.tvmaze.com/search/shows?q=${searchTermInput.val()}`
        };

        $.ajax(requestConfig).then(function(responseMessage) {
            showListField.attr("hidden", false);
            back.attr("hidden", false);
            show.attr("hidden", true);
            error.hide();
            showListField.empty();         
            if (responseMessage.length == 0) {
                let li = document.createElement('li');
                li.innerHTML = `No shows found for the given search input !!`;
                showListField.append(li);
            }

            responseMessage.forEach(element => {
                let li = document.createElement('li');
                li.innerHTML = `<a href=${element.show._links.self.href}> ${element.show.name}</a>`;
                showListField.append(li);
            });

            showListField.children().each(function(index, element) {
                bindEventsToTodoItem($(element));
            });
        });

    });

})(window.jQuery);