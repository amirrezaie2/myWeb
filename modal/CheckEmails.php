<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Mock function to simulate fetching emails from a database or service.
function fetchEmailsForAddress($email) 
{
    // In a real implementation, you would query your database or email service here.
    // Here's a mocked array of email data.
    $emails = [
        [
            'sender' => 'alice@example.com',
            'subject' => 'Welcome!'
        ],
        [
            'sender' => 'bob@example.com',
            'subject' => 'Meeting Tomorrow'
        ]
    ];
    return $emails;
}

if (isset($_GET['email'])) 
{
    $email = $_GET['email'];
    
    // Fetch emails for the specified address.
    $emails = fetchEmailsForAddress($email);
    
    echo json_encode(['success' => true, 'emails' => $emails]);
} 
else 
{
    echo json_encode(['success' => false, 'message' => 'Email address not provided.']);
}
?>