import { Component, Input } from '@angular/core';
import { DiaryEntry } from '../diary.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-note-list',
  standalone: true,  
  imports: [CommonModule],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})


export class NoteListComponent {
  @Input() entries: DiaryEntry[] = [];
}
