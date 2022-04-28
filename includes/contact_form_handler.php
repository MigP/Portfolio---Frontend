<?php
	if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])) {
                extract($_POST);
                $myemail = 'contact@miguelpinto.dx.am';
                $myhotmail = 'mig06@hotmail.co.uk';

                $email_address = $_POST['email'];
                $message = $_POST['message'];
                $name = $_POST['name'];

		$to = $myhotmail;
		$email_subject = "Frontend portfolio - Message from " . $name;
		$email_body = "You have received a new message. " . " Here are the details:\n Name: " . $name . "\n Email: " . $email_address . "\n Message: \n" . $message;
		
		$headers  = "MIME-Version: 1.0\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8\r\n";
		$headers = "From: " . $myemail . "\n";
		$headers .= "Reply to: " . $email_address . "\n";

		mail($to, $email_subject, $email_body, $headers);
                
                echo "success";
	}
?>
