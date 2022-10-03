<?php
$subject    = 'E-mail from example'; // Subject of your email
$to         = 'e-mail@example.com'; //Your e-mail address
$headers    = 'MIME-Version: 1.0' . "\r\n" .
              'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$message    = 'Name: ' . $_REQUEST['name'] . ' <br/>' .
              'E-mail: ' . $_REQUEST['email'] . ' <br/>' .
              'Message: ' . $_REQUEST['message'];
if (@mail($to, $subject, $message, $headers))
{
 echo 'your message send';
}
else
{
 echo 'failed';
}
?>