var $titleInput = $('.title-input');
var $bodyInput = $('.body-input');
var $saveButton = $('.save');

//onload functions that find any ideas in local storage and display them on the page, and toggles off save butotn when there is no input//

onLoad();

function onLoad(){
  retrieveLocal();
  displayIdeas();
  toggleButton();
};

function retrieveLocal(){
  if (localStorage.getItem("allideas") === null){
    localStorage.setItem("allideas", JSON.stringify([]))
  };
};

function getIdeas(){
  return JSON.parse(localStorage.getItem("allideas"));
};

function displayIdeas(){
  var ideas = getIdeas();
  ideas.forEach(function(idea) {
    ideaCard(idea.id, idea.title, idea.body, idea.quality);
  });
};

function toggleButton (){
  if ($(".title-input").val().length > 0  || $(".body-input").val().length > 0) {
    $saveButton.attr("disabled", false);
  } else {
    $saveButton.attr('disabled', true);
  }
}

$(".body-input").on('keyup', function(){
  toggleButton();
});

//constructor defining what an idea is//
function Idea(id, title, body, quality, completed) {
  this.id = parseInt(id);
  this.title = title;
  this.body = body;
  this.quality = quality || 'normal';
  this.completed = completed || false;
};

// gives unique id to each created idea//
function uniqueId() {
  return Date.now().toString();
};

//functions for grabbing the input from the user//
function getTitle() {
  var ideaTitle = $titleInput.val();
  return ideaTitle;
};

function getBody() {
  var ideaBody = $bodyInput.val();
  return ideaBody;
};

function getSearch() {
  var searchInput = $('.search-field').val();
  return searchInput;
};

function clearInputs() {
  $titleInput.val('');
  $bodyInput.val('');
};

