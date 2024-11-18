import { Component, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isLoading: boolean = false;
  searchQuery: string = '';
  results: any[]= [];
  searchCompleted: boolean = false;
  currentPage: number = 1;
  pageSize: number = 20;
  totalResults: number = 0;

  @ViewChild('resultsContainer') resultsContainer!: ElementRef;

  constructor(private searchService: SearchService) {}

  onSearch() {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      this.isLoading = true;
      this.searchCompleted = false;
      this.results = [];
      this.currentPage = 1;
      this.totalResults = 0;

      const spinnerDelay: Promise<void> = new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      this.loadResults(spinnerDelay);
    } else {
      this.results = [];
      this.searchCompleted = false;
    }
  }

  loadResults(spinnerDelay?: Promise<void>) {
    this.searchService
      .createSearch(this.searchQuery, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          console.log('Réponse du serveur:', response);

          const processResponse = () => {
            this.isLoading = false;
            this.searchCompleted = true;
            if (response && response.etablissements) {
              if (this.currentPage === 1) {
                console.log(typeof response.etablissements) 
                this.results = response.etablissements.etablissements;
              } else {
                this.results = [
                  ...(this.results || []),
                  ...response.etablissements,
                ];
              }
                this.totalResults =
                response.header?.total || (this.results ? this.results.length : 0);

              // Scroll to the last old result if loading more
              if (this.currentPage > 1) {
                setTimeout(() => {
                  const resultsElement = this.resultsContainer.nativeElement;
                  const lastOldResult =
                    resultsElement.children[
                      resultsElement.children.length -
                        response.etablissements.length -
                        1
                    ];
                  if (lastOldResult) {
                    lastOldResult.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                });
              }
            } else {
              this.results = [];
            }
          };

          if (spinnerDelay) {
            spinnerDelay.then(processResponse);
          } else {
            processResponse();
          }
        },
        error: (error) => {
          console.error('Erreur lors de la recherche:', error);

          const processError = () => {
            this.isLoading = false;
            this.searchCompleted = true;
            this.results = [];
          };

          if (spinnerDelay) {
            spinnerDelay.then(processError);
          } else {
            processError();
          }
        },
      });
  }

  onLoadMore() {
    if (this.results && this.results.length < this.totalResults) {
      this.currentPage++;
      this.isLoading = true;
      this.loadResults();
    }
  }

  onInputChange() {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      this.results = [];
      this.searchCompleted = false;
      this.currentPage = 1;
      this.totalResults = 0;
    }
  }

  onPageSizeChange(newPageSize: number) {
    if (this.pageSize !== newPageSize) {
      this.pageSize = newPageSize;
      this.currentPage = 1;
      this.results = [];
      this.loadResults();
    }
  }
}
