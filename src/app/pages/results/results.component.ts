import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  @Input() results: any[]= [];
  @Input() isLoading: boolean = false;
  @Input() searchCompleted: boolean = false;
  @Input() totalResults: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 20;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  get hasResults(): boolean {
    return this.results !== null && this.results.length > 0;
  }

  get resultCount(): number {
    return this.results ? this.results.length : 0;
  }

  get totalPages(): number {
    return Math.ceil(this.totalResults / this.pageSize);
  }

  get showPagination(): boolean {
    console.log('Pagination',this.searchCompleted, this.isLoading, this.hasResults)  
    return this.searchCompleted && !this.isLoading && this.hasResults;
  }



  trackBySiren(index: number, item: any): string {
    return item.siren;
  }

  goToFirstPage() {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToLastPage() {
    if (this.currentPage !== this.totalPages) {
      this.currentPage = this.totalPages;
      this.pageChange.emit(this.currentPage);
    }
  }

  decreasePageSize() {
    if (this.pageSize > 10) {
      this.pageSize -= 10;
      this.onPageSizeChange(this.pageSize);
    }
  }

  increasePageSize() {
    if (this.pageSize < 50) {
      this.pageSize += 10;
      this.onPageSizeChange(this.pageSize);
    }
  }

  onPageSizeChange(newSize: number) {
    this.pageSizeChange.emit(newSize);
    this.pageChange.emit(this.currentPage); 
  }
}