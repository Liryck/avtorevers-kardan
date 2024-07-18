<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];
$car = $_POST['car'];
$model = $_POST['model'];
$year = $_POST['year'];
$message = $_POST['message'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = '';                 // Наш логин
$mail->Password = '';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('', 'Avtorevers Cardan');   // От кого письмо 
$mail->addAddress('');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка з сайта';
$mail->Body    = '
		Нова заявка з сайта <br> 
	Імя: ' . $name . ' <br>
	Номер телефону: ' . $phone . '<br>
	Марка авто: ' . $car . '<br>
	Модель: ' . $model . '<br>
	Рік випуску: ' . $year . '<br>
	Повідомлення: ' . $message . '<br>;

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>