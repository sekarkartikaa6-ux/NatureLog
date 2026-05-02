import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NatureNoteService, NatureNote } from '../services/nature-note.service';

@Component({
  selector: 'app-tambah',
  templateUrl: 'tambah.page.html',
  styleUrls: ['tambah.page.scss'],
  standalone: false,
})
export class TambahPage {
  title = '';
  location = '';
  category = '';
  weather = '';
  description = '';
  imagePath = '';
  date = new Date().toISOString().split('T')[0];

  categories: string[] = [];

  weatherOptions = [
    { name: 'Cerah', icon: 'sunny-outline' },
    { name: 'Berawan', icon: 'partly-sunny-outline' },
    { name: 'Hujan', icon: 'rainy-outline' },
    { name: 'Berangin', icon: 'flag-outline' },
    { name: 'Berkabut', icon: 'cloud-outline' },
    { name: 'Lainnya', icon: 'ellipsis-horizontal-outline' },
  ];

  constructor(
    private noteService: NatureNoteService,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    this.categories = this.noteService.getCategories();
  }

  getCategoryColor(cat: string): string {
    return this.noteService.getCategoryColor(cat);
  }

  selectWeather(w: string) {
    this.weather = w;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePath = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.imagePath = '';
  }

  async saveNote() {
    if (!this.title.trim() || !this.location.trim() || !this.category) {
      const toast = await this.toastCtrl.create({
        message: 'Mohon isi Nota, Lokasi, dan Kategori!',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      await toast.present();
      return;
    }

    const note: NatureNote = {
      id: this.noteService.generateId(),
      title: this.title.trim(),
      category: this.category,
      location: this.location.trim(),
      date: this.date,
      weather: this.weather || 'Cerah',
      description: this.description.trim(),
      imagePath: this.imagePath
    };

    this.noteService.addNote(note);

    const toast = await this.toastCtrl.create({
      message: 'Catatan berhasil disimpan!',
      duration: 1500,
      color: 'success',
      position: 'top'
    });
    await toast.present();
    this.router.navigate(['/tabs/dashboard']);
  }

  goBack() {
    this.router.navigate(['/tabs/dashboard']);
  }
}
