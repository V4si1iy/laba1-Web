
var form= document.querySelector('.validate_form');
var validatedButton = document.querySelector('.validate_button');
var xOptions = document.querySelectorAll(".x");
var yCoordinate = document.querySelector(".y");
var rCoordinate = document.querySelector(".R");
var table = document.getElementById("result_table");

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


// проверка значения в поле на попадание в заданный диапазон
function validateField(coordinate,min,max){
    if(coordinate.value){
        coordinate.value = coordinate.value.replace(',','.');
        if(coordinate.value<=min || coordinate.value>=max || !isNumber(coordinate.value)){
            var error = generateTip('Wrong number format','red')
            coordinate.parentElement.insertBefore(error, coordinate)
            return false;
        }
        else return true;
    }
    var error = generateTip('Field is blank','red');
    coordinate.parentElement.insertBefore(error, coordinate);
    return false;
}


// фунция проверки, что поля заполнены верно, чтобы передать их php скрипту
function validateAll(){
    return validateField(yCoordinate,-5,3) && validateField(rCoordinate,2,5);
}

$("#inpform").on("submit", function(event){
    event.preventDefault();
    removeValidation();

    if(!validateAll()){
        return
    }
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