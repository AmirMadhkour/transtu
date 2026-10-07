# TRANSTU – Fuel Voucher & Consumption Management

A full-stack web platform built for **TRANSTU** (Tunis public transport company) to manage **fuel vouchers** and **track the fuel consumption of its vehicles**, replacing manual follow-up with a centralized application and visual statistics.

> This repository contains the **React front end**. Back end (Spring Boot REST API): [AmirMadhkour/transtubackend](https://github.com/AmirMadhkour/transtubackend)

## ✨ Features

- **Fuel vouchers**: create, edit and track fuel vouchers
- **Fuel receipts**: generate receipts and export them as **PDF**
- **Vehicles & districts**: manage the fleet and the districts it belongs to
- **Dashboard & statistics**: charts on fuel consumption and distributions
- **User accounts**: login, sign-up and protected routes
- **Forms with validation** and **interactive data tables**

## 🏗️ Architecture

```
React (Vite) front end  ──REST / JSON (axios)──▶  Spring Boot API  ──▶  MySQL
```

## 🛠️ Tech stack

| Area | Technologies |
|---|---|
| Framework | React 18, Vite, React Router |
| UI | Chakra UI, Tailwind CSS, daisyUI, Framer Motion |
| Data fetching | Axios, TanStack Query |
| Tables & charts | TanStack Table, react-data-table-component, Chart.js |
| Forms | React Hook Form + Zod validation |
| Export | jsPDF, html2canvas |
| Back end | Java 21, Spring Boot 3, Spring Data JPA, MySQL |

## 📁 Project structure

```
TranstuBonStock/src
├── api/         # API calls to the Spring Boot back end
├── context/     # React contexts (state per domain, protected route)
├── pages/       # Dashboard, statistics, vouchers, receipts, vehicles, districts, users…
├── components/  # Shared UI sections (login, sign-up…)
└── share/       # Shared helpers
```

## 🚀 Getting started

1. Start the back end ([instructions](https://github.com/AmirMadhkour/transtubackend#-getting-started)) on `http://localhost:8081`.
2. Run the front end:

```bash
cd TranstuBonStock
npm install
npm run dev
```

## 🧑‍💻 My role

- Analyzed the client's requirements and designed the application (UML)
- Defined the architecture and the data model
- Developed the React interface and the Spring Boot REST API

## 📸 Screenshots

<!-- Add screenshots here, e.g. ![Dashboard](docs/dashboard.png) -->
