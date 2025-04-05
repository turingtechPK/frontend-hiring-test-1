# Turing Technologies Frontend Test

This repository contains my implementation of the given Turing Technologies Frontend Test task.

## Features

- **User Authentication**: Secure login system to protect call data
- **Real-time Call Updates**: Integration with Pusher for instant call status updates
- **Call Management**: View, filter, and organize calls in an intuitive interface
- **Note Taking**: Add notes to calls for better tracking and follow-up
- **Archiving**: Archive completed calls for better organization
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **Real-time Updates**: Pusher.js
- **Network Requests**: Axios
- **UI Components**: ShadCN/Radix UI components, custom components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fahadyaseen001/turing-coding-task.git
   cd turing-coding-task
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/                  # Next.js app directory
│   ├── calls/            # Call listing and detail pages
│   ├── login/            # Authentication pages
│   └── page.tsx          # Home page (redirects to login/calls)
├── components/           # Reusable UI components
├── contexts/             # React contexts (Auth, etc.)
├── lib/                  # Utility libraries
├── services/             # API services
│   ├── api.ts            # API client setup
│   └── pusher.ts         # Pusher real-time service
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

## Development

### Building for production

```bash
npm run build
# or
yarn build
```

### Running production build

```bash
npm run start
# or
yarn start
```

### Linting

```bash
npm run lint
# or
yarn lint
```

## Deployment

The application can be deployed to any platform that supports Next.js applications. For the simplest deployment experience, we recommend using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org) - The React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com) - Unstyled, accessible UI components
- [Pusher](https://pusher.com) - Real-time websocket service
