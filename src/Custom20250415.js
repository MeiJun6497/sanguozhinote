document.addEventListener("DOMContentLoaded", function () {
  const abbrs = document.querySelectorAll("abbr");
  const tooltip = document.createElement("div");
  tooltip.className = "abbr-tooltip";
  document.body.appendChild(tooltip);

  abbrs.forEach(abbr => {
    abbr.addEventListener("click", function (e) {
      const rect = abbr.getBoundingClientRect();
      tooltip.textContent = abbr.getAttribute("title");
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
      tooltip.style.display = "block";

      setTimeout(() => {
        tooltip.style.display = "none";
      }, 3000); // 3 秒後自動消失
    });
  });

  // 點擊其他地方就關閉 tooltip
  document.addEventListener("click", function (e) {
    if (!e.target.closest("abbr")) {
      tooltip.style.display = "none";
    }
  });
});
