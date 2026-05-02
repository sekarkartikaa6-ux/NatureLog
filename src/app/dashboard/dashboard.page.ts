import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NatureNoteService, NatureNote } from '../services/nature-note.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage {
  notes: NatureNote[] = [];
  filteredNotes: NatureNote[] = [];
  searchQuery = '';

  constructor(
    private noteService: NatureNoteService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.noteService.seedSampleData();
    this.loadNotes();
  }

  loadNotes() {
    this.notes = this.noteService.getNotes();
    this.filteredNotes = [...this.notes];
  }

  onSearch() {
    this.filteredNotes = this.noteService.searchNotes(this.searchQuery);
  }

  getCategoryColor(category: string): string {
    return this.noteService.getCategoryColor(category);
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  viewDetail(id: string) {
    this.router.navigate(['/tabs/dashboard/detail', id]);
  }
}
