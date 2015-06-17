$(function(){



// This will target the submit_button ID & attach a click event, which runs a function.
  $("#submit_button").click(function(){

//  This function will first create a variable (Storing in memory) with the Value (.val) of the targeted element which in this case is the ID user_input
    var user_in = $("#user_input").val();

    // if you're ever unsure what the data is use console.log("test", or_variable_name_here)
    // it's also great if you're not sure if a button isn't working properly.
    console.log(user_in);

    // This will target the ID main_list(#main_list) and append (add on) a LI element with the variable we created earlier. 
    $("#main_list").append("<li>" + user_in);
    // This will create a variable named last_li setting the value to the last created li element in the #main_list element
    var last_li = $("#main_list").find('li:last');

   // notice when targeting a created variable we don't enter it as a string.
    $(last_li).append('<input class="delete_button" type="button" value="delete">');
    $(last_li).prepend('<input class="checkbox" type="checkbox">');

// 
// NEED TO BUILD A WAY TO TELL IF ITEM IS COMPLETE OR NOT..
// 
  

  
    // We target classes with a . before the name and ids with a # before the name so .delete_button and #main_list!
    $(".delete_button").click(function(){
      $(this).parent().remove();
    });




//  This will target the user_input ID and clear the field by setting the value to an empty string.
    // our code runs in order from top to bottom (in most cases) so the form here won't clear until after the lines above it
    $("#user_input").val("");
  });



});