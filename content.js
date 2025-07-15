let watchTime = 0;
let lastCheck = Date.now();

setInterval(() => {
  const video = document.querySelector('video');

  if (video && !video.paused && !video.ended) {
    const now = Date.now();
    watchTime += (now - lastCheck) / 1000;
    lastCheck = now;

    console.log(`視聴時間: ${Math.floor(watchTime)}秒`);

    if (watchTime >= 60 && !localStorage.getItem('alreadyPushed')) {
      // Pythonスクリプトをローカルで起動
      fetch('http://localhost:3001/push', { method: 'POST' });
      localStorage.setItem('alreadyPushed', 'true');

        // 3時間後にフラグを削除
        setTimeout(() => {
          localStorage.removeItem('alreadyPushed');
          console.log('alreadyPushedフラグをリセットしました');
        }, 30 * 60 * 1000); // 30分＝1800000ミリ秒
    }
  } else {
    lastCheck = Date.now();
  }
}, 5000);
