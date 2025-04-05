document.addEventListener("DOMContentLoaded", () => {
    const ball = document.getElementById("ball") as HTMLElement;
    const container = document.getElementById("container") as HTMLElement;

    // Constantes de configuration
    const gravity = 0.5;
    const bounceFactor = 0.7;
    const initialVelocity = 0;
    const clickVelocity = -10;
    const minimumVelocity = 0.5;
    const resetDelay = 50;
    const transitionDuration = 200;

    // Variables qui changent pendant l'animation
    let posY = 0;
    let velocity = initialVelocity;
    let isBouncing = true;

    const animate = () => {
        if (!isBouncing) return;

        // Application de la gravité
        velocity += gravity;
        posY += velocity;

        // Collision avec le sol
        if (posY >= container.clientHeight - ball.clientHeight) {
            posY = container.clientHeight - ball.clientHeight;
            velocity *= -bounceFactor;

            // Effet d'écrasement au moment de l'impact
            ball.style.transform = `translateX(-50%) scale(1.3, 0.7)`;
            
            // Arrêt de l'animation quand la vitesse devient trop faible
            if (Math.abs(velocity) < minimumVelocity) {
                velocity = 0;
                isBouncing = false;
                setTimeout(resetBallShape, resetDelay);
            }
        } else {
            // Étirement pendant la descente et montée
            applyStretch();
        }

        // Mise à jour de la position
        ball.style.top = `${posY}px`;

        requestAnimationFrame(animate);
    };

    const applyStretch = () => {
        // Calcul de l'étirement basé sur la vitesse
        const stretchY = 1 + Math.min(Math.abs(velocity) / 15, 0.2);
        const stretchX = 1 / stretchY;
        ball.style.transform = `translateX(-50%) scale(${stretchX}, ${stretchY})`;
    };

    const resetBallShape = () => {
        // Retour à la forme normale
        ball.style.transition = "transform 0.2s ease-out";
        ball.style.transform = `translateX(-50%) scale(1, 1)`;
        
        // Nettoyage de la transition après son application
        setTimeout(() => {
            ball.style.transition = "";
        }, transitionDuration);
    };

    // Interaction utilisateur : clic pour relancer le rebond
    ball.addEventListener("click", () => {
        // Réinitialisation des propriétés pour un nouveau rebond
        velocity = clickVelocity;
        isBouncing = true;
        
        // Suppression de toute transition existante
        ball.style.transition = "";
        
        // Redémarrage de l'animation si elle était arrêtée
        if (!isBouncing) {
            animate();
        }
    });

    // Démarrage de l'animation
    animate();
});