
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';  

export interface DiaryEntry {
  id: string; 
  title: string;
  content: any;
  imageUrl?: string | null;  
  date:  Date;
}

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private diaryEntries = new BehaviorSubject<DiaryEntry[]>([]);
  entries$ = this.diaryEntries.asObservable();

  constructor() {
    this.loadEntries();
  }

  private loadEntries(): void {
    const storedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
    this.diaryEntries.next(storedEntries);
  }

  private saveEntries(entries: DiaryEntry[]): void {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
    this.diaryEntries.next([...entries]);  
  }

  addEntry(entry: DiaryEntry): void {
    entry.id = uuidv4();  
    entry.date = new Date();
    const currentEntries = [...this.diaryEntries.value];
    currentEntries.unshift(entry);
    this.saveEntries(currentEntries);
  }

  updateEntry(id: string, updatedEntry: DiaryEntry): void {
    const currentEntries = [...this.diaryEntries.value];
    const index = currentEntries.findIndex(entry => entry.id === id);
    if (index !== -1) {
      currentEntries[index] = updatedEntry;
      this.saveEntries(currentEntries);
    } else {
      console.error('Invalid entry ID', id);
    }
  }

  deleteEntry(id: string): void {
    const currentEntries = [...this.diaryEntries.value];
    const updatedEntries = currentEntries.filter(entry => entry.id !== id);
    if (currentEntries.length !== updatedEntries.length) {
      this.saveEntries(updatedEntries);
    } else {
      console.error('Invalid entry ID', id);
    }
  }

  getEntryById(id: string): DiaryEntry | undefined {
    return this.diaryEntries.value.find(entry => entry.id === id);
  }
}
