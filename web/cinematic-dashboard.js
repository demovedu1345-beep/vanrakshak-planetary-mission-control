/* Cinematic film background, HLS playback, editorial loading sequence and restrained GSAP motion. */
(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  const scrollArea = $("#scrollArea");
  const video = $("#ambientVideo");
  const sidebar = $("#sidebar");
  const scrim = $("#workspaceScrim");
  let lenis = null;
  let lenisTicker = null;
  let coverTimeline = null;
  let fogEffect = null;
  let fogStarted = false;

  function loadScript(src, id) {
    return new Promise((resolve, reject) => {
      const existing = id && document.getElementById(id);
      if (existing) {
        if (existing.dataset.loaded === "true") return resolve();
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      const script = document.createElement("script");
      if (id) script.id = id;
      script.src = src;
      script.async = true;
      script.onload = () => { script.dataset.loaded = "true"; resolve(); };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Vanta FOG is a desktop-only fallback when the supplied HLS film cannot play.
  // It is not stacked over a working video, and it never replaces the existing Three.js globe.
  async function initFogFallback() {
    if (fogStarted || reduced || !finePointer || innerWidth < 1050) return;
    fogStarted = true;
    try {
      await loadScript("https://cdn.jsdelivr.net/npm/three@0.134.0/build/three.min.js", "earthscope-fog-three");
      await loadScript("https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.fog.min.js", "earthscope-vanta-fog");
      if (!window.VANTA || !window.VANTA.FOG || !window.THREE) return;
      fogEffect = window.VANTA.FOG({
        el: $(".ambient"),
        THREE: window.THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: .72,
        scaleMobile: .4,
        highlightColor: 0x789ab9,
        midtoneColor: 0x25364b,
        lowlightColor: 0x121923,
        baseColor: 0x090909,
        blurFactor: .72,
        speed: .35,
        zoom: .82
      });
      document.documentElement.dataset.fogFallback = "active";
      window.addEventListener("pagehide", () => fogEffect && fogEffect.destroy(), { once: true });
    } catch (error) {
      console.info("Volumetric background unavailable; filmic CSS fallback remains active.", error);
    }
  }

  // Once-per-tab editorial loading moment; returning users reach the dashboard immediately.
  function runLoader() {
    const overlay = $("#cinematicLoader");
    const counter = $("#loaderCounter");
    const progress = $("#loaderProgress");
    const word = $("#loaderWord");
    if (!overlay || !counter || !progress || !word || reduced) {
      if (overlay) overlay.remove();
      return Promise.resolve();
    }
    try {
      if (sessionStorage.getItem("earthscope-cinematic-intro") === "done") {
        overlay.remove();
        return Promise.resolve();
      }
      sessionStorage.setItem("earthscope-cinematic-intro", "done");
    } catch (_) { /* Storage may be blocked; the intro still runs once for this page. */ }

    const words = ["Observe", "Understand", "Protect"];
    let start = 0, frame = 0, finished = false;
    const duration = 1150;
    let wordIndex = 0;
    const wordTimer = window.setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      if (gsap) {
        gsap.fromTo(word, { y: 12, autoAlpha: 0, filter: "blur(5px)" }, {
          y: 0, autoAlpha: 1, filter: "blur(0px)", duration: .32, ease: "power2.out"
        });
      }
      word.textContent = words[wordIndex];
    }, 900);
    return new Promise((resolve) => {
      const tick = (now) => {
        if (!start) start = now;
        const ratio = Math.min(1, (now - start) / duration);
        const count = Math.round(ratio * 100);
        counter.textContent = String(count).padStart(3, "0");
        progress.style.transform = "scaleX(" + ratio + ")";
        if (ratio < 1) {
          frame = requestAnimationFrame(tick);
        } else if (!finished) {
          finished = true;
          window.clearInterval(wordTimer);
          window.setTimeout(() => {
            if (gsap) {
              gsap.to(overlay, {
                autoAlpha: 0, duration: .42, ease: "power2.out",
                onComplete: () => { overlay.remove(); resolve(); }
              });
            } else {
              overlay.remove(); resolve();
            }
          }, 180);
        }
      };
      frame = requestAnimationFrame(tick);
      window.addEventListener("pagehide", () => {
        cancelAnimationFrame(frame);
        window.clearInterval(wordTimer);
      }, { once: true });
    });
  }

  // Cinematic Earth-from-space MP4 background. Direct MP4 avoids the extra HLS runtime.
  async function initAmbientVideo() {
    if (!video) return;
    const source = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4";
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.src = source;

    video.addEventListener("playing", () => {
      video.classList.remove("video-paused", "video-failed");
      document.documentElement.dataset.earthVideo = "playing";
    }, { once: true });
    video.addEventListener("error", () => {
      video.classList.add("video-failed");
      document.documentElement.dataset.earthVideo = "fallback";
      initFogFallback();
    }, { once: true });

    try {
      video.load();
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch((error) => {
          video.classList.add("video-paused");
          initFogFallback();
          console.info("Earth background autoplay unavailable; fallback atmosphere active.", error);
        });
      }
    } catch (error) {
      // Keep the premium dark background and optional fog when autoplay is restricted.
      video.classList.add("video-paused");
      initFogFallback();
      console.info("Earth background autoplay unavailable; fallback atmosphere active.", error);
    }
  }

  function setWorkspaceDrawer(open) {
    if (!sidebar) return;
    sidebar.classList.toggle("open", open);
    document.body.classList.toggle("workspaces-open", open);
    const trigger = $('[data-open-workspaces]');
    if (trigger) trigger.setAttribute("aria-expanded", String(open));
    const mobileToggle = $(".portfolio-mobile-menu");
    if (mobileToggle) mobileToggle.setAttribute("aria-expanded", String(open));
  }
  document.addEventListener("click", (event) => {
    const open = event.target.closest("[data-open-workspaces]");
    if (open) {
      event.preventDefault();
      const shouldOpen = open.classList.contains("portfolio-mobile-menu")
        ? !sidebar?.classList.contains("open")
        : true;
      setWorkspaceDrawer(shouldOpen);
      return;
    }
    if (event.target === scrim || event.target.closest("[data-close-workspaces]")) {
      setWorkspaceDrawer(false);
      return;
    }
    if (event.target.closest(".sidebar .nav-btn")) setWorkspaceDrawer(false);
    if (event.target.closest(".portfolio-nav [data-page]")) setWorkspaceDrawer(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setWorkspaceDrawer(false);
  });

  function initLenis() {
    if (reduced || !finePointer || !scrollArea || !window.Lenis || !gsap) return;
    try {
      lenis = new window.Lenis({
        wrapper: scrollArea,
        content: $("#page"),
        smoothWheel: true,
        syncTouch: false,
        lerp: .085,
        wheelMultiplier: .82,
        touchMultiplier: 1,
        overscroll: true
      });
      lenis.on("scroll", () => {
        if (ScrollTrigger) ScrollTrigger.update();
      });
      lenisTicker = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(lenisTicker);
      gsap.ticker.lagSmoothing(0);
      window.addEventListener("beforeunload", () => {
        if (lenisTicker) gsap.ticker.remove(lenisTicker);
        if (lenis) lenis.destroy();
      }, { once: true });
    } catch (error) {
      console.info("Lenis enhancement skipped; native scrolling remains active.", error);
    }
  }

  function animatePageHeading(view) {
    if (!gsap || reduced || !view) return;
    const heading = $(".page-head h1", view);
    const eyebrow = $(".page-head .eyebrow", view);
    const description = $(".page-head p", view);
    const meta = $(".page-head .head-meta", view);
    const items = [eyebrow, heading, description, meta].filter(Boolean);
    if (!items.length) return;
    gsap.fromTo(items,
      { y: 20, autoAlpha: 0, filter: "blur(8px)" },
      { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: .86, stagger: .085, ease: "power3.out", clearProps: "filter,opacity,visibility,transform" }
    );
  }

  const revealed = new WeakSet();
  function setupScrollReveals(view) {
    if (!view || !gsap || reduced) return;
    const selector = ".panel,.signal,.stat-card,.feature-grid > button,.mission-card,.notice,.launch-grid > button,.report-builder";
    const targets = $$(selector, view).filter((element) => !revealed.has(element));
    if (!targets.length) return;
    targets.forEach((element) => {
      revealed.add(element);
      if (ScrollTrigger && scrollArea) {
        ScrollTrigger.create({
          trigger: element,
          scroller: scrollArea,
          start: "top 91%",
          once: true,
          onEnter: () => gsap.fromTo(element,
            { y: 16, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: .62, ease: "power3.out", clearProps: "transform,opacity,visibility" }
          )
        });
      } else {
        gsap.fromTo(element, { y: 12, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: .55, ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: { trigger: element, scroller: scrollArea || window, start: "top 92%", once: true }
        });
      }
    });
  }

  function initParallax() {
    if (!scrollArea || reduced) return;
    let ticking = false;
    scrollArea.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const offset = Math.min(38, scrollArea.scrollTop * .035);
        document.documentElement.style.setProperty("--film-parallax", offset.toFixed(1) + "px");
        ticking = false;
      });
    }, { passive: true });
    if (finePointer && gsap) {
      let last = 0;
      window.addEventListener("pointermove", (event) => {
        const now = performance.now();
        if (now - last < 35) return;
        last = now;
        const x = (event.clientX / Math.max(1, innerWidth) - .5);
        const y = (event.clientY / Math.max(1, innerHeight) - .5);
            const mark = $(".portfolio-mark");
        if (mark) mark.style.setProperty("--pointer-angle", (x * 16).toFixed(2) + "deg");
        document.documentElement.style.setProperty("--film-x", (x * 5).toFixed(1) + "px");
        document.documentElement.style.setProperty("--film-y", (y * 4).toFixed(1) + "px");
      }, { passive: true });
    }
  }

  function initCoverMotion(view) {
    const cover = $("#overviewCover", view || document);
    if (!cover || !gsap || reduced) return;
    const copy = $(".cover-copy", cover);
    const aura = $(".cover-aura", cover);
    const orbit = $(".cover-orbit", cover);
    const meta = $(".cover-bottom", cover);
    if (copy) {
      gsap.fromTo(copy,
        { y: 28, autoAlpha: 0, filter: "blur(9px)" },
        { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1.05, delay: .16, ease: "power3.out", clearProps: "filter,opacity,visibility,transform" }
      );
    }
    if (meta) {
      gsap.fromTo(meta, { y: 12, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: .72, delay: .48, ease: "power3.out",
        clearProps: "opacity,visibility,transform"
      });
    }
    if (coverTimeline) {
      coverTimeline.scrollTrigger && coverTimeline.scrollTrigger.kill();
      coverTimeline.kill();
      coverTimeline = null;
    }
    if (ScrollTrigger && scrollArea && copy) {
      coverTimeline = gsap.timeline({
        scrollTrigger: {
          id: "earthscope-cover-parallax",
          trigger: cover,
          scroller: scrollArea,
          start: "top top",
          end: "bottom top",
          scrub: .7
        }
      });
      coverTimeline.to(copy, { y: -76, autoAlpha: .22, ease: "none" }, 0);
      if (aura) coverTimeline.to(aura, { scale: 1.12, opacity: .34, ease: "none" }, 0);
      if (orbit) coverTimeline.to(orbit, { y: 42, rotation: -5, opacity: .4, ease: "none" }, 0);
    }
  }

  function initNavigationMotion() {
    if (!gsap || reduced) return;
    const nav = $(".portfolio-nav");
    const topbar = $(".topbar");
    gsap.fromTo(nav, { y: -18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .7, delay: .1, ease: "power3.out", clearProps: "transform,opacity,visibility" });
    if (topbar) gsap.fromTo(topbar, { y: -8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .55, delay: .28, ease: "power3.out", clearProps: "transform,opacity,visibility" });
  }

  function observePages() {
    const root = $("#page");
    if (!root) return;
    const run = () => {
      const active = $(".page-view.active", root);
      if (!active) return;
      const pageKey = active.dataset.view;
      $(".portfolio-nav [data-page]").forEach((button) => button.classList.toggle("active", button.dataset.page === pageKey));
      animatePageHeading(active);
      setupScrollReveals(active);
      if (pageKey === "overview") initCoverMotion(active);
      else if (coverTimeline) {
        coverTimeline.scrollTrigger && coverTimeline.scrollTrigger.kill();
        coverTimeline.kill();
        coverTimeline = null;
      }
      if (ScrollTrigger) ScrollTrigger.refresh();
    };
    const observer = new MutationObserver((records) => {
      const changed = records.some((record) =>
        record.type === "attributes" && record.target.classList.contains("page-view")
      );
      if (changed) window.setTimeout(run, 80);
      if (records.some((record) => record.type === "childList" && record.addedNodes.length)) {
        const active = $(".page-view.active", root);
        if (active) window.setTimeout(() => setupScrollReveals(active), 120);
      }
    });
    observer.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ["class"] });
    window.setTimeout(run, 80);
  }

  function initHoverTilt() {
    if (!finePointer || reduced || !gsap) return;
    document.addEventListener("pointermove", (event) => {
      const card = event.target.closest(".mission-card,.feature-grid button,.launch-grid button");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / Math.max(1, rect.width) - .5;
      const y = (event.clientY - rect.top) / Math.max(1, rect.height) - .5;
      card.style.setProperty("--spot-x", ((x + .5) * 100).toFixed(1) + "%");
      card.style.setProperty("--spot-y", ((y + .5) * 100).toFixed(1) + "%");
    }, { passive: true });
  }

  async function boot() {
    const intro = runLoader();
    initAmbientVideo();
    await intro;
    initLenis();
    initParallax();
    initNavigationMotion();
    observePages();
    initHoverTilt();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();