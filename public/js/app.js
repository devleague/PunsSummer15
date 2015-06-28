$(document).ready(function(){

  //Initialize our page to listen for events
  addEventHandlers();

  //Get existing todos from API
  getTodos();

  function addEventHandlers(){
    //This section is where we add the event handling 
    //functions we want to use 

    // We target classes with a . before the name and ids 
    // with a # before the name so .delete_button 
    // and #submit_button! Ids are good when there will be 
    // one element, classes when there are multiple elements
    // of the same class.

    // This will target the submit_button ID 
    // & attach a click event, which runs a function.
    $('#submit_button').click(function(){
      var userInput = $("#user_input").val();
      addTodo(userInput);
    });

    //This will handle all buttons that get added but they
    //will know about which item they belong to with an ID
    $(document).on("click", ".delete_button", function(){
      var todoId = this.closest('li').id;
      deleteTodo(todoId);
    });

    // This block of code puts a click event on each new element 
    // added to the page with the .checkbox class
    $(document).on("click", ".checkbox", function(){
      var parentLi = this.parentElement;

      if($(this).prop("checked")){
        completed = true;
        $(this).parent().css("text-decoration", "line-through");
      } 
      else {
        completed = false;
        parentLi.css("text-decoration", "none");
      }

      updateTodo(parentLi.id, completed);
    });
  }

  function getTodos(){
    $.ajax("/todos",
      {
        type: "GET"
      })
    .done(function(data){
      //bind data to page
      for(var i = 0; i < data.length; i++){
        //call same function we use for addTodo - "DRY"
        addNewElementToPage(data[i]);
      }

    })
    .fail(function(err){
      //handle error
    });
  }


  function addTodo(userInput){
    $.ajax("/todo", 
      {
        type: "POST",
        data: {
          title: userInput,
        }
      })
    .done(function(todo){
      //handle success

      //Add our new HTML with data
      addNewElementToPage(todo);

      //call our function to clear input field for new input
      clearUserInput();
    })
    .fail(function(err){
      //handle error
    });
  }


  function updateTodo(todoId, completed){
    $.ajax("/todo/" + todoId,
      {
        type: "PUT",
        data: {
          id: todoId,
          completed: completed
        }
      })
    .done(function(todo){
      //handle success 
    })
    .fail(function(err){
      //handle error
    });
  }

  function deleteTodo(todoId){
    $.ajax('/todo/'+ todoId,
      { 
        type:"DELETE",
      })
    .done(function(data){
      //handle success
      removeElementFromPage(todoId);
    })
    .fail(function(err){
      //handle error
    });
  }

  function addNewElementToPage(todo){
    // if you're ever unsure what the data is use console.log("test", or_variable_name_here)
    // it's also great if you're not sure if a button isn't working properly.

    // This will target the ID main_list(#main_list) and append 
    // (add on) a LI element and put it in a variable so we can keep track of it
    var last_li = $("<li id='" + todo._id + "' class='list_item'>" + todo.title + "</li>");
    last_li.appendTo('#main_list');

    // notice when targeting a created variable we don't enter it as a string.
    $(last_li).append('<input class="delete_button" type="button" value="delete">');

    if(todo.completed){
      $(last_li).prepend('<input class="checkbox" type="checkbox" checked>');
      $(last_li).css("text-decoration", "line-through");
    }
    else{
      $(last_li).prepend('<input class="checkbox" type="checkbox">');
    }

  }

  function removeElementFromPage(elementId){
    var element = $('#' + elementId);
    if(element){
      element.remove();
    }
  }

  function clearUserInput(){
    $('#user_input').val("");
  }

});
