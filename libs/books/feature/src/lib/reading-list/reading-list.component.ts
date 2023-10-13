import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, restoreSnapshot, takeSnapshot } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private readonly snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(takeSnapshot());
    this.store.dispatch(removeFromReadingList({ item }));
    const snackBarRef = this.snackBar.open(`${item.title} has been removed from the reading list`, 'Undo', {
      duration: 3000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(restoreSnapshot());
    });
  }
}
