/*Sets all the global variables*/

var operator_pressed_state = false; // Determines if an operator button has been pressed.
var operator_pressed_value = "";
var first_value = 0; //Sets value of calculator initially.
var first_number_after_operator = false; // Determines whether the number about to be printed is the first after using an operator.
var delete_key_active = true; // States whether the delete key can be used.
var decimal_key_active = true; // States whethere the decimal key can be used.



function numberKey(clicked_number){
    // Gets the object as well as the text it contains
    var display_object = document.getElementById("calculator_display");
    var current_display = display_object.innerHTML;
 
    /*
    Determines the result of pressing a number key:

    If the next input doesn't cause an error and is currently clear, it will be replaced by the number else it will be appended.

    */

    if(current_display.length < 13 && current_display!=="Error"){
        if(current_display == "0"){
            display_object.value = clicked_number;
            delete_key_active = true;
            decimal_key_active = true;
        }

        else if(first_number_after_operator == true){
            display_object.value = clicked_number;
            first_number_after_operator = false;
            delete_key_active = true;
            decimal_key_active = true;
        }

        else{
            display_object.value = current_display.concat(clicked_number);
        }

        display_object.innerHTML = display_object.value;
    }

    else{
        display_object.innerHTML = "Error"; 
    }
}


function operatorKey(clicked_operator){
    // Saves the operator clicked as well as the number displayed when the operator was clicked.
    var display_object = document.getElementById("calculator_display");
    first_value = parseFloat(display_object.value);
    operator_pressed_state = true;
    operator_pressed_value = clicked_operator;
    first_number_after_operator = true;
}


function decimalKey(){
    // If able, adds a decimal point as the next entry in the display.
    var display_object = document.getElementById("calculator_display");
    var current_display = display_object.innerHTML;
    if(decimal_key_active){
        if(first_number_after_operator==true){
            display_object.innerHTML = "0.";
            first_number_after_operator = false;
            decimal_key_active = false;
            delete_key_active = true;
        }

        else if(current_display.search(/\./)==-1){
            display_object.innerHTML = current_display.concat(".");
        }

        else{
            display_object.innerHTML = "Error";
        }
    }
}


function deleteKey(){
    // If able, removes the most recent entry in the display.
    var display_object = document.getElementById("calculator_display");
    var current_display = display_object.innerHTML;
    if (delete_key_active){
        if(current_display.length==1){
            display_object.innerHTML=0;
        }

        else{
        display_object.innerHTML = current_display.slice(0,-1);
        }
    }
}  



function clearallKey(){
    // Clears all and returns the calcultor to default state.
    var display_object = document.getElementById("calculator_display");

    display_object.innerHTML = "0"
    display_object.value = 0
    operator_pressed_state = false
    operator_pressed_value = ""
    first_value = 0
    first_number_after_operator = false
}

function calculateKey(){
    // Calculates the new value based upon the previous and current value and the chosen operator. Produces an error if it exceeds max value.
    var display_object = document.getElementById("calculator_display");

        if(operator_pressed_value=="+"){
            display_object.value = (first_value + parseFloat(display_object.value));
        }

        else if(operator_pressed_value=="-"){
            display_object.value = (first_value - parseFloat(display_object.value));
        }

        else if(operator_pressed_value=="*"){
            display_object.value = (first_value * parseFloat(display_object.value));
        }

        else if(operator_pressed_value=="/"){
            display_object.value = (first_value / parseFloat(display_object.value));
        }

    if(display_object.value > 9999999999999){
        display_object.innerHTML = "Error";
    }

    else{
        display_object.innerHTML = display_object.value; 
    }

    first_number_after_operator = true;
    delete_key_active = false;
    decimal_key_active = false;
    first_value = display_object.value;
    operator_pressed_state = false;
    operator_pressed_value = ""
}

