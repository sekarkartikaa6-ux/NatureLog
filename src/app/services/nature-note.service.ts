import { Injectable } from '@angular/core';

export interface NatureNote {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  weather: string;
  description: string;
  imagePath?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NatureNoteService {
  private STORAGE_KEY = 'nature_notes';

  private categoryColors: { [key: string]: string } = {
    'Gunung': '#4CAF50',
    'Hutan': '#2E7D32',
    'Air Terjun': '#03A9F4',
    'Danau': '#2196F3',
    'Pantai': '#FF9800',
    'Cuaca': '#9C27B0',
    'Lainnya': '#9E9E9E'
  };

  private loadNotes(): NatureNote[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveNotes(notes: NatureNote[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes));
  }

  getNotes(): NatureNote[] {
    return this.loadNotes();
  }

  getNoteById(id: string): NatureNote | undefined {
    return this.loadNotes().find(n => n.id === id);
  }

  addNote(note: NatureNote): void {
    const notes = this.loadNotes();
    notes.unshift(note);
    this.saveNotes(notes);
  }

  updateNote(updated: NatureNote): void {
    let notes = this.loadNotes();
    notes = notes.map(n => n.id === updated.id ? updated : n);
    this.saveNotes(notes);
  }

  deleteNote(id: string): void {
    let notes = this.loadNotes();
    notes = notes.filter(n => n.id !== id);
    this.saveNotes(notes);
  }

  searchNotes(query: string, category?: string): NatureNote[] {
    let notes = this.loadNotes();
    if (category && category !== 'Semua') {
      notes = notes.filter(n => n.category === category);
    }
    if (query) {
      const q = query.toLowerCase();
      notes = notes.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.location.toLowerCase().includes(q)
      );
    }
    return notes;
  }

  getCategoryColor(category: string): string {
    return this.categoryColors[category] || '#9E9E9E';
  }

  getCategories(): string[] {
    return ['Gunung', 'Hutan', 'Air Terjun', 'Danau', 'Pantai', 'Cuaca', 'Lainnya'];
  }

  generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  seedSampleData(): void {
    if (this.loadNotes().length === 0) {
      const samples: NatureNote[] = [
        {
          id: this.generateId(),
          title: 'Puncak Merapi',
          category: 'Gunung',
          location: 'Bantul, Yogyakarta',
          date: '2026-04-28',
          weather: 'Cerah',
          description: 'Pendakian ke puncak Merapi yang menakjubkan. Pemandangan dari atas sangat indah dengan panorama alam yang luas membentang.',
          imagePath: ''
        },
        {
          id: this.generateId(),
          title: 'Hutan Pinus Mangunan',
          category: 'Hutan',
          location: 'Dlingo, Bantul',
          date: '2026-04-25',
          weather: 'Berawan',
          description: 'Hutan pinus yang rindang dengan suasana yang sangat tenang dan damai. Cocok untuk refreshing dan healing.',
          imagePath: ''
        },
        {
          id: this.generateId(),
          title: 'Air Terjun Sri Gethuk',
          category: 'Air Terjun',
          location: 'Gunungkidul, Yogyakarta',
          date: '2026-04-20',
          weather: 'Cerah',
          description: 'Air terjun yang indah di tengah tebing karst. Airnya jernih dan sangat menyegarkan untuk berendam.',
          imagePath: ''
        }
      ];
      this.saveNotes(samples);
    }
  }
}
