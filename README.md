🪙 Zorvyn: Fiscal_Overview
Advanced Financial Data Monitoring & Executive Dashboard*

Zorvyn is a high-performance dashboard designed for managing fiscal records, real-time currency conversion, and role-based user access. This application was developed as a technical assignment to demonstrate clean UI/UX, state management, and professional asynchronous data handling.

🚀 Key Functionalities

**Executive Dashboard:** Centralized summary for monitoring fiscal health and ledger records.
**Real-Time Currency Engine:** Integrated switching between **USD, INR, EUR, and GBP** with live exchange rate fetching.
**Role-Based Access (RBAC):** Dynamic interface for **"System Admin"** and **"Read Only"** roles, featuring live-pulse status indicators.
**Theme Management:** Adaptive Dark/Light mode support with persistent state.
**Global Search:** Advanced filtering for records and descriptions across the financial ledger.

🌐 API & Data Integration
Data Source: [Frankfurter API](https://api.frankfurter.dev/v1/latest)
Implementation: The application fetches the latest exchange rates based on a **USD** base currency. 
State Handling: Implements `isLoadingRates` to manage asynchronous states, ensuring a smooth user experience during data fetching.

🛠️ Tech Stack
Framework: React 19 (TypeScript)
Build Tool: Vite 8
Styling: Tailwind CSS 4 (using the new @tailwindcss/vite engine)
Visualization: Recharts (for financial data plotting)
State Management: Zustand 5
Utilities: UUID (for unique record identification)

📂 Project Structure
The project follows a modular, scalable architecture to ensure clean separation of concerns:

zorvyn-fiscal-overview/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Global styles, images, fonts
│   ├── components/         # Reusable UI components
│   │   └── layout/         # Layout components (Navbar, Sidebar, Header)
│   ├── features/           # Feature-based modules (Dashboard, Ledger, etc.)
│   ├── store/              # Global state management (Zustand)
│   ├── types/              # TypeScript interfaces & types
│   ├── utils/              # Utility/helper functions (formatters, helpers)
│   ├── App.tsx             # Root component
│   └── main.tsx            # Application entry point
├── package.json            # Project dependencies & scripts
└── README.md               # Project documentation
