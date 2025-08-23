document.addEventListener("DOMContentLoaded", function() {
      document.getElementById("year").textContent = new Date().getFullYear();
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("year").textContent = new Date().getFullYear();

    // Animação de entrada para a página inteira
    setTimeout(() => {
        document.body.classList.add('entrada-animada');
    }, 100); // pequeno delay para suavidade

    // Animação de entrada para o topo (caso queira manter)
    const intro = document.querySelector('.intro-img');
    if (intro) {
        setTimeout(() => {
            intro.classList.add('entrada-animada');
        }, 200);
    }
});