(function() {
  'use strict';

  const searchTermStorageKey = 'searchTerm';

<<<<<<< HEAD
=======
  // find a specific query string parameter
>>>>>>> 4586c9a6d3a324111b611a9b58fa869d0da6595c
  const getQueryParameter = parameter => {
    const query = window.location.search.substring(1);
    const results = query.split('&');
    for (const result of results) {
      const [key, value] = result.split('=');
      if (key === parameter) return value;
    }
    return false;
  }
<<<<<<< HEAD

=======
  
>>>>>>> 4586c9a6d3a324111b611a9b58fa869d0da6595c
  var app = {
    isLoading: true,
    visibleCards: {},
    spinner: document.querySelector('.loader'),
    container: document.querySelector('.main')
  };

  app.updateSearchCard = function(data, searchTerm) {
    var card = document;
    if(!searchTerm) {
      card.querySelector('.subtitle').textContent = 'Search for a topic';
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      card.querySelector('#search-input').style.display = 'block';
      app.isLoading = false;
      return;
    }

    var resultCount = data['@odata.count'];
    var episodes = data['value'];
    var searchDate = data['date'];
    card.querySelector('.subtitle').textContent = '"' + searchTerm + '": ' + resultCount + ' episodes';
    card.querySelector('#search-input').style.display = resultCount ? 'none' : 'block';

    var ul = document.createElement('ul');

    episodes.forEach(function(e) {
      var li = document.createElement('li');

      li.onclick = function () {
        var playUrl = e.audioUrl;

        if (location.protocol === 'https:') {
<<<<<<< HEAD
          /* // Alternative to using ssl proxy
          playUrl = e.audioUrl.replace(/^http:\/\//i, 'https://');
          if(playUrl !== e.audioUrl) {
          */
=======
>>>>>>> 4586c9a6d3a324111b611a9b58fa869d0da6595c
          if (playUrl.includes("http://")) {
            console.log('Uh oh, the search engine returned a non https link. We cannot request that from an https site.');
            console.log('Originally requested url: ' + e.audioUrl);
            console.log('Attempting to proxy request');
            playUrl = config.sslProxyUrl + e.audioUrl;
          }
        }
        AudioManager.play(playUrl);
      };

      li.classList = "episodeItem";
      li.setAttribute("audioUrl", e.audioUrl);
      li.appendChild(document.createTextNode(e.episodeTitle));
      var episodeDiv = document.createElement('div');
      episodeDiv.appendChild(document.createTextNode(e.podcastTitle));
      episodeDiv.className = 'podcast-title';
      li.appendChild(episodeDiv);
      ul.appendChild(li);
    });

    card.querySelector('.episode-list').appendChild(ul);

    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
  };

  app.saveSearchState = function(searchTerm) {
    localStorage.setItem(searchTermStorageKey, searchTerm);
  };

  app.search = function(searchTerm) {
    app.saveSearchState(searchTerm);
    var url = config.baseUrl + searchTerm;
    if ('caches' in window) {
      caches.match(url).then(function(response) {
        if (response) {
          response.json().then(function updateFromCache(json) {
            var results = json.query.results;
            app.updateSearchCard(results, searchTerm);
          });
        }
      });
    }

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          var results = JSON.parse(request.response);
          app.updateSearchCard(results, searchTerm);
        }
      } else {
        app.updateSearchCard({});
      }
    };
    request.open('GET', url, true);
    request.setRequestHeader('Content-Type', 'application\/json');
    request.setRequestHeader('api-key', config.apiKey)
    request.send();
  };

  if (location.search) {
      const searchTerm = getQueryParameter('s');
<<<<<<< HEAD
      console.log(searchTerm)
=======
>>>>>>> 4586c9a6d3a324111b611a9b58fa869d0da6595c
      app.search(searchTerm);
  } else {
    // First load
    const searchTerm = localStorage.getItem(searchTermStorageKey);
    if (searchTerm) {
      app.search(searchTerm)
    } else {
      app.updateSearchCard({});
    }
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

})();