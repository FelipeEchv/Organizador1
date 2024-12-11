import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  query: string = '';
  results: any[] = [];

  constructor(private searchService: SearchService) {}

  onSearch() {
    if (this.query.trim() === '') {
      this.results = [];
      return;
    }
  
    this.searchService.search(this.query).subscribe(
      (data: any) => {
        console.log('Respuesta de la API:', data); // Para depuración
        this.results = data.RelatedTopics;
      },
      (error) => {
        console.error('Error al realizar la búsqueda:', error);
        this.results = [];
      }
    );
  }

}
  
