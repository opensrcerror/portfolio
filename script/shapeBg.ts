export function generateRandomRedSquares() {
    const maxSquares = 50;
    const activeSquares: HTMLDivElement[] = [];

    const generateSquare = () => {
        const body = document.body;
        const square = document.createElement('div');

        // Set square properties
        const size = Math.random() * 50 + 20;  // Random size between 20 and 70px
        const rotation = Math.random() * 24 - 12; // Random rotation between -12 and 12 degrees
        const animationId = `moveUpAndFadeOut-${Math.random().toString(36).substr(2, 9)}`; // Unique ID for keyframes

        square.style.position = 'absolute';
        square.style.width = `${size}px`;
        square.style.height = `${size}px`;
        square.style.backgroundImage = 'url(/square.svg)'; // Set SVG as background image
        square.style.backgroundSize = 'contain'; // Ensure the image fits within the square
        square.style.backgroundRepeat = 'no-repeat'; // Prevent repeating the image
        square.style.backgroundPosition = 'center'; // Center the image
        square.style.left = `${Math.random() * (window.innerWidth - size)}px`;
        square.style.top = `${window.innerHeight}px`;  // Start from the bottom
        square.style.opacity = '1';
        square.style.zIndex = '-1';  // Ensure it appears in the background

        // Define CSS keyframes for upward movement and fade-out effect
        const animationDuration = Math.random() * 5 + 5; // Random duration between 5s and 10s
        const fadeOutDuration = 2; // Duration of the fade-out effect

        // Create a style element for keyframes
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

        // Apply animation to the square
        square.style.animation = `${animationId} ${animationDuration + fadeOutDuration}s linear`;

        // Append square to the body
        body.appendChild(square);
        activeSquares.push(square);

        // Handle resizing and tab visibility changes
        const handleVisibilityChange = () => {
            if (document.hidden) {
                square.style.animationPlayState = 'paused';
            } else {
                square.style.animationPlayState = 'running';
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Ensure removal of event listeners on cleanup
        const cleanup = () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            body.removeChild(square);
            // Remove the style element after the animation is done
            document.head.removeChild(styleSheet);
        };

        // Clean up on animation end
        square.addEventListener('animationend', cleanup);

        // Ensure square is fully transparent before removal
        setTimeout(() => {
            square.style.transition = `opacity ${fadeOutDuration}s ease-out`;
            square.style.opacity = '0';
        }, animationDuration * 1000); // Start fade-out before the total duration ends

        // Limit the number of active squares
        if (activeSquares.length > maxSquares) {
            const oldestSquare = activeSquares.shift(); // Remove the oldest square
            if (oldestSquare) {
                oldestSquare.remove(); // Remove from the DOM
            }
        }
    };

    // Interval to generate red squares every 500ms
    const intervalId = setInterval(() => {
        generateSquare();
    }, 500);

    // Clean up on component unmount
    return () => {
        clearInterval(intervalId);
        // Remove all dynamically added keyframes
        document.querySelectorAll('style[id^="moveUpAndFadeOut-"]').forEach(style => style.remove());
    };
}