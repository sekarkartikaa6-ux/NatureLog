import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pengaturan',
  templateUrl: 'pengaturan.page.html',
  styleUrls: ['pengaturan.page.scss'],
  standalone: false,
})
export class PengaturanPage {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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

  async exportData() {
    const data = localStorage.getItem('nature_notes');
    const notes = data ? JSON.parse(data) : [];

    if (notes.length === 0) {
      const toast = await this.toastCtrl.create({
        message: 'Tidak ada data untuk diekspor.',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      await toast.present();
      return;
    }

    const exportObj = {
      app: 'NatureLog',
      version: '1.0',
      exportDate: new Date().toISOString(),
      totalNotes: notes.length,
      notes: notes
    };

    const jsonStr = JSON.stringify(exportObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const date = new Date();
    const fileName = `naturelog_backup_${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}.json`;

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const toast = await this.toastCtrl.create({
      message: `${notes.length} catatan berhasil diekspor!`,
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    await toast.present();
  }

  triggerImport() {
    this.fileInput.nativeElement.value = '';
    this.fileInput.nativeElement.click();
  }

  async importData(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const content = JSON.parse(reader.result as string);

        // Validate structure
        let notes: any[];
        if (content.notes && Array.isArray(content.notes)) {
          notes = content.notes;
        } else if (Array.isArray(content)) {
          notes = content;
        } else {
          throw new Error('Format file tidak valid');
        }

        // Validate each note has required fields
        const requiredFields = ['id', 'title', 'category', 'location', 'date'];
        for (const note of notes) {
          for (const field of requiredFields) {
            if (!note[field]) {
              throw new Error(`Data tidak valid: field "${field}" tidak ditemukan`);
            }
          }
        }

        const existingData = localStorage.getItem('nature_notes');
        const existingNotes = existingData ? JSON.parse(existingData) : [];

        if (existingNotes.length > 0) {
          const alert = await this.alertCtrl.create({
            header: 'Impor Data',
            message: `Ditemukan ${notes.length} catatan dari file. Anda sudah memiliki ${existingNotes.length} catatan. Pilih metode impor:`,
            buttons: [
              { text: 'Batal', role: 'cancel' },
              {
                text: 'Gabungkan',
                handler: async () => {
                  const existingIds = new Set(existingNotes.map((n: any) => n.id));
                  const newNotes = notes.filter((n: any) => !existingIds.has(n.id));
                  const merged = [...newNotes, ...existingNotes];
                  localStorage.setItem('nature_notes', JSON.stringify(merged));
                  const toast = await this.toastCtrl.create({
                    message: `${newNotes.length} catatan baru ditambahkan! (${merged.length} total)`,
                    duration: 2000,
                    color: 'success',
                    position: 'top'
                  });
                  await toast.present();
                }
              },
              {
                text: 'Timpa Semua',
                role: 'destructive',
                handler: async () => {
                  localStorage.setItem('nature_notes', JSON.stringify(notes));
                  const toast = await this.toastCtrl.create({
                    message: `${notes.length} catatan berhasil diimpor!`,
                    duration: 2000,
                    color: 'success',
                    position: 'top'
                  });
                  await toast.present();
                }
              }
            ]
          });
          await alert.present();
        } else {
          localStorage.setItem('nature_notes', JSON.stringify(notes));
          const toast = await this.toastCtrl.create({
            message: `${notes.length} catatan berhasil diimpor!`,
            duration: 2000,
            color: 'success',
            position: 'top'
          });
          await toast.present();
        }
      } catch (error: any) {
        const toast = await this.toastCtrl.create({
          message: error.message || 'Gagal membaca file. Pastikan file JSON valid.',
          duration: 3000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
      }
    };
    reader.readAsText(file);
  }
}
