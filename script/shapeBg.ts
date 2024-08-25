export function generateRandomRedSquares() {
    const maxSquares = 50;
    const activeSquares: HTMLDivElement[] = [];

    const generateSquare = () => {
        const body = document.body;
        const square = document.createElement('div');

        const size = Math.random() * 50 + 20; 
        const rotation = Math.random() * 24 - 12; 
        const animationId = `moveUpAndFadeOut-${Math.random().toString(36).substr(2, 9)}`; 

        square.style.position = 'absolute';
        square.style.width = `${size}px`;
        square.style.height = `${size}px`;
        square.style.backgroundImage = 'url(/portfolio/square.svg)'; 
        square.style.backgroundSize = 'contain'; 
        square.style.backgroundRepeat = 'no-repeat'; 
        square.style.backgroundPosition = 'center';
        square.style.left = `${Math.random() * (window.innerWidth - size)}px`;
        square.style.top = `${window.innerHeight}px`;  
        square.style.opacity = '1';
        square.style.zIndex = '-1';  

        const animationDuration = Math.random() * 5 + 5;
        const fadeOutDuration = 2;

        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = `
            @keyframes ${animationId} {
                0% {
                    transform: translateY(0) rotate(${rotation}deg);
                    opacity: 0;
                }
                50% {
                    opacity: .2; /* Partially visible */
                }
                100% {
                    transform: translateY(-100vh) rotate(${rotation}deg); /* Move to the top of the viewport */
                    opacity: 0; /* Fade out */
                }
            }
        `;
        document.head.appendChild(styleSheet);
        square.style.animation = `${animationId} ${animationDuration + fadeOutDuration}s linear`;

        body.appendChild(square);
        activeSquares.push(square);

        const handleVisibilityChange = () => {
            if (document.hidden) {
                square.style.animationPlayState = 'paused';
            } else {
                square.style.animationPlayState = 'running';
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        const cleanup = () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            body.removeChild(square);

            document.head.removeChild(styleSheet);
        };

        square.addEventListener('animationend', cleanup);

        setTimeout(() => {
            square.style.transition = `opacity ${fadeOutDuration}s ease-out`;
            square.style.opacity = '0';
        }, animationDuration * 1000);

        if (activeSquares.length > maxSquares) {
            const oldestSquare = activeSquares.shift();
            if (oldestSquare) {
                oldestSquare.remove();
            }
        }
    };

    const intervalId = setInterval(() => {
        generateSquare();
    }, 500);

    return () => {
        clearInterval(intervalId);
        // Remove all dynamically added keyframes
        document.querySelectorAll('style[id^="moveUpAndFadeOut-"]').forEach(style => style.remove());
    };
}
