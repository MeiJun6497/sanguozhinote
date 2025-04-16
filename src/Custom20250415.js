document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const abbrElements = document.querySelectorAll('abbr[title]');

    abbrElements.forEach(function (abbr) {
      const tooltipText = abbr.getAttribute('title');
      
      // 移除 title，並防止部分框架重設
      abbr.removeAttribute('title');
      abbr.setAttribute('title', ''); // 強制清空，避免瀏覽器殘留快取
      abbr.setAttribute('data-tooltip', tooltipText); // 儲存原始資訊
      abbr.setAttribute('tabindex', '0');

      // 建立 tooltip 元素
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.innerText = tooltipText;
      tooltip.style.position = 'absolute';
      tooltip.style.backgroundColor = '#333';
      tooltip.style.color = '#fff';
      tooltip.style.padding = '5px 8px';
      tooltip.style.borderRadius = '4px';
      tooltip.style.fontSize = '12px';
      tooltip.style.maxWidth = '240px';
      tooltip.style.lineHeight = '1.4';
      tooltip.style.visibility = 'hidden';
      tooltip.style.zIndex = '9999';
      tooltip.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
      document.body.appendChild(tooltip);

      // 點擊 abbr 顯示 tooltip
      abbr.addEventListener('click', function (event) {
        // 關閉其他 tooltip
        document.querySelectorAll('.tooltip.visible').forEach(function (tip) {
          tip.style.visibility = 'hidden';
          tip.classList.remove('visible');
        });

        const rect = abbr.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        tooltip.style.top = `${rect.bottom + window.scrollY + 4}px`;
        tooltip.style.visibility = 'visible';
        tooltip.classList.add('visible');

        event.stopPropagation();
      });
    });

    // 點其他地方或滾動時關閉 tooltip
    document.addEventListener('click', function () {
      document.querySelectorAll('.tooltip.visible').forEach(function (tip) {
        tip.style.visibility = 'hidden';
        tip.classList.remove('visible');
      });
    });

    window.addEventListener('scroll', function () {
      document.querySelectorAll('.tooltip.visible').forEach(function (tip) {
        tip.style.visibility = 'hidden';
        tip.classList.remove('visible');
      });
    });
  }, 0); // 強制延後執行
});
