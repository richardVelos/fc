<?php
if ((isset($_POST['name'])) && (strlen(trim($_POST['name'])) > 0)) {
	$name = stripslashes(strip_tags($_POST['name']));
} else {$name = 'No name entered';}
if ((isset($_POST['email'])) && (strlen(trim($_POST['email'])) > 0)) {
	$email = stripslashes(strip_tags($_POST['email']));
} else {$email = 'No email entered';}
if ((isset($_POST['message'])) && (strlen(trim($_POST['message'])) > 0)) {
	$message = stripslashes(strip_tags($_POST['message']));
} else {$message = 'No message entered';}
	
$recipient = "richard@velosmarketing.com";
$subject = "FriendComp.com Contact from: " . $name;
  
if(mail($recipient, $subject, $message, "From: mail@friendcomp.com\r\nReply-To: $email\r\nX-Mailer: DT_formmail"))
{
      echo "1";
}
else {
      echo "0";
}

?>