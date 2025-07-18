# Тестовое задание

## 🚀 **[Демо](https://aintripin.github.io/makves___test_assignment/)**

## Что сделано

Компонент Sidebar полностью реализован согласно дизайну с использованием styled-components. Добавлена поддержка светлой и темной темы с плавным переключением. Все дизайн-токены вынесены в отдельный файл themes.js и интегрированы с ThemeProvider для централизованного управления стилями.

Реализованы все необходимые анимации: плавное сворачивание/разворачивание сайдбара, появление и исчезновение элементов, hover и active состояния. Компонент разбит на модули с использованием кастомных хуков для управления анимациями и состоянием.

Код организован с упором на читаемость и поддержку. Архитектура позволяет легко добавлять новые темы и модифицировать поведение компонентов.

---

Установка зависимостей `npm install`

Запуск проекта `npm run dev`

## Задание

Сверстать компонент `/src/components/Sidebar.jsx` по дизайну c использованием styled-components.

- В `/src/index.scss` есть дизайн-токены для светлой и темной темы
- В зависимости от prop `color` Sidebar должен иметь стили темной или светлой темы
- Сделать кнопку для переключения темы (стили на свое усмотрение)
- Возможность смены темы должна быть реализована в styled-components за счет дизайн-токенов
- Нужна ссылка на развернутый вариант с готовой демонстрацией

[Анимированная версия](src/assets/design.mp4)

[Оригинал](https://dribbble.com/shots/18111119-Collapsing-Sidebar-Navigation-Light-and-Dark-mode)

![design.png](src/assets/design.png)

#### Верстать нужно

- лого
- элементы навигации
- `hover`, `active` состояния у элементов Sidebar
- анимация при закрытии/открытии у элементов, которые скрываются/появляются

#### Верстать не нужно

- тултипы
- профиль
- анимация при загрузке страницы (не открытие/закрытие)

---

- иконки могут не соответствовать, это не так важно
- больше всего интересует анимация при открытии/закрытии
- логотип в проекте другой, используйте его
