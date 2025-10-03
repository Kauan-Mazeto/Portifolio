
document.addEventListener('DOMContentLoaded', function() {

    new Typed('#typing', {
        strings: ['Front-end Developer', 'Back-end Developer', 'UI/UX Designer'],
        typeSpeed: 100,
        backSpeed: 25,
        loop: true,
        showCursor: false
    });




    // --- Rough Notation Logic (Com animação de reverse garantida) ---
    const title = document.querySelector(".langs-title"); 
    let annotation = null; 
    const notationOptions = {
        type: 'circle',
        color: '#ff0000ff',
        padding: 15, 
        strokeWidth: 3,
        animationDuration: 1000 
    };
  
    // MOUSE ENTER: Cria e inicia a animação de desenho
    title.addEventListener("mouseenter", () => {
        if (annotation) return; 
        annotation = RoughNotation.annotate(title, notationOptions);
        annotation.show();
    });
    
    // MOUSE LEAVE: Inicia a animação de REVERSE (desfazendo) e remove o objeto
    title.addEventListener("mouseleave", () => {
        if (!annotation) return;
        annotation.hide(); 
        setTimeout(() => {
            if (annotation) {
                annotation.remove(); 
                annotation = null; 
            }
        }, notationOptions.animationDuration + 100); 
    });


    // --- Lógica de Empilhamento de Cartas ---
    
    const originStack = document.querySelector('.card-stack-origin');
    const destinationStack = document.querySelector('.card-stack-destination');
    const nextBtn = document.getElementById('nextCardBtn');
    const prevBtn = document.getElementById('prevCardBtn');
    
    // A ordem das cartas é invertida para que o pop() pegue a carta de cima (z-index 8)
    let originCards = Array.from(originStack.querySelectorAll('.card')).reverse();
    let destinationCards = [];
    
    // Atualiza o estado dos botões (desabilita/habilita)
    function updateButtonStates() {
        nextBtn.disabled = originCards.length === 0;
        prevBtn.disabled = destinationCards.length === 0;
    }

    // Aplica um pequeno offset para as cartas empilhadas no destino (look bagunçado organizado)
    function getDestinationTransform(index) {

        const xOffset = index * Math.random();
        const yOffset = index * 0.5;
        const rotation = index % (Math.random() * 8) === 0 ? (index * 0.3) : - (index * (Math.random(5, 3) * 3));

        return `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;
    }

    // Função principal para mover a carta
    function moveCard(direction) {
        if (direction === 'next' && originCards.length > 0) {
            const card = originCards.pop();

            // 1. Anima para a direita
            card.style.transform = 'translateX(120px) scale(1.1)';
            card.style.zIndex = 99;

            setTimeout(() => {
                // 2. Move para o destino
                destinationStack.appendChild(card);
                destinationCards.push(card);

                // 3. Aplica o estilo bagunçado do destino
                const index = destinationCards.length;
                card.style.zIndex = index + 10;
                card.style.transform = getDestinationTransform(index);
                updateButtonStates();
            }, 500); // tempo igual ao transition do CSS

        } else if (direction === 'prev' && destinationCards.length > 0) {
            const card = destinationCards.pop();

            // 1. Anima para a esquerda
            card.style.transform = 'translateX(-120px) scale(1.1)';
            card.style.zIndex = 99;

            setTimeout(() => {
                // 2. Move de volta para a origem
                originStack.prepend(card);
                originCards.push(card);

                // 3. Reseta estilos para o CSS assumir
                card.style.zIndex = '';
                card.style.transform = '';
                updateButtonStates();
            }, 500);
        }
    }

    const projetosTitle = document.querySelector(".projetos-title");
    if (projetosTitle) {
        const projetosAnnotation = RoughNotation.annotate(projetosTitle, {
            type: 'circle',
            color: '#a600ff',
            strokeWidth: 3,
            animationDuration: 800,
            padding: 20
        });

        // MOUSE ENTER: Mostra o círculo
        projetosTitle.addEventListener("mouseenter", () => {
            projetosAnnotation.show();
        });

        // MOUSE LEAVE: Esconde o círculo com animação de saída
        projetosTitle.addEventListener("mouseleave", () => {
            setTimeout(() => {
                projetosAnnotation.hide();
            }, 200);
        });
    }
    
    // Listeners
    nextBtn.addEventListener('click', () => moveCard('next'));
    prevBtn.addEventListener('click', () => moveCard('prev'));

    updateButtonStates();

    document.getElementById("year").textContent = new Date().getFullYear();
});