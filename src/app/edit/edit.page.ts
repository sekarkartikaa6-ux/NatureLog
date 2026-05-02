import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NatureNoteService, NatureNote } from '../services/nature-note.service';

@Component({
  selector: 'app-edit',
  templateUrl: 'edit.page.html',
  styleUrls: ['edit.page.scss'],
  standalone: false,
})
export class EditPage implements OnInit {
  noteId = '';
  title = '';
  location = '';
  category = '';
  weather = '';
  description = '';
  imagePath = '';
  date = '';

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
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NatureNoteService,
    private toastCtrl: ToastController
  ) {
    this.categories = this.noteService.getCategories();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const note = this.noteService.getNoteById(id);
      if (note) {
        this.noteId = note.id;
        this.title = note.title;
        this.location = note.location;
        this.category = note.category;
        this.weather = note.weather;
        this.description = note.description;
        this.imagePath = note.imagePath || '';
        this.date = note.date;
      }
    }
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

  async updateNote() {
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

    const updated: NatureNote = {
      id: this.noteId,
      title: this.title.trim(),
      category: this.category,
      location: this.location.trim(),
      date: this.date,
      weather: this.weather || 'Cerah',
      description: this.description.trim(),
      imagePath: this.imagePath
    };

    this.noteService.updateNote(updated);

    const toast = await this.toastCtrl.create({
      message: 'Catatan berhasil diperbarui!',
      duration: 1500,
      color: 'success',
      position: 'top'
    });
    await toast.present();
    this.router.navigate(['/tabs/lokasi/detail', this.noteId]);
  }
}
