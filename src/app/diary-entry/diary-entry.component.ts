import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiaryService, DiaryEntry } from '../diary.service';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diary-entry',
  standalone: true,
  imports: [],
  templateUrl: './diary-entry.component.html',
  styleUrls: ['./diary-entry.component.scss']
})
export class DiaryEntryComponent implements OnInit {
  editor!: EditorJS;
  entryId: string | null = null;  // Use string for unique ID
  imageUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private diaryService: DiaryService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.entryId = this.route.snapshot.params['id'];
    const entry = this.entryId ? this.diaryService.getEntryById(this.entryId) : null;

    if (isPlatformBrowser(this.platformId)) {
      import('@editorjs/editorjs').then(EditorJS => {
        this.editor = new EditorJS.default({
          holder: 'editorjs',
          data: entry ? entry.content : {},
          onReady: () => {
            console.log('Editor is ready');
          },
          onChange: () => {
            this.editor.save().then((outputData: OutputData) => {
              console.log('Article data: ', outputData);
            }).catch((error: any) => {
              console.log('Saving failed: ', error);
            });
          }
        });
      });
    }
    if (entry && entry.imageUrl) {
      this.imageUrl = entry.imageUrl;
    }
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;  
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  saveEntry(): void {
    if (this.editor) {
      this.editor.save().then((outputData: OutputData) => {
        const entry: DiaryEntry = {
          id: this.entryId || this.generateId(),  
          title: 'note',
          content: outputData,
          imageUrl: this.imageUrl,
          date: new Date()
        };

        if (this.entryId) {
          this.diaryService.updateEntry(this.entryId, entry);
        } else {
          this.diaryService.addEntry(entry);
        }

        this.router.navigate(['/']);
      }).catch((error: any) => {
        console.log('Saving failed: ', error);
      });
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
