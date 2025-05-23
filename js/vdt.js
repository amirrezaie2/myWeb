document.addEventListener("DOMContentLoaded", function() 
{
    let images = document.querySelectorAll("img");
    images.forEach(function(img) 
    {
        if (img.getAttribute('data-src')) 
        {
            img.setAttribute('src', img.getAttribute('data-src'));
        }
    });
});