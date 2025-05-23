
//joao victor
  document.addEventListener("DOMContentLoaded", function () {
    let banner = document.getElementById("cookieBanner"); 
    let acceptBtn = document.getElementById("acceptCookies"); 

    if (!localStorage.getItem("cookiesAccepted")) {
      banner.style.display = "flex"; 
    }    
    acceptBtn.addEventListener("click", function () {
      localStorage.setItem("cookiesAccepted", "true"); 
      banner.style.display = "none"; 
    });
  });









//Thiago

// Comportamento do botão "Voltar ao topo"
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
});

// Rolagem suave ao clicar no botão "Voltar ao topo"
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});


// Jefferson

