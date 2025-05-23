document.getElementById('generate-email-btn').addEventListener('click', function() 
{
    fetch('./modal/Email.php', 
    {
        method: 'GET',
        headers: 
        {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => 
    {
        if (data.success) 
        {
            document.getElementById('email-container').innerHTML = `
                <p>Your email: <strong>${data.email}</strong></p>
                <p>Use this email to register and receive emails.</p>
            `;
            startEmailCheck(data.email);
        } 
        else 
        {
            alert('Error creating email: ' + (data.message || 'Unknown error.'));
        }
    })
    .catch(error => 
    {
        console.error('Error communicating with the server:', error);
        alert('There is a problem with the server.');
    });
});

function startEmailCheck(email) 
{
    setInterval(function() 
    {
        fetch(`./modal/CheckEmails.php?email=${encodeURIComponent(email)}`, 
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => 
        {
            if (data.success) 
            {
                const emailList = document.getElementById('received-emails');
                emailList.innerHTML = '';
                data.emails.forEach(email => 
                {
                    const emailItem = document.createElement('li');
                    emailItem.textContent = `From: ${email.sender} - Subject: ${email.subject}`;
                    emailList.appendChild(emailItem);
                });
            } 
            else 
            {
                console.error('Error fetching emails: ' + (data.message || 'Unknown error.'));
            }
        })
        .catch(error => 
        {
            console.error('Error communicating with the server:', error);
        });
    }, 5000); // Check for new emails every 5 seconds
}