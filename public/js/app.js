$(function(){

// This will target the submit_button ID & attach a click event, which runs a function.
  $("#submit_button").click(function(){ 

//  This function will first create a variable (Storing in memory) with the Value (.val) of the targeted element which in this case is the ID user_input
    var user_in = $("#user_input").val();


  function addUserInput(userInput){
    $.post("/todoitam", 
      {
        title: userInput
      })
    .done(function(data){
      //handle success
      $(".result").html(data.title);

      // We target classes with a . before the name and ids with a # before the name so .delete_button and #main_list!
      $(".delete_button").click(function(){
        $.ajax('/items/'+ data._id,
          { 
            type:"DELETE",
          })
        .done(function(data){
          //handle success
          console.log(data);
          $(this).parent().remove();
        })
        .fail(function(err){
          //handle error
        });
      });
      console.log(data);

      addNewElementToPage(data);
      //call our function to clear input field for new input
      clearUserInput();
    })
    .fail(function(err){
      //handle error
    });
  }

  function addNewElementToPage(todo){
    // if you're ever unsure what the data is use console.log("test", or_variable_name_here)
    // it's also great if you're not sure if a button isn't working properly.
    // This will target the ID main_list(#main_list) and append (add on) a LI element with the variable we created earlier. 
    $("#main_list").append("<li class='list_item'>" + user_in);
    // This will create a variable named last_li setting the value to the last created li element in the #main_list element
    var last_li = $("#main_list").find('li:last');

   // notice when targeting a created variable we don't enter it as a string.
    $(last_li).append('<input class="delete_button" type="button" value="delete">');
    $(last_li).prepend('<input class="checkbox" type="checkbox">');

// This block of code puts a click event on each 
    $(".checkbox").click(function(){
      var parentLi = $(".checkbox").closest("li");
      var completed;
      // if($(".checkbox").prop("checked")){
      if($(this).prop("checked")){
        completed = true;
        console.log($(this));
        // $(this).parent().css("text-decoration", "line-through");     
        $(this).parent().css("text-decoration", "line-through");
      
      } else {
        completed = false;
        // $(this).parent().css("text-decoration","none");
            parentLi.css("text-decoration", "none");
      }


    });
    $('#save_button').click(function(){
      // text that user inputs
      console.log(user_in);


      var send_data = {data : user_in};
      $.post("/todoitam", send_data,function (data){
        $(".result").html(data);
      });      
    });

    // We target classes with a . before the name and ids with a # before the name so .delete_button and #main_list!
    $(".delete_button").click(function(){
      $.ajax('/todoitam/:item_id',
        { type:"DELETE",
          success :function(data){
            console.log('data',data);
          }
        });
        $(this).parent().remove();
    });
//  This will target the user_input ID and clear the field by setting the value to an empty string.
    // our code runs in order from top to bottom (in most cases) so the form here won't clear until after the lines above it
    $("#user_input").val("");
  });
});
