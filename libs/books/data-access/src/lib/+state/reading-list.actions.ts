import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { State } from './reading-list.reducer';

export const init = createAction('[Reading List] Initialize');

export const loadReadingListSuccess = createAction(
  '[Reading List API] Load list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListError = createAction(
  '[Reading List API] Load list error',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Books Search Results] Add to list',
  props<{ book: Book }>()
);

export const failedAddToReadingList = createAction(
  '[Reading List API] Failed add to list',
  props<{ book: Book }>()
);

export const confirmedAddToReadingList = createAction(
  '[Reading List API] Confirmed add to list',
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  '[Books Search Results] Remove from list',
  props<{ item: ReadingListItem }>()
);

export const failedRemoveFromReadingList = createAction(
  '[Reading List API] Failed remove from list',
  props<{ item: ReadingListItem }>()
);

export const confirmedRemoveFromReadingList = createAction(
  '[Reading List API] Confirmed remove from list',
  props<{ item: ReadingListItem }>()
);

export const takeSnapshot = createAction('[Snapshot] Take Snapshot');

export const restoreSnapshot = createAction(
  '[Snapshot] Restore Snapshot'  
);  
  
export const markBookAsRead = createAction(
  '[Reading List API] mark as read',
  props<{ item: ReadingListItem }>()
);

export const confirmMarkedRead = createAction(
  '[Reading List API] Confirmed as read',
  props<{ item: ReadingListItem }>()
);

export const failedToMarkAsRead = createAction(
  '[Reading List API] Failed to mark as read',
  props<{ item: ReadingListItem }>()
);
