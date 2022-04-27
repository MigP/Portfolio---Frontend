<?php
	if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {
        extract($_POST);

    	$subject="Frontend portfolio - Message";
		$body=$message;
		$to="mig06@hotmail.co.uk";
		$from = $email;
		$headers = "From:".$from;

		mail($to,$subject,$body,$headers);
	}
?>