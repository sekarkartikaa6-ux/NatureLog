import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NatureNoteService, NatureNote } from '../services/nature-note.service';

@Component({
  selector: 'app-pencarian',
  templateUrl: 'pencarian.page.html',
  styleUrls: ['pencarian.page.scss'],
  standalone: false,
})
export class PencarianPage {
  searchQuery = '';
  selectedCategory = 'Semua';
  filteredNotes: NatureNote[] = [];

  categoryFilters = [
    { name: 'Semua', icon: 'apps-outline', color: '#00897B' },
    { name: 'Hutan', icon: 'leaf-outline', color: '#2E7D32' },
    { name: 'Gunung', icon: 'triangle-outline', color: '#4CAF50' },
    { name: 'Pantai', icon: 'water-outline', color: '#FF9800' },
    { name: 'Cuaca', icon: 'partly-sunny-outline', color: '#9C27B0' },
    { name: 'Air Terjun', icon: 'water-outline', color: '#03A9F4' },
    { name: 'Danau', icon: 'fish-outline', color: '#2196F3' },
    { name: 'Lainnya', icon: 'ellipsis-horizontal-outline', color: '#9E9E9E' },
  ];

  constructor(
    private noteService: NatureNoteService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.doSearch();
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
    this.doSearch();
  }

  onSearch() {
    this.doSearch();
  }

  doSearch() {
    this.filteredNotes = this.noteService.searchNotes(this.searchQuery, this.selectedCategory);
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
