# 🌙 EidiSend — The Modern Digitized Salami Platform

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**EidiSend** is a streamlined, premium open-source application built to modernize the traditional practice of sending "Eidi" or "Salami" during Eid festivals in Bangladesh. It bridges the gap between traditional gifting and digital efficiency, allowing users to send heartfelt blessings and financial gifts across any distance.

---

## 🚀 Live Demo
Experience the platform live: **[eidisend.vercel.app](https://eidisend.vercel.app/)**

---

## ✨ Features

### 💎 Core Salami Flow
- **Seamless Transfer**: A multi-step intuitive flow to select preset or custom Salami amounts.
- **Payment Distribution**: Integrated support for local payment gateways including **bKash**, **Nagad**, and **Upay**.
- **Personalized Messaging**: Senders can attach custom notes and signatures to their digital blessings.
- **Transaction History**: A public "Hall of Fame" (Leaderboard) for recent top senders.

### 🎮 Fun Zone (Interactive Modules)
- **Salami Calculator**: A cheeky tool to determine exactly how much Salami you owe based on your relationship.
- **Surprise Box**: A gamified "Lucky Draw" to let destiny decide your Salami amount.
- **Eid DNA Quiz**: A personality test to discover your specific Eid-day habits and Salami distribution style.

### 🎨 Design & Experience
- **Dark Mode First**: Full support for native system themes using custom CSS variables.
- **Premium Animations**: High-fidelity transitions powered by **Framer Motion**.
- **Confetti Celebration**: Visual feedback upon successful Salami confirmation.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router Architecture)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Custom Theme Tokens)
- **Database**: [MongoDB](https://www.mongodb.com/) (via `mongodb` Native Driver)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Tone & UI**: Premium, minimalist, and state-of-the-art aesthetics.

---

## 📦 Project Structure

```text
├── src/
│   ├── app/                # Next.js App Router (Pages, Layouts, API Routes)
│   ├── components/         # Reusable UI Components
│   │   ├── funZone/        # Interactive mini-apps
│   │   ├── home/           # Landing page sections
│   │   ├── sendSalami/     # Core multi-step transaction flow
│   │   ├── shared/         # Global Layout elements (Navbar, Footer, etc.)
│   │   └── TopSenders/     # Leaderboard components
│   ├── hooks/              # Custom React hooks (e.g., Theme management)
│   ├── lib/                # Database and utility logic (MongoDB connection)
│   └── utils/              # Helper functions (Formatting, Time, etc.)
├── public/                 # Static assets (Images, Lottie, etc.)
└── .env.example            # Template for environment configuration
```

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/rakibsbase/EidiSend.git
cd EidiSend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and populate it with the required keys (see [.env.example](.env.example)):

```bash
cp .env.example .env
```

| Variable | Description |
| :--- | :--- |
| `MONGO_URI` | Your MongoDB connection string. |
| `DB_NAME` | The specific database name. |
| `NEXT_PUBLIC_BASE_URL` | The application's base URL (e.g., http://localhost:3000). |
| `NEXT_PUBLIC_BKASH_NUMBER` | Personal bKash number for receiving Salami. |
| `NEXT_PUBLIC_NAGAD_NUMBER` | Personal Nagad number for receiving Salami. |
| `NEXT_PUBLIC_UPAY_NUMBER` | Personal Upay number for receiving Salami. |

### 4. Run Development Server
```bash
npm run dev
```
Explore the app at [http://localhost:3000](http://localhost:3000).

---

## 🚢 Deployment
EidiSend is optimized for **Vercel**. 

1. Push your code to GitHub.
2. Link your repository to a new Vercel project.
3. Add the environment variables from your `.env` to the Vercel project settings.
4. Deploy!

---

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License
Distributed under the **MIT License**. See `LICENSE` for more information (or assume standard MIT terms for this open-source project).

---

## 📬 Contact
- **Project Maintainer**: [rakibsbase](https://github.com/rakibsbase)
- **Project Link**: [https://github.com/rakibsbase/EidiSend](https://github.com/rakibsbase/EidiSend)

_Built with ❤️ for the Joy of Eid._
