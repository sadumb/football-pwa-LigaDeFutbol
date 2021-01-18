// REGISTER SERVICE WORKER
const swRegister = () => {
  if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
      .then(function() {
      console.log('Pendaftaran ServiceWorker berhasil');
      })
      .catch(function(){
      console.log('Pendaftaran ServiceWorker gagal');
      });
  })
  } else {
  console.log("ServiceWorker belum didukung browser ini.")
  }
}

// Periksa fitur Notification API
const notifyRegister = () => {
  if ("Notification" in window) {
  requestPermission();
  } else {
  console.error("Browser tidak mendukung notifikasi.");
  }
}

// Meminta ijin menggunakan Notification API
const requestPermission = () => {
Notification.requestPermission().then(function (result) {
    if (result === "denied") {
    console.log("Fitur notifikasi tidak diijinkan.");
    return;
    } else if (result === "default") {
    console.error("Pengguna menutup kotak dialog permintaan ijin.");
    return;
    }
    
    console.log("Fitur notifikasi diijinkan.");
});
}

function showNotifikasiSederhana() {
  const title = 'Notifikasi Sederhana';
  const options = {
      'body': 'Berhasil menambahkan pertandingan!',
      'icon': '/icon.png',
  }
  if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(title, options);
      });
  } else {
      console.error('FItur notifikasi tidak diijinkan.');
  }
}

export { swRegister, notifyRegister, requestPermission, showNotifikasiSederhana };
