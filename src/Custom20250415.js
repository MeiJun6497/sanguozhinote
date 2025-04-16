document.addEventListener("DOMContentLoaded", function () {
  const abbrElements = document.querySelectorAll('abbr[title]');

  abbrElements.forEach(function (abbr) {
    // 將 title 內容移到 data-title，並移除 title（避免原生 tooltip）
    const titleText = abbr.getAttribute('title');
    abbr.setAttribute('data-title', titleText);
    abbr.removeAttribute('title');

    // 為 abbr 加 tabindex 讓其在手機上可點擊
    abbr.setAttribute('tabindex', '0');

    // 建立 tooltip 元素
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerText = titleText;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.visibility = 'hidden';
    tooltip.style.zIndex = '9999';
    document.body.appendChild(tooltip);

    // 點擊 abbr 顯示 tooltip
    abbr.addEventListener('click', function (event) {
      const rect = abbr.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.top + window.scrollY + rect.height}px`;
      tooltip.style.visibility = 'visible';

      function hideTooltip() {
        tooltip.style.visibility = 'hidden';
        document.removeEventListener('click', hideTooltip);
      }

      document.addEventListener('click', hideTooltip);
      event.stopPropagation(); // 不讓點擊冒泡
    });
  });
});
