// Валидация данных
// https://monsterlessons.com/project/lessons/validaciya-formy-v-javascript  ---- вдохновлялся этим

var form= document.querySelector('.validate_form');
var validatedButton = document.querySelector('.validate_button');
var xOptions = document.querySelectorAll(".x");
var yCoordinate = document.querySelector(".y");
var rCoordinate = document.querySelector(".R");
var table = document.getElementById("result_table");
load_table();

function isNumber(s){
    var n = parseFloat(s.replace(',','.'));
    return !isNaN(n) && isFinite(n);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//функция для генерации ошибок
function generateTip(text, color) {
    var tip = document.createElement('div');
    tip.className = 'tip';
    tip.style.color = color;
    tip.innerHTML = text;
    return tip;
}


//функция для очистки подсказок при повторной валидации
function removeValidation() {
    var tips = form.querySelectorAll('.tip')
    for (var i = 0; i < tips.length; i++) {
        tips[i].remove()
    }
}


//функция для проверки наличия выбранной radio кнопки
function checkSelection(radios) {
    for(var i=0; i<radios.length; i++){
        if(radios[i].checked) return true;
    }
    var error = generateTip('field is blank','red');
    radios[0].parentElement.insertBefore(error, radios[0]);
    return false;
}

// проверка значения в поле на попадание в заданный диапазон
function validateField(coordinate,min,max){
    if(coordinate.value){
        coordinate.value = coordinate.value.replace(',','.');
        if(coordinate.value<=min || coordinate.value>=max || !isNumber(coordinate.value)){
            var error = generateTip('Wrong number format','red')
            coordinate.parentElement.insertBefore(error, coordinate)

            return false;
        }
        else{
            var correct = generateTip('Correct data','green');
            coordinate.parentElement.insertBefore(correct, coordinate)
            return true;
        }
    }
    var error = generateTip('field is blank','red');
    coordinate.parentElement.insertBefore(error, coordinate);
    return false;
}


// фунция для повторной проверки, что поля заполнены верно, чтобы передать их php скрипту
function validateAll(){
    return checkSelection(xOptions)&&validateField(yCoordinate,-3,5) && validateField(rCoordinate,2,5);
}


function add_row(data) {
    table.innerHTML += data;
    document.cookie += data;
}




function load_table() { // TODO: Cookie, где и как взаимодействовать
    table.innerHTML += document.cookie.replace("data=;", "").replace("None", "");
}


$("#inpform").on("submit", function(event){
    event.preventDefault();

    console.log("Got data for check!" );
    console.log('y: ', yCoordinate.value);
    console.log('R: ', rCoordinate.value);
    removeValidation();

    if(!validateAll()){
        console.log("post canceled")
        return
    }
    console.log("data sending...")
    console.log($(this).serialize());
    $.ajax({
        url: 'php/server.php',
        method: "GET",
        data: $(this).serialize() + "&timezone=" + new Date().getTimezoneOffset(),
        dataType: "html",

        success: function(data){
            console.log(data);
            $(".validate_button").attr("disabled", false);
            $("#result_table").prepend(data);

        },
        error: function(error){
            console.log(error);
            $(".validate_button").attr("disabled", false);
        },
    })
});

$(".reset_button").on("click",function(){
    $.ajax({
        url: 'php/clear.php',
        method: "GET",
        dataType: "html",
        success: function(data){
            console.log(data);
            $("#result_table>tbody").html(data);
        },
        error: function(error){
            console.log(error);
        },
    })
})