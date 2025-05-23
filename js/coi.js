document.addEventListener('DOMContentLoaded', function () 
{
    const ipCookie = getCookie('user_ip');
    
    if (!ipCookie) {
      fetch('http://api.ipstack.com/check?access_key=f0e52fdf3d09ba8424381b213ab0e4c6')
        .then(response => response.json())
        .then(data => {
          const userIp = data.ip;
          const location = data.city + ', ' + data.region_name + ', ' + data.country_name;
          saveUserLocation(userIp, location);
          setCookie('user_ip', userIp, 365);
        })
        .catch(error => console.error('Error fetching IP location:', error));
    }
  });
  function saveUserLocation(ip, location) 
  {
    fetch('./modal/coi.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip: ip, location: location }),
    })
    .then(response => response.json())
    .then(data => console.log('Location saved:', data))
    .catch(error => console.error('Error saving location:', error));
  }
  function setCookie(name, value, days) 
  {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
  function getCookie(name) 
  {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) 
    {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  