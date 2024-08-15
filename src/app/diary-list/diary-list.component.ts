
import { Component, OnInit } from '@angular/core';
import { DiaryService, DiaryEntry } from '../diary.service';
import { RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import{AuthService} from  '../auth/auth.service'
import { NoteListComponent } from '../Notelist/note-list.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-diary-list',
  standalone: true,
  imports: [RouterModule, CommonModule, NoteListComponent],
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.scss']
})
export class DiaryListComponent implements OnInit {
  entries: DiaryEntry[] = [];
  pageSize = 10;
  currentPage = 0;

  constructor(private diaryService: DiaryService,
              private authService: AuthService,
              private router: Router
  ) {}

  loadMoreEntries(): void {
    const newEntries: Observable<DiaryEntry[]> = this.diaryService.entries$
      .pipe(
        map(entries => 
          entries
            .slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize)
            .reverse() // Реверсируем для отображения от новых к старым
        )
      );
      
    newEntries.subscribe((entries: DiaryEntry[]) => {
      this.entries = [...entries, ...this.entries]; // Добавляем новые записи в начало массива
      this.currentPage++;
    });
  }

  onScroll(): void {
    this.loadMoreEntries();
  }

  ngOnInit(): void {
    this.loadMoreEntries(); // Загружаем начальные записи при инициализации
  }

  deleteEntry(id: string): void {  // Use ID instead of index
    // Удаляем запись из массива entries
    this.entries = this.entries.filter(entry => entry.id !== id);

    // Удаляем запись из сервиса по уникальному ID
    this.diaryService.deleteEntry(id);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
 

  isAuthModalOpen = false;
  isRegisterModalOpen = false;

  loginUsername: string = '';
  loginPassword: string = '';
  registerUsername: string = '';
  registerPassword: string = '';

  openAuthModal() {
    this.isAuthModalOpen = true;
    this.isRegisterModalOpen = false; // Закрыть регистрацию, если она открыта
  }

  closeAuthModal() {
    this.isAuthModalOpen = false;
  }

  openRegisterModal() {
    this.isRegisterModalOpen = true;
    this.isAuthModalOpen = false; // Закрыть логин, если он открыт
  }

  closeRegisterModal() {
    this.isRegisterModalOpen = false;
  }

  switchToLogin() {
    this.closeRegisterModal();
    this.openAuthModal();
  }

  switchToRegister() {
    this.closeAuthModal();
    this.openRegisterModal();
  }

  onSubmit() {
    const storedPassword = localStorage.getItem(this.loginUsername);

    if (storedPassword && storedPassword === this.loginPassword) {
      alert('Login successful!');
      this.closeAuthModal();
    } else {
      alert('Invalid username or password');
    }
  }

  onRegister() {
    if (this.registerUsername && this.registerPassword) {
      localStorage.setItem(this.registerUsername, this.registerPassword);
      alert('Account created successfully!');
      this.switchToLogin(); // Переключиться на форму логина после успешной регистрации
    } else {
      alert('Please enter a username and password');
    }
  }
  
}
