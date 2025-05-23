<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

function generateRandomEmail() 
{
    $randomString = bin2hex(random_bytes(6));
    $randomEmail = $randomString . "@AmirRezaie.com";
    
    if (filter_var($randomEmail, FILTER_VALIDATE_EMAIL)) 
    {
        return $randomEmail;
    }
     
    else 
    {
        return false;
    }
}

$email = generateRandomEmail();

if ($email) 
{
    echo json_encode(['success' => true, 'email' => $email]);
} 
else 
{
    echo json_encode(['success' => false, 'message' => 'خطا در ایجاد ایمیل']);
}
?>