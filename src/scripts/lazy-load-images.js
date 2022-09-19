document.addEventListener("DOMContentLoaded", () => {
  const images = Array.from(document.querySelectorAll("img"));

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      // @ts-ignore src attribute on Element
      entry.target.src = entry.target.getAttribute("data-src");
      imageObserver.unobserve(entry.target);
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});
