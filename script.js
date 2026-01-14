const sections = document.querySelectorAll(".section");
const lines = document.querySelectorAll(".line");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach((section) => {
  section.style.opacity = 0;
  section.style.transform = "translateY(60px)";
  section.style.transition = "all 1s ease";
  observer.observe(section);
});

lines.forEach((line) => {
  const lineObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        line.style.transform = "scaleX(1)";
        line.style.transition = "transform 1s ease";
      }
    },
    { threshold: 0.1 }
  );
  lineObserver.observe(line);
});