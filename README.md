# Workshop Booking System - Customer Site

![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Vercel](https://img.shields.io/badge/Deployed_On-Vercel-black?style=for-the-badge&logo=vercel)

This is the public-facing customer site for the Workshop Booking System. Built with Next.js and styled with Tailwind CSS, this application provides a clean, responsive, and intuitive interface for users to discover, register for, and manage their workshop bookings.

---

### ➤ Live URL

`[PASTE YOUR LIVE VERCEL CUSTOMER SITE URL HERE]`

---

### ✨ Key Features

-   **Secure User Authentication**: Complete registration and login flow for customers.
-   **Dynamic Workshop Catalog**: A server-rendered page that fetches and displays all available workshops with details and available time slots.
-   **Interactive Booking Process**: Users can select a specific time slot and book their spot directly from the workshop card.
-   **Personalized 'My Bookings' Dashboard**: An authenticated route where users can view the status and history of all their past and upcoming bookings.
-   **Instant Booking Confirmation**: After a successful booking, users are redirected to a unique confirmation page displaying their booking ID.
-   **Fully Responsive Design**: A mobile-first interface built with Tailwind CSS ensures a seamless experience on all devices.

---

### 🛠️ Tech Stack

| Category                 | Technology / Library                                        |
| ------------------------ | ----------------------------------------------------------- |
| **Framework**            | Next.js (with Turbopack for development)                    |
| **Language**             | TypeScript                                                  |
| **Styling**              | Tailwind CSS                                                |
| **API Communication**    | Axios                                                       |
| **Icons**                | Heroicons                                                   |
| **Testing**              | Vitest, React Testing Library, JSDOM                        |
| **Linting & Formatting** | ESLint                                                      |

---

### 📸 Screenshots

*(Optional but highly recommended: Add a few screenshots of your application here to showcase the UI. For example, the workshops page and the my-bookings page.)*

![Workshops Page Screenshot](</path/to/your/screenshot1.png>)
_The main workshops listing page._

![My Bookings Screenshot](</path/to/your/screenshot2.png>)
_The personalized "My Bookings" dashboard._

---

### 🚀 Getting Started

#### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   A running instance of the [Workshop Booking Backend API](<link-to-your-backend-repo>).

#### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [your-customer-site-repo-url]
    cd customer-site
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the project root. This file will store the URL of the backend API.
    ```env
    # .env.local
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ```
    *Note: Replace `http://localhost:5000` with the actual address of your local backend server if it's different.*

### ⚙️ Available Scripts

-   **Run the development server (with Turbopack):**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the application.

-   **Run tests:**
    ```bash
    npm run test
    ```
    *(Note: You may need to configure a `test` script in `package.json` to run `vitest`)*

-   **Build for production:**
    ```bash
    npm run build
    ```

-   **Start the production server:**
    ```bash
    npm run start
    ```

-   **Lint the codebase:**
    ```bash
    npm run lint
    ```

---

### 🌐 Deployment

This application is optimized for deployment on **Vercel**.

To deploy, simply import the Git repository into Vercel. Vercel will automatically detect the Next.js framework and configure the build settings.

**The only required step** is to set the following environment variable in your Vercel project settings:

-   `NEXT_PUBLIC_API_URL`: Set this to the live, public URL of your deployed backend API (e.g., `https://your-backend-api.onrender.com/api`).

Vercel will automatically handle CI/CD, deploying new versions on every push to the `main` branch.