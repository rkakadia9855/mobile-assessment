import { HttpService, Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const KEY = '[okreads API] Reading List';

@Injectable()
export class ReadingListService {
  constructor(private readonly http: HttpService) {}
  private readonly storage = new StorageService<ReadingListItem[]>(KEY, []);

  async getList(): Promise<ReadingListItem[]> {
    return this.storage.read();
  }

  async addBook(b: Book): Promise<void> {
    this.storage.update(list => {
      const { id, ...rest } = b;
      list.push({
        bookId: id,
        ...rest
      });
      return list;
    });
  }

  async removeBook(id: string): Promise<void> {
    this.storage.update(list => {
      return list.filter(x => x.bookId !== id);
    });
  }

  async markBookAsRead(id: string): Promise<void> {
    console.log("service file called");
    this.storage.update(list => {
      return list.map(item => {
        if(item.bookId === id) {
          return {...item, finished: true, finishedDate: new Date().toISOString()};
        }
        return item;
      })
    });
  }

}
