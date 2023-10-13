import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  getReadingList,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { Subject, Subscription } from 'rxjs';
 import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  
  instantSearchLimitRestricter: Subject<void> = new Subject<void>();
  
  private allBooksSubscription: Subscription;
  private readingListSubscription: Subscription;
  readingList: ReadingListItem[];

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.allBooksSubscription = this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
    this.readingListSubscription = this.store.select(getReadingList).subscribe(readingList => {
      this.readingList = readingList;
    });
    this.searchForm.get('term').valueChanges
     .pipe(debounceTime(500))
     .subscribe(() => {
       this.onSearchTermChanged();
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
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
    if(this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    }
    else {
      this.store.dispatch(clearSearch());
    }
  }

  checkBookRead(book: Book): boolean {
    if (this.readingList) {
      const readingListItem = this.readingList.find((item) => item.bookId === book.id);
      return readingListItem ? readingListItem.finished : false;
    }
    return false;
  }

  ngOnDestroy() {
    this.allBooksSubscription.unsubscribe();
    this.readingListSubscription.unsubscribe();
  }
}
