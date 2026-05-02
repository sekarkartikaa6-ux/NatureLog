import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pengaturan',
  templateUrl: 'pengaturan.page.html',
  styleUrls: ['pengaturan.page.scss'],
  standalone: false,
})
export class PengaturanPage {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  async clearAllData() {
    const alert = await this.alertCtrl.create({
      header: 'Hapus Semua Data',
      message: 'Apakah Anda yakin ingin menghapus semua catatan? Tindakan ini tidak dapat dibatalkan.',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Hapus Semua',
          role: 'destructive',
          handler: async () => {
            localStorage.removeItem('nature_notes');
            const toast = await this.toastCtrl.create({
              message: 'Semua data berhasil dihapus!',
              duration: 1500,
              color: 'danger',
              position: 'top'
            });
            await toast.present();
          }
        }
      ]
    });
    await alert.present();
  }

  getNoteCount(): number {
    const data = localStorage.getItem('nature_notes');
    return data ? JSON.parse(data).length : 0;
  }
}
