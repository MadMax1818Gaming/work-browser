/* Motion and Anime.js micro-interactions. Gracefully degrades if the CDN is unavailable. */
(async () => {
  try {
    const [{ animate: animeAnimate, stagger }, { animate: motionAnimate }] = await Promise.all([
      import("https://cdn.jsdelivr.net/npm/animejs@4.5.0/+esm"),
      import("https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm")
    ]);
    const root = document.getElementById("viewRoot");
    const enter = () => {
      const items = root.querySelectorAll(".page-heading,.stat-card,.panel,.project-card,.integration-card,.setting-card,.search-hero");
      if (items.length) animeAnimate(items, {
        opacity: [0, 1], y: [13, 0], duration: 430,
        delay: stagger(38), ease: "out(3)"
      });
    };
    new MutationObserver(enter).observe(root, { childList: true });
    document.addEventListener("pointerover", event => {
      const target = event.target.closest(".primary,.secondary,.browser-tab,.nav-item,.icon-button,.new-browser-tab");
      if (target && !target.disabled) motionAnimate(target, { scale: 1.035 }, { type: "spring", stiffness: 420, damping: 22 });
    });
    document.addEventListener("pointerout", event => {
      const target = event.target.closest(".primary,.secondary,.browser-tab,.nav-item,.icon-button,.new-browser-tab");
      if (target) motionAnimate(target, { scale: 1 }, { type: "spring", stiffness: 420, damping: 24 });
    });
    enter();
  } catch (error) {
    console.info("Optional animation libraries unavailable; CSS transitions remain active.", error);
  }
})();