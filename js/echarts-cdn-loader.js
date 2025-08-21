// 轻量 ECharts 多CDN加载器（不改变业务渲染逻辑）
// 用法：在页面中引入本文件，它会自动加载 ECharts 并提供等待 Promise。
(function () {
  if (window.echarts && typeof window.echarts.init === 'function') {
    window.echartsReadyPromise = Promise.resolve();
    window.waitForECharts = () => window.echartsReadyPromise;
    return;
  }

  const VERSION = '5.4.3';
  const cdnSources = [
    // 中国内地优先
    `https://cdn.bootcdn.net/ajax/libs/echarts/${VERSION}/echarts.min.js`,
    `https://lib.baomitu.com/echarts/${VERSION}/echarts.min.js`,
    `https://cdn.staticfile.org/echarts/${VERSION}/echarts.min.js`,
    // 其他备用（相对更稳定的边缘节点）
    `https://gcore.jsdelivr.net/npm/echarts@${VERSION}/dist/echarts.min.js`,
    `https://fastly.jsdelivr.net/npm/echarts@${VERSION}/dist/echarts.min.js`,
    `https://unpkg.com/echarts@${VERSION}/dist/echarts.min.js`,
    `https://cdnjs.cloudflare.com/ajax/libs/echarts/${VERSION}/echarts.min.js`,
    // 之前使用的 jsDelivr 标准节点，放在最后
    `https://cdn.jsdelivr.net/npm/echarts@${VERSION}/dist/echarts.min.js`
  ];

  let resolved = false;
  let currentIndex = 0;

  function loadFrom(url, timeoutMs = 8000) {
    return new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = url;
      s.async = true;
      const timer = setTimeout(() => {
        cleanup(false, `timeout ${timeoutMs}ms`);
      }, timeoutMs);

      function cleanup(success, reason) {
        s.onload = s.onerror = null;
        clearTimeout(timer);
        resolve({ success, url, reason });
      }

      s.onload = () => {
        if (window.echarts && typeof window.echarts.init === 'function') {
          cleanup(true);
        } else {
          cleanup(false, 'loaded-but-missing-echarts');
        }
      };
      s.onerror = () => cleanup(false, 'network-error');
      document.head.appendChild(s);
    });
  }

  async function ensureECharts() {
    if (resolved) return;
    for (currentIndex = 0; currentIndex < cdnSources.length; currentIndex++) {
      const url = cdnSources[currentIndex];
      const { success } = await loadFrom(url);
      if (success) {
        resolved = true;
        break;
      }
      // 小间隔后尝试下一个源
      await new Promise(r => setTimeout(r, 250));
    }
    if (!resolved) throw new Error('All CDN sources failed for ECharts');
  }

  // 对外暴露等待 Promise
  window.echartsReadyPromise = (async () => {
    if (window.echarts && typeof window.echarts.init === 'function') return;
    try {
      await ensureECharts();
    } catch (e) {
      console.error('ECharts 加载失败：', e.message);
      throw e;
    }
  })();

  window.waitForECharts = () => window.echartsReadyPromise;
})();

