<?php
// header('Access-Control-Allow-Origin: *');




// Проверка на попадание в область

function check_first_area($x, $y, $r){
	return ($x>=0 && $y<=0 && sqrt($x*$x+$y*$y)<=$r);
}

function check_second_area($x, $y, $r){
	return ($x<=0 && $y<=0 && $x<=$r && $y<=$r);
}

function check_third_area($x, $y, $r){
	return ($x<=0 && $y>=0 && $y<=$x+$r/2);
}

$x = @$_GET["x_coordinate"];
$y = @$_GET["y_coordinate"];
$r = @$_GET["r_coordinate"];
$timezone= @$_GET["timezone"];

    $is_inside = check_first_area($x, $y, $r) || check_second_area($x, $y, $r) || check_third_area($x, $y, $r);
	$hit_fact = $is_inside ? "Hit": "Miss";
	$current_time = date("j M o G:i:s", time()-$timezone*60);
	$execution_time = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);
    $res = "<tr class='columns'>" .
        "<td> $x </td>" .
        "<td> $y </td>" .
        "<td> $r </td>" .
        "<td> $hit_fact </td>" .
        "<td> $current_time </td>" .
        "<td> $execution_time </td>" .
        "</tr>";
    echo $res;




?>