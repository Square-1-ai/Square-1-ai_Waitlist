# Square-1 AI Waitlist

A modern, full-stack waitlist application for Square-1 AI, built with Next.js 14, TypeScript, and Tailwind CSS. This platform manages student and teacher registrations for an AI-powered educational platform.

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About

Square-1 AI Waitlist is a landing page and registration system designed to capture early interest in an AI-powered educational platform. The application features separate waitlist flows for students and teachers, along with informational pages about the platform's mission, vision, and offerings.

## ✨ Features

- **Dual Waitlist System**: Separate registration forms for students and teachers
- **Newsletter Subscription**: Keep users informed about updates and launches
- **Feedback Collection**: Gather user feedback and suggestions
- **Responsive Design**: Fully responsive UI that works on all devices
- **Interactive Components**: Modern UI with animations and interactive elements
- **Course Information**: Showcase available courses and educational content
- **About Section**: Comprehensive information about the platform's mission and vision
- **API Integration**: RESTful API endpoints for data management
- **Database Integration**: Persistent storage for waitlist entries and feedback

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom components with [shadcn/ui](https://ui.shadcn.com/)
- **Database**: PostgreSQL/SQLite (via configuration)
- **Animations**: Framer Motion and custom animations
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)
- A database system (PostgreSQL recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Square-1-ai/Waitlist.git
   cd Waitlist
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Environment Setup

1. **Create a `.env.local` file** in the root directory:
   ```env
   DATABASE_URL="your_database_connection_string"
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

2. **Initialize the database**
   ```bash
   npm run db:init
   # or
   node scripts/init-db.ts
   ```

### Running the Project

1. **Development mode**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

2. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

3. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
├── app/                      # Next.js app router pages
│   ├── api/                  # API routes
│   │   ├── feedback/         # Feedback submission endpoints
│   │   ├── newsletter/       # Newsletter subscription endpoints
│   │   └── waitlist/         # Waitlist registration endpoints
│   ├── about/                # About page
│   ├── courses/              # Courses page
│   ├── feedback/             # Feedback form page
│   ├── student-waitlist/     # Student registration page
│   ├── teacher-waitlist/     # Teacher registration page
│   └── teachers-section/     # Teachers information page
├── components/               # React components
│   ├── ui/                   # Reusable UI components
│   └── about/                # About page specific components
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions and database config
├── public/                   # Static assets
├── scripts/                  # Database initialization scripts
└── styles/                   # Global styles
```

## 🔌 API Routes

### Waitlist Endpoints
- `POST /api/waitlist` - Register for the waitlist
  - Request body: `{ name, email, role: 'student' | 'teacher', ... }`

### Newsletter Endpoints
- `POST /api/newsletter` - Subscribe to newsletter
  - Request body: `{ email }`

### Feedback Endpoints
- `POST /api/feedback` - Submit feedback
  - Request body: `{ name, email, message }`

## 🗄 Database

The application uses a relational database to store:
- Waitlist registrations (students and teachers)
- Newsletter subscriptions
- User feedback

Database schema and initialization scripts can be found in:
- `lib/db.ts` - Database connection configuration
- `scripts/init-db.ts` - Database initialization script

## 🤝 Contributing

We welcome contributions to the Square-1 AI Waitlist project! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Coding Guidelines
- Follow TypeScript best practices
- Use meaningful variable and function names
- Write clean, readable code
- Add comments for complex logic
- Ensure responsive design for all new components
- Test your changes before submitting

## 📄 License

This project is proprietary software owned by Square-1 AI. All rights reserved.

## 📧 Contact

For questions or support, please contact:
- Website: [Square-1 AI](https://square-1-ai.com)
- Email: support@square-1-ai.com

---

**Made with ❤️ by the Square-1 AI Team**
