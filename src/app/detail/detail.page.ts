import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { NatureNoteService, NatureNote } from '../services/nature-note.service';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss'],
  standalone: false,
})
export class DetailPage implements OnInit {
  note: NatureNote | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NatureNoteService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.note = this.noteService.getNoteById(id);
    }
  }

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.note = this.noteService.getNoteById(id);
    }
  }

  getCategoryColor(category: string): string {
    return this.noteService.getCategoryColor(category);
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  editNote() {
    if (this.note) {
      this.router.navigate(['/tabs/dashboard/edit', this.note.id]);
    }
  }

  async deleteNote() {
    const alert = await this.alertCtrl.create({
      header: 'Hapus Catatan',
      message: 'Apakah Anda yakin ingin menghapus catatan ini?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Hapus',
          role: 'destructive',
          handler: async () => {
            if (this.note) {
              this.noteService.deleteNote(this.note.id);
              const toast = await this.toastCtrl.create({
                message: 'Catatan berhasil dihapus!',
                duration: 1500,
                color: 'danger',
                position: 'top'
              });
              await toast.present();
              this.router.navigate(['/tabs/dashboard']);
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
