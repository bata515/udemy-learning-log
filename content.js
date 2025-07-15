let watchTime = 0;
let lastCheck = Date.now();
let lastPushedTime = 0;

setInterval(() => {
  const video = document.querySelector('video');

  if (video && !video.paused && !video.ended) {
    const now = Date.now();
    watchTime += (now - lastCheck) / 1000;
    lastCheck = now;

    console.log(`視聴時間: ${Math.floor(watchTime)}秒`);

    if (watchTime - lastPushedTime >= 3600) { // 3600秒 (1時間) ごとにプッシュ
      console.log('1時間経過、githubへpushします');
      fetch('http://localhost:3001/push', { method: 'POST' });
      lastPushedTime = watchTime;
    }

  } else {
    lastCheck = Date.now();
  }
}, 5000);
