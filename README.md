# PersonalDiary

Это приложение личного дневника, разработанное на Angular, позволяет пользователям создавать, редактировать и удалять записи в дневнике. 
Приложение также включает базовую систему аутентификации и авторизации с использованием локального хранилища браузера (`localStorage`).

## Особенности

- Создание, редактирование и удаление записей в дневнике.
- Отображение времени создания записи.
- Возможность прикрепления изображений к записям.
- Простая система аутентификации и авторизации без бэкенда, основанная на `localStorage`.

## Установка и запуск
### 1. Клонирование репозитория
bash
git clone https://github.com/yourusername/personal-diary.git
cd personal-diary
### 2. Установка зависимостей 
npm install
### 3.Сборка и запуск приложения
npx ng serve
Приложение будет доступно по адресу http://localhost:4200. || http://localhost:51734/

## Аутентификация и авторизация
Приложение использует простую систему аутентификации и авторизации, основанную на localStorage.
 При первом запуске вы можете создать новый аккаунт, который будет сохранен в локальном хранилище.

Примеры учетных записей
Логин: user1 | Пароль: password1
Логин: user2 | Пароль: password2
Логин: admin | Пароль: adminpass

## Создание аккаунта

Нажмите на кнопку "Login" в правом верхнем углу страницы.
Переключитесь на вкладку "Register".
Введите желаемые логин и пароль, затем нажмите "Create Account".
После успешной регистрации вы можете войти в систему с использованием только что созданных учетных данных.

## Вход в аккаунт

Нажмите на кнопку "Login" в правом верхнем углу страницы.
Введите свои логин и пароль.
Нажмите "Login" для входа.

## INFO

Безопасность: Пожалуйста, обратите внимание, что эта система аутентификации создана только для учебных целей и не должна использоваться в реальных приложениях. Пароли сохраняются в незашифрованном виде в localStorage, что небезопасно.

Разработка: Приложение разработано с использованием Angular и является статическим SPA (Single Page Application).

Зависимости: Убедитесь, что у вас установлены Node.js и Angular CLI для сборки и запуска приложения.


