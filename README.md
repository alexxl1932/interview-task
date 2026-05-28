# interview-task

interview-task

- a simple weather web project
- basic ReactJS (with any React framework he likes, except Next.js)
- ExpressJS as backend
- frontend: only one section, show the current weather (raining, sunny, etc) and the current temperature (any location, can be other country)
- backend: integrate with some gov API, HK Observatory should have, of course he could pick any other country's gov API (just it MUST be a GOV api)

## 🛠️ Quick Start

Please ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed on your machine.

### 1. Install Dependencies

Run the following command at the project root directory to install all dependencies for both frontend and backend at once:

```bash
pnpm install
```

### 2. How to Start

To run both Frontend and Backend simultaneously (Recommended):

```bash
pnpm dev
```

To run the Frontend application only:

```bash
pnpm dev:frontend
```

To run the Backend application only:
```bash
pnpm dev:backend
```

💻 Frontend App: http://localhost:5173 (Vite Development Server)

🚀 Backend API: http://localhost:3001 (Express Server)