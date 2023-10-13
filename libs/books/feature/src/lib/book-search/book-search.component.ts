import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  restoreSnapshot,
  searchBooks,
  takeSnapshot
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  private allBooksSubscription: Subscription;

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.allBooksSubscription = this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(takeSnapshot());
    this.store.dispatch(addToReadingList({ book }));
    const snackBarRef = this.snackBar.open(`${book.title} has been added to the reading list`, 'Undo', {
      duration: 3000,
    });

    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(restoreSnapshot());
    });
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  onSearchTermChanged() {
    if(!this.searchForm.value.term) {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy() {
    this.allBooksSubscription.unsubscribe();
  }
}
