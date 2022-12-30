import { Note } from './note.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notes: Note[] = [];

  constructor() {}

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find((n) => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);

    if (note) {
      Object.assign(note, updatedFields);
    }
  }

  deleteNote(id: string) {
    const index = this.notes.findIndex((n) => n.id === id);

    if (index !== -1) {
      this.notes.splice(index, 1);
    }
  }
}
