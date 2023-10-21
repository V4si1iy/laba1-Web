<?php

function validate_number($val, $min, $max){
    return isset($val) && is_numeric($val) && ($val>=$min) && ($val<=$max);
}

// Проверка на попадание в область

function check_first_area($x, $y, $r){
	return ($x>=0 && $y<=0 && sqrt($x*$x+$y*$y)<=$r);
}

function check_second_area($x, $y, $r){
	return ($x<=0 && $y<=0 && $x>=$r && $y>=$r);
}

function check_third_area($x, $y, $r){
	return ($x<=0 && $y>=0 && $y<=$x+$r/2);
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    die('Post is not allowed');
}

if (!isset($_SESSION['data']))
    $_SESSION['data'] = array();


$x = @$_GET["x_coordinate"];
$y = @$_GET["y_coordinate"];
$r = @$_GET["r_coordinate"];
$timezone= @$_GET["timezone"];
if(validate_number($x,-2,2) && validate_number($y,-5,3) && validate_number($r,2,5)) {

    $is_inside = check_first_area($x, $y, $r) || check_second_area($x, $y, $r) || check_third_area($x, $y, $r);
    $hit_fact = $is_inside ? "Hit" : "Miss";
    $current_time = date("j M o G:i:s", time() - $timezone * 60);
    $execution_time = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);

    $answer = array("x"=>$x, "y"=>$y, "r"=>$r, "hit_fact"=>$hit_fact, "current_time"=>$current_time, "execution_time"=>$execution_time);
    array_push($_SESSION['data'], $answer);
}
foreach ($_SESSION['data'] as $elem){
    echo "<tr class='columns'>";
    echo "<td>" . $elem['x'] . "</td>";
    echo "<td>" . $elem['y'] . "</td>";
    echo "<td>" . $elem['r'] . "</td>";
    echo "<td>" . $elem['hit_fact']  . "</td>";
    echo "<td>" . $elem['current_time']  . "</td>";
    echo "<td>" . $elem['execution_time'] . "</td>";
    echo "</tr>";
}

?>