//takes input data and creates idea card to display, prepends as article to section designated in html//
function ideaCard(id, title, body, quality) {
  $('.idea-list').prepend(`
    <article id="`+ id +`" class="idea-card">
      <h2 class="editable" contenteditable="true">` + title + `</h2>
      <button class="delete-idea"></button>
      <p class="editable idea-body" contenteditable="true">` + body + `</p>
      <button class="upvote"></button>
      <button class="downvote"></button>
      <button class="completed"></button>
      <p class= "idea-quality ` + quality +`"><span>Quality:</span> <span class="displayed-quality">` + quality + `</span> </p>
    </article>`);
  };

  //takes inputs and turns into idea object, pushes that to storage, also runs the function above to display the newly created/stored idea card

  function makeNewIdea() {
    var newIdea = new Idea(uniqueId(), getTitle(), getBody(), Idea.quality)
    existingIdeas = getIdeas();
    existingIdeas.push(newIdea);
    localStorage.setItem('allideas', JSON.stringify(existingIdeas));
    ideaCard(newIdea.id, newIdea.title, newIdea.body, newIdea.quality);
    clearInputs();
  };

  //runs the above functions on click of save//
  $($saveButton).on('click', makeNewIdea);
  $($saveButton).on('click', toggleButton);


  //deleting ideas from the display AND ALSO from storage//
  $('.idea-list').on('click', '.delete-idea', deleteIdea);

  function deleteIdea() {
    var ideaArticle = $(this).closest('.idea-card');
    var idToDeleteFromStorage = parseInt(ideaArticle.attr("id"));
    deleteIdeaFromStorage(idToDeleteFromStorage);
    ideaArticle.remove();
  };

  function deleteIdeaFromStorage(toBeDeleteID) {
    var existingIdeas = getIdeas();
    existingIdeas = existingIdeas.filter(function(idea, index) {
      return idea.id !== parseInt(toBeDeleteID)
    });
    localStorage.setItem("allideas", JSON.stringify(existingIdeas));
  };

  //upvote and downvote buttons update quality in display AND in local storage//
  $('.idea-list').on('click', '.upvote', upVote);
  $('.idea-list').on('click', '.downvote', downVote);
  $('.idea-list').on('click', '.completed', completedTask);

  function completedTask() {
    var ideaArticle = $(this).closest('.idea-card');
    var ideaId = parseInt(ideaArticle[0].id);
    var allIdeas = JSON.parse(localStorage.getItem("allideas"));

    for(var i = 0; i < allIdeas.length; i++) {
      if (allIdeas[i].id === ideaId) {
        if (allIdeas[i].completed === false) {
          allIdeas[i].completed = true;
        }
        if (allIdeas[i].completed === true) {
          allIdeas[i].completed = false;
        }
      }
      localStorage.setItem('allideas', JSON.stringify(allIdeas));
    }
  };

  function upVote() {
    var ideaArticle = $(this).closest('.idea-card');
    // var ideaQuality = ideaArticle.find('.displayed-quality').text();
    var ideaId = parseInt(ideaArticle[0].id);
    var allIdeas = JSON.parse(localStorage.getItem("allideas"));

    for(var i = 0; i < allIdeas.length; i++) {
      if (allIdeas[i].id === ideaId) {
        if (allIdeas[i].quality === 'none') {
          console.log(allIdeas.quality)
          allIdeas[i].quality = 'low'
          localStorage.setItem("allideas", JSON.stringify(allIdeas));
          ideaArticle.find('.idea-quality').text('quality: low');
        }

        else if (allIdeas[i].quality === 'low') {
          allIdeas[i].quality = 'normal'
          localStorage.setItem("allideas", JSON.stringify(allIdeas));
          ideaArticle.find('.idea-quality').text('quality: normal');
          }

        else if (allIdeas[i].quality === 'normal') {
          allIdeas[i].quality = 'high'
          localStorage.setItem("allideas", JSON.stringify(allIdeas));
          ideaArticle.find('.idea-quality').text('quality: high');
          }

        else if (allIdeas[i].quality === 'high') {
          allIdeas[i].quality = 'critical'
          localStorage.setItem("allideas", JSON.stringify(allIdeas));
          ideaArticle.find('.idea-quality').text('quality: critical');
        }
      }
        localStorage.setItem("allideas", JSON.stringify(allIdeas));
        console.log(localStorage)
      }
    }

  function downVote() {
    var ideaArticle = $(this).closest('.idea-card');
    // var ideaQuality = ideaArticle.find('.displayed-quality').text();
    var ideaId = parseInt(ideaArticle[0].id);
    var allIdeas = JSON.parse(localStorage.getItem("allideas"));

    for(var i = 0; i < allIdeas.length; i++) {
      if (allIdeas[i].id === ideaId) {
        if (allIdeas[i].quality === 'critical') {
          allIdeas[i].quality = 'high'
          ideaArticle.find('.idea-quality').text('quality: high');
          localStorage.setItem("allideas", JSON.stringify(allIdeas));
          return
        }

        if (allIdeas[i].quality === 'high') {
          allIdeas[i].quality = 'normal'
          ideaArticle.find('.idea-quality').text('quality: normal');
          localStorage.setItem("allideas", JSON.stringify(allIdeas));
          return
          }

        if (allIdeas[i].quality === 'normal') {
          allIdeas[i].quality = 'low'
          ideaArticle.find('.idea-quality').text('quality: low');
          localStorage.setItem("allideas", JSON.stringify(allIdeas));
          return
          }

        if (allIdeas[i].quality === 'low') {
          allIdeas[i].quality = 'none'
          ideaArticle.find('.idea-quality').text('quality: none');
          localStorage.setItem("allideas", JSON.stringify(allIdeas));
          return
          }
        }
        localStorage.setItem("allideas", JSON.stringify(allIdeas));
        console.log(localStorage)
      }
    }

  //update storage when stuff is edited/clicked in the dom
  $('.idea-list').on('keyup', '.editable', updateStorage);
  $('.idea-list').on('blur', '.upvote', updateStorage);
  $('.idea-list').on('blur', '.downvote', updateStorage);

  //when a user edits an idea in the display, this function pushes those changes to storage//
  function updateStorage() {
    var editedIdeaArticle = $(this).closest('.idea-card');
    var editedIdeaId = parseInt(editedIdeaArticle.attr('id'));
    var editedIdeaTitle = editedIdeaArticle.find('h2.editable').text();
    var editedIdeaBody = editedIdeaArticle.find('p.editable').text();
    var editedIdeaQuality = editedIdeaArticle.find('.displayed-quality').text();
    deleteIdeaFromStorage(editedIdeaId);
    var editedIdea = new Idea(editedIdeaId, editedIdeaTitle, editedIdeaBody, editedIdeaQuality);
    var existingIdeas = getIdeas();
    existingIdeas.push(editedIdea);
    localStorage.setItem("allideas", JSON.stringify(existingIdeas));
  };

  //causes enter to act as submit button//
  $('.idea-card').on('keypress', '.editable', function(event) {
    if(event.keyCode == 13)
    {event.preventDefault();
    };
  });

  function getSearchInput() {
    var searchInput = $('.search-field').val();
    return searchInput;
  };
  $('.search-field').on('keyup', function(){
    var searchInputWithSpaces = $(this).val();
    var searchInput = searchInputWithSpaces.trim();
    search(searchInput);
  });

  function search(searchInput) {
    if(searchInput !== "") {
      $('.idea-list').find('article:not(:contains('+ searchInput + '))').slideUp();
      $('.idea-list').find('article:contains(' + searchInput + ')').slideDown();
    } else {
      $('.idea-list').find('article').slideDown();
    };
  };
