function sanitizeInput(data) {
    return data.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const userInput = new URLSearchParams(window.location.search).get('user_input') || '';

const sanitizedInput = sanitizeInput(userInput);

console.log("Input : ", sanitizedInput);


async function fetchUserData(username) {
    try {
        const response = await fetch('/api/getUserData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        });

        const data = await response.json();

        if (data.user) {
            console.log("user : ", data.user.username);
        } else {
            console.log("IDK");
        }
    } catch (error) {
        console.error("SERVER ERROR...!", error);
    }
}