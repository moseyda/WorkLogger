# Workloggery

Workloggery is a time-tracking application designed to help users log and manage their work activities efficiently. It provides a modern, responsive user interface built with React and TailwindCSS, leveraging a variety of libraries and tools to deliver a seamless experience.

## Features

- **Time Tracking**: Log work sessions with descriptions and tags.
- **Tag Management**: Categorise work activities using predefined tags.
- **Responsive Design**: Optimised for both desktop and mobile devices.
- **Customizable UI**: Built with TailwindCSS for easy theming and styling.
- **Toast Notifications**: Real-time feedback using toast notifications.
- **Interactive Components**: Includes sliders, carousels, dialogs, and more.

## Technologies Used

### Languages
- **TypeScript**: Ensures type safety and better developer experience.
- **CSS**: Styled using TailwindCSS for utility-first design.

### Frameworks and Libraries
- **React**: Core framework for building the user interface.
- **Vite**: Fast build tool for development and production.
- **Radix UI**: Provides accessible and customizable UI primitives.
- **Lucide Icons**: Icon library for modern and lightweight SVG icons.
- **React-Day-Picker**: Calendar component for date selection.
- **Embla Carousel**: Carousel library for smooth scrolling experiences.
- **React Query**: State management for server-side data fetching.
- **Zod**: Schema validation for form inputs and data structures.

### Styling
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.
- **TailwindCSS Animate**: Adds animations to TailwindCSS.

### Utilities
- **Class Variance Authority (CVA)**: For managing class names with variants.
- **clsx**: Utility for conditionally joining class names.
- **Tailwind Merge**: Merges TailwindCSS class names intelligently.

### Build and Linting Tools
- **ESLint**: Ensures code quality and consistency.
- **PostCSS**: Processes CSS with plugins like autoprefixer.

## Project Structure

The project follows a modular structure with components, hooks, and utilities organised for scalability and maintainability:

- **`src/components`**: Contains reusable UI components like buttons, dialogs, and carousels.
- **`src/hooks`**: Custom React hooks for managing state and logic.
- **`src/lib`**: Utility functions for common tasks.
- **`src/index.css`**: Global styles and TailwindCSS configurations.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/moseyda/workloggery.git
   cd workloggery

2. Install dependencies:
   ```bash
   npm install

4. Start the development server:
   ```bash
   npm run dev
   
5. Open the app in your browser at http://localhost:xxxx.

# Scripts

### Available Commands
- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the project for production.
- **`npm run preview`**: Preview the production build.
- **`npm run lint`**: Run ESLint to check for code issues.

---

# Configuration

### Key Configurations
- **TailwindCSS**: Configured in `tailwind.config.ts` for custom themes and animations.
- **TypeScript**: Configured in `tsconfig.json` and `tsconfig.app.json`.

---

# Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**.
2. **Create a new branch** for your feature or bug fix.
3. **Commit your changes** and push the branch.
4. **Open a pull request**.

---

# License

This project is licensed under the **MIT License**.

---

# Acknowledgments

Special thanks to the following tools and libraries:

- **[Radix UI](https://www.radix-ui.com/)** for accessible UI primitives.
- **[TailwindCSS](https://tailwindcss.com/)** for the utility-first CSS framework.
- **[Lucide Icons](https://lucide.dev/)** for the modern icon set.
- **[React Query](https://tanstack.com/query/latest)** for state management.
- **[Embla Carousel](https://www.embla-carousel.com/)** for the carousel implementation.
