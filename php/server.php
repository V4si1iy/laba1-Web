<?php
// header('Access-Control-Allow-Origin: *');

function validate_number($val, $min, $max){
	return isset($val) && is_numeric($val) && ($val>$min) && ($val<$max);
}

function validate_timezone($timezone) {
	return isset($timezone);
}

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

if(validate_number($x,-2,2) && validate_number($y,-3,5) && validate_number($r,2,5) && validate_timezone($timezone)){
    $is_inside = check_first_area($x, $y, $r) || check_second_area($x, $y, $r) || check_third_area($x, $y, $r);
	$hit_fact = $is_inside ? "Hit": "Miss";
	$current_time = date("j M o G:i:s", time()-$timezone*60);
	$execution_time = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);
	    echo "<tr>";
       echo "<td>" . $result['x'] ."</td>" ;
       echo "<td>". $result['y']  ."</td>" ;
       echo "<td>". $result['r']  ."</td>" ;
       echo "<td>". $hit_fact . "</td>" ;
       echo "<td>". $current_time ."</td>" ;
       echo "<td>". $execution_time ."</td>";
       echo "</tr>";

}


?>