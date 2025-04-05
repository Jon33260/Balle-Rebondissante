document.addEventListener("DOMContentLoaded", function () {
    const ball = document.getElementById("ball");
    const container = document.getElementById("container");
    const gravity = 0.5;
    const bounceFactor = 0.7;
    
    let posY = container.clientHeight / 4;
    let velocity = 0;
    let isBouncing = true;
    
    function animate() {
        if (!isBouncing)
            return;
        
        velocity += gravity;
        posY += velocity;
        
        // Collision avec le sol
        if (posY >= container.clientHeight - ball.clientHeight) {
            posY = container.clientHeight - ball.clientHeight;
            velocity *= -bounceFactor;
            // Squash visible UNIQUEMENT au moment de l'impact
            ball.style.transform = "translateX(-50%) scale(1.3, 0.7)";
            // Quand la balle s'arrête, elle REDEVIENT 100% RONDE
            if (Math.abs(velocity) < 1) {
                velocity = 0;
                isBouncing = false;
                setTimeout(resetBallShape, 50); 
            }
        }
        else {
            // Étirement pendant la descente et montée
            applyStretch();
        }
        // Mise à jour de la position
        ball.style.top = "".concat(posY, "px");
        requestAnimationFrame(animate);
    }
    
    function applyStretch() {
        const stretchY = 1 + Math.min(Math.abs(velocity) / 15, 0.2);
        const stretchX = 1 / stretchY;
        ball.style.transform = "translateX(-50%) scale(".concat(stretchX, ", ").concat(stretchY, ")");
    }
    
    function resetBallShape() {
        ball.style.transform = "translateX(-50%) scale(1,1)";
        ball.style.transition = "transform 0.2s ease-out"; // Ajoute une transition fluide
        setTimeout(function () { return ball.style.transition = ""; }, 200);
    }
    
    // Interaction utilisateur : clique pour relancer le rebond
    ball.addEventListener("click", function () {
        velocity = -10;
        isBouncing = true;
        animate();
    });
    
    animate();
});
