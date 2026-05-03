import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  private lastBackPress = 0;
  private timePeriodToExit = 2000;

  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Mendaftarkan event back button dari perangkat keras Android
      this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
        const currentUrl = this.router.url;
        
        // Cek apakah pengguna berada di halaman tab utama
        if (currentUrl === '/tabs/lokasi' || currentUrl === '/tabs/pengaturan') {
          const currentTime = new Date().getTime();
          
          if (currentTime - this.lastBackPress < this.timePeriodToExit) {
            // Keluar jika ditekan dua kali dalam interval waktu 2 detik
            App.exitApp();
          } else {
            // Tampilkan pesan jika baru ditekan sekali
            this.showExitToast();
            this.lastBackPress = currentTime;
          }
        } else {
          // Jika berada di sub-halaman (detail, edit, tambah), kembalikan kontrol ke Ionic
          processNextHandler();
        }
      });
    });
  }

  async showExitToast() {
    const toast = await this.toastCtrl.create({
      message: 'Ketuk lagi sekali untuk keluar',
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    await toast.present();
  }
}
