# Todo React App

## Live Demo
https://todo-react-app-iota-one.vercel.app/

---

## Overview

This is a Todo application built with React. The app allows users to manage tasks by separating them into **Uncompleted** and **Completed** sections. Users can filter, sort, and update todos dynamically.

---

## Features

* Fetch todos from API
* Filter todos by user
* Sort uncompleted todos by title (ascending / descending)
* Sort completed todos by completion date
* Mark todos as completed
* Move todos back to uncompleted
* Load more functionality (pagination)

---

## Technologies Used

* React (Hooks: useState, useEffect)
* Vite
* JavaScript (ES6+)
* CSS
* HTML5
* JSONPlaceholder API

---

## API

Todos are fetched from:

https://jsonplaceholder.typicode.com/todos

Users are fetched from:

https://jsonplaceholder.typicode.com/users

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Rayaa1/todo-react-app.git
```

2. Navigate to the project folder:

```bash
cd todo-react-app
```

3. Install dependencies:

```bash
npm install
```

---

## Run the App

```bash
npm run dev
```

---

## 📷 Screenshot
<p align="center">
  <img src="https://github.com/user-attachments/assets/feabbd71-aa74-45d0-98b2-654ff99c7ce9" width="800"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/4f409852-dba1-41b5-9ad0-ada8162e7798" width="800"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/d5189f1a-de13-4d54-b2a1-c962c977421f" width="800"/>
</p>

## Requirements

* Node.js (v16 or higher recommended)
* npm

---

## Project Structure

```
src/
 ├── App.jsx
 ├── App.css
 ├── main.jsx
 └── components/
       ├── Header.jsx
       ├── Footer.jsx
       ├── UserFilter.jsx
       ├── TodoItem.jsx
       ├── UncompletedSection.jsx
       └── CompletedSection.jsx
```
## Author
Raya Koleva

---