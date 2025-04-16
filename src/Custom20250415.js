document.addEventListener("DOMContentLoaded", function () {
  // 檢查所有帶有 abbr 標籤的元素
  const abbrElements = document.querySelectorAll('abbr[title]');

  abbrElements.forEach(function (abbr) {
    // 1. 建立 tooltip 元素
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = abbr.getAttribute('title');
    document.body.appendChild(tooltip);

    // 2. 點擊 abbr 顯示 tooltip
    abbr.addEventListener('click', function (event) {
      const rect = abbr.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.top + window.scrollY + rect.height}px`; // 顯示在文字下方
      tooltip.style.visibility = 'visible';  // 顯示 tooltip

      // 點擊其他地方隱藏 tooltip
      function hideTooltip() {
        tooltip.style.visibility = 'hidden';
        document.removeEventListener('click', hideTooltip);
      }

      document.addEventListener('click', hideTooltip);
      event.stopPropagation();  // 防止事件冒泡，避免觸發 document 的點擊事件
    });

    // 在 abbr 自動增加 tabindex="0" 讓它可被點擊
    abbr.setAttribute('tabindex', '0');
  });
});
