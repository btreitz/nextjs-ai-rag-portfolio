# AI-Powered Portfolio Chat

A conversational portfolio website that lets visitors learn about me through an AI-powered chat interface. Instead of static pages, visitors can ask questions naturally and get intelligent, contextual responses about my experience, projects, and skills.

## Why This Project?

Traditional portfolio sites present information in a fixed format. This project flips that model—visitors drive the conversation, asking what they actually want to know. It demonstrates:

- **Modern AI Integration** — Real-time streaming responses using the Vercel AI SDK
- **Production-Ready Architecture** — Clean separation of concerns, type-safe tooling, and scalable patterns
- **Polished User Experience** — Smooth animations and responsive design

The goal is to evolve this into a full RAG (Retrieval-Augmented Generation) system that can answer questions by pulling from my actual resume, project documentation and some personal information.

## Features

- **Streaming Chat Interface** — Real-time AI responses with typewriter effects
- **Tool Calling** — AI can execute tools (weather lookup, unit conversion) with results displayed inline
- **Animated UI** — Framer Motion animations for smooth transitions between states
- **Rainbow Gradient Input** — Eye-catching animated border that draws attention
- **Suggestion Pills** — Quick-start prompts to help visitors begin the conversation
- **Dark Mode** — Automatic system preference detection
- **Mobile Responsive** — Works seamlessly across devices

## Tech Stack

| Category       | Technologies                             |
| -------------- | ---------------------------------------- |
| **Framework**  | Next.js 16 (App Router), React 19        |
| **AI**         | Vercel AI SDK, OpenAI GPT-4              |
| **Styling**    | Tailwind CSS v4, Framer Motion           |
| **Language**   | TypeScript                               |
| **Validation** | Zod                                      |
| **Rendering**  | react-markdown, react-syntax-highlighter |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- OpenAI API key

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your OPENAI_API_KEY to .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

### Key Patterns

**AI SDK Integration**

- Uses `useChat` hook for client-side state management
- `UIMessage` and `convertToModelMessages` for message handling
- Tools defined with Zod schemas for type-safe execution
- `stepCountIs(n)` controls agentic loop iterations

**Component Architecture**

- Page components are thin orchestration layers
- Feature logic extracted into dedicated components
- UI primitives are generic and reusable
- Direct imports (no barrel exports)

## Roadmap

- [ ] **RAG Integration** — Create embeddings and allow additions in Vector DB. Connect to vector database for data retrieval
- [ ] **More Tools** — Display resume and other advanced pieces of data in chat: GitHub stats, project demos, contact form
- [ ] **Voice Input** — Speech-to-text for real conversation-like experience ([Vercel AI SDK Speech API](https://ai-sdk.dev/docs/ai-sdk-core/speech))
- [ ] **Multi-model Support** — Switch between AI providers
