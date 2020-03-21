export function animate(callback: (progress: number) => void, duration: number = 500) {
    const start = Date.now();
    const tick = () => {
        const now = Date.now();
        const progress = Math.min(1, (now - start) / duration);

        callback(progress);

        if (progress === 1)
            return;

        requestAnimationFrame(tick);
    };

    tick();
}
