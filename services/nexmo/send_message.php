<?php
require_once "../composerphpslim/vendor/autoload.php";

//$message = $_POST["message"];
$number = $_POST["number"];
$company_name = $_POST["company_name"];

/*$basic  = new \Nexmo\Client\Credentials\Basic("0a5a6a07", "23a817b0bb8f3b8f");
$client = new \Nexmo\Client($basic);

$message = $client->message()->send([
    'to' => $number,
    'from' => $company_name,
    'text' => $message
]);

echo json_encode($message);*/

/*$message = '';
if (empty($_POST['msisdn']) || empty($_POST['message'])) {
    $message = 'All fields need to be filled in';
} else {
    $url = 'http://api.labsmobile.com/clients/';
    $username = 'acct01';
    $password = 'acct01pwd';
    $sms = '<sms>
        <recipient>
            <msisdn>:MSISDN</msisdn>
        </recipient>
        <message>:MESSAGE</message>
        <acklevel>handset</acklevel>
        <ackurl>http://clientserver.com/motest.php</ackurl>
        </sms>';
    $sms = utf8_encode(str_replace(array(':MSISDN', ':MESSAGE'), array($_POST['msisdn'], $_POST['message']), $sms));

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, $username.':'.$password);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'XmlData='.$sms);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    $result = curl_exec($ch); curl_close($ch);
    $message = htmlentities('Message has been sent.<br />Details:' . "<br />" . $result);
}*/

?>