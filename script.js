gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero h1", {
  opacity: 0,
  y: 120,
  duration: 1.4,
  ease: "power4.out",
});

gsap.from(".hero p", {
  opacity: 0,
  y: 80,
  delay: 0.3,
});

gsap.from(".card", {
  scrollTrigger: {
    trigger: ".services",
    start: "top 70%",
  },
  y: 80,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
});

gsap.from(".stat", {
  scrollTrigger: {
    trigger: ".stats",
    start: "top 70%",
  },
  y: 60,
  opacity: 0,
  stagger: 0.2,
});
