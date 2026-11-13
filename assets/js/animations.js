/* Page transitions and button feedback using Anime.js + Motion. */
(async () => {
  const root = document.getElementById("viewRoot");
  if (!root) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  try {
    const [
      { animate: animeAnimate, stagger },
      { animate: motionAnimate, hover }
    ] = await Promise.all([
      import("https://cdn.jsdelivr.net/npm/animejs@4.5.0/+esm"),
      import("https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm")
    ]);

    const enter = () => {
      if (reduced) return;
      const items = root.querySelectorAll(
        ".page-heading,.stat-card,.panel,.project-card,.integration-card,.setting-card,.search-hero"
      );
      if (!items.length) return;
      animeAnimate(items, {
        opacity: [0, 1],
        y: [18, 0],
        duration: 560,
        delay: stagger(55),
        ease: "out(3)"
      });
    };

    let frame = 0;
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(enter);
    });
    observer.observe(root, { childList: true, subtree: false });

    if (!reduced) {
      hover(".primary,.secondary,.danger,.browser-tab,.nav-item,.icon-button,.new-browser-tab", element => {
        const controls = motionAnimate(
          element,
          { y: -2, scale: 1.025 },
          { type: "spring", stiffness: 430, damping: 25, mass: 0.55 }
        );
        return () => motionAnimate(
          element,
          { y: 0, scale: 1 },
          { type: "spring", stiffness: 430, damping: 28, mass: 0.55 }
        );
      });

      document.addEventListener("pointerdown", event => {
        const target = event.target.closest(".primary,.secondary,.danger,.browser-tab,.icon-button,.new-browser-tab");
        if (target && !target.disabled) {
          motionAnimate(target, { scale: 0.965, y: 0 }, { type: "spring", stiffness: 650, damping: 24 });
        }
      });
      document.addEventListener("pointerup", event => {
        const target = event.target.closest(".primary,.secondary,.danger,.browser-tab,.icon-button,.new-browser-tab");
        if (target && !target.disabled) {
          motionAnimate(target, { scale: 1.015, y: -1 }, { type: "spring", stiffness: 500, damping: 25 });
        }
      });
    }

    document.addEventListener("click", event => {
      const target = event.target.closest(".primary,.secondary,.danger,.browser-tab,.icon-button,.new-browser-tab");
      if (!target || reduced) return;
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement("span");
      const diameter = Math.max(rect.width, rect.height) * 1.5;
      ripple.className = "button-ripple";
      ripple.style.width = ripple.style.height = diameter + "px";
      ripple.style.left = (event.clientX - rect.left - diameter / 2) + "px";
      ripple.style.top = (event.clientY - rect.top - diameter / 2) + "px";
      target.appendChild(ripple);
      animeAnimate(ripple, {
        scale: [0.15, 1],
        opacity: [0.28, 0],
        duration: 520,
        ease: "out(3)",
        onComplete: () => ripple.remove()
      });
    });

    enter();
  } catch (error) {
    console.info("Motion effects unavailable; CSS interaction states remain active.", error);
  }
})();