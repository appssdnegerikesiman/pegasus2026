const jingle = document.getElementById('jingle');
const jingleStatus = document.getElementById('jingle-status');
jingle.volume = 0.5;
jingle.addEventListener('playing', () => { jingleStatus.textContent = 'Jingle sedang diputar. Selamat bertanding!'; });
jingle.addEventListener('pause', () => { jingleStatus.textContent = 'Jingle dijeda. Tekan Putar untuk melanjutkan.'; });
jingle.addEventListener('ended', () => { jingleStatus.textContent = 'Tekan Putar untuk mendengarkan kembali.'; });
jingle.addEventListener('error', () => { jingleStatus.textContent = 'Jingle belum dapat dimuat. Silakan muat ulang halaman.'; });
jingle.play().catch(error => {
  jingleStatus.textContent = error.name === 'NotAllowedError'
    ? 'Tekan ▶ untuk memutar jingle PEGASUS.'
    : 'Tekan ▶ untuk mencoba memutar jingle.';
});
