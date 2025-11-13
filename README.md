📅 HabitFlow: Habit Tracker Application

HabitFlow is a fully responsive, single-page application designed to help users establish and maintain daily habits. It features conditional navigation, mock user authentication, and protected routes to provide a complete user experience prototype.

✨ Key Features

This application showcases several core modern web development concepts:

Conditional Navigation: The header dynamically changes based on the user's mock authentication status (isLoggedIn).

Logged Out: Displays Login and Sign Up buttons.

Logged In: Displays a User Profile Dropdown showing the user's name, email, and a Log out button.

Protected Routes: Key application pages, such as Add Habit and My Habits, are protected. Unauthorized users attempting to navigate to these pages are shown an "Access Denied" message.

Responsive Design: The layout is fully responsive, utilizing modern CSS techniques (simulated via inline styles/Tailwind logic) to ensure optimal viewing on mobile, tablet, and desktop screens, including a responsive hamburger menu.

Modular Component Structure: Although consolidated into a single file (App.jsx) for easy execution, the architecture follows best practices with distinct components for the Header, Footer, Hero, Modal, and individual Pages.

State-Based Routing: Uses simple React state (currentPage) and a switch statement to handle navigation without relying on external routing libraries (like react-router-dom), thus avoiding complexity and dependency errors in single-file environments.

404 Handling: Includes a dedicated NotFoundPage that correctly hides the standard Header and Footer when rendered.

🛠️ Technical Stack

Frontend: React (Functional Components and Hooks)

Styling: Inline JavaScript Styles (Simulated Tailwind CSS class logic for a modern, utility-first look)

Icons: Lucide-React for clean, modern interface iconography.

State Management: Local React state (useState) for mock authentication and navigation.

🚀 Installation and Usage

Since this project is implemented as a single, self-contained React file, setup is straightforward:

Save the Code: Save the provided App.jsx content as a single file (e.g., index.js or App.js).

Run Locally: Integrate this file into a standard React environment (create-react-app, Vite, etc.).

Interaction: The application is immediately runnable. Use the Login and Sign Up buttons in the header to mock the authenticated state and unlock the protected routes.

Mock User Data

The application uses the following mock user data for demonstration:

{
    displayName: 'Jane Doe',
    email: 'jane.doe@example.com',
    photoURL: null,
}


📂 Project Architecture Overview (Conceptual)

Although the code is consolidated, the intended modular file structure is maintained:

Component Category

Purpose

Header

Main navigation, conditional login/user display, mobile menu.

Footer

Copyright, contact details, and legal links.

Hero

Landing page main call-to-action section.

Modal

Reusable overlay dialog component.

PageWrapper

Standard container enforcing layout and protected route logic.

*Page Components

Placeholders for the main view components (Home, AddHabit, MyHabits, etc.).
