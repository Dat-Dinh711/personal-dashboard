import { NgForm } from '@angular/forms';
import { Note } from './../shared/note.model';
import { NoteService } from './../shared/note.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent implements OnInit {
  note: Note | undefined;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id');

      this.note = this.noteService.getNote(idParam!);
    });
  }

  onFormSubmit(form: NgForm) {
    if (form.valid) {
      this.noteService.updateNote(this.note!.id, form.value);
      this.router.navigateByUrl('/notes');
    }
  }

  deleteNote() {
    this.noteService.deleteNote(this.note!.id);
    this.router.navigateByUrl('/notes');
  }
}
