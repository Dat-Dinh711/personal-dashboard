import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  bookmarks: Bookmark[] = [];

  constructor() {}

  getbookmarks() {
    return this.bookmarks;
  }

  getBookmark(id: string) {
    return this.bookmarks.find((bookmark) => bookmark.id === id);
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    const bookmark = this.getBookmark(id);
    Object.assign(bookmark!, updatedFields);
  }

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex(
      (bookmark) => bookmark.id === id
    );

    if (bookmarkIndex !== -1) {
      this.bookmarks.splice(bookmarkIndex, 1);
    }
  }
}
