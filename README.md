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
| **Database**   | Neon (PostgreSQL), Drizzle ORM, pgvector |
| **Styling**    | Tailwind CSS v4, Framer Motion           |
| **Language**   | TypeScript                               |
| **Validation** | Zod                                      |
| **Rendering**  | react-markdown, react-syntax-highlighter |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- OpenAI API key
- Neon database (free tier works)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
```

Add to `.env.local`:

```
OPENAI_API_KEY=sk-...
OPENAI_LARGE_LANGUAGE_MODEL=gpt-4o-mini
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
DATABASE_URL=postgresql://...  # From Neon dashboard
```

### Personalize Your Portfolio

**Important:** Update `lib/config/portfolio.ts` with your own information:

```typescript
export const portfolioOwner = {
	name: "Your Full Name", // Used in metadata, system prompts
	firstName: "YourName", // Used in greetings ("Hi, I'm ...")
	description: "Your bio...", // SEO & social sharing description
	introText: "Your intro...", // Hero section typewriter text
	keywords: ["your", "skills"], // SEO keywords
	locale: "en_US" // OpenGraph locale
};
```

This single file controls all owner-specific text throughout the app—no need to search and replace your name in multiple files.

```bash
# Set up database (one-time)
pnpm db:setup
pnpm db:push

# Add your content to data/content/*.md, then:
pnpm db:index

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

### Database Scripts

```bash
pnpm db:setup    # Enable pgvector extension (run once on new database)
pnpm db:push     # Push schema changes to database (development)
pnpm db:generate # Generate SQL migration files (production)
pnpm db:studio   # Open Drizzle Studio web UI to browse data
pnpm db:index    # Index content files for RAG retrieval
```

**When to use each:**

- `db:setup` — Run once after creating a new Neon database to enable the pgvector extension
- `db:push` — Use during development to quickly sync schema changes without migrations
- `db:generate` — Use for production deployments to create versioned migration files
- `db:studio` — Opens a local web UI at `https://local.drizzle.studio` to view/edit data
- `db:index` — Process markdown files and generate embeddings for RAG (see below)

### Adding Your Content (RAG)

To personalize this portfolio with your own information, add markdown files to the `data/content/` folder:

```
data/
  content/
    resume.md       # Your professional background
    projects.md     # Project descriptions
    about.md        # Personal information
    skills.md       # Technical skills
    ...             # Any other .md files
```

**Markdown structure matters!** The indexer splits content by headers and preserves the hierarchy:

```markdown
# About Me → Creates chunk with heading "About Me"

## Experience → Creates chunk with heading "About Me > Experience"

### Senior Developer at Acme → Creates chunk with heading "About Me > Experience > Senior Developer at Acme"
```

**After adding/updating content:**

```bash
pnpm db:index
```

This will:

1. Clear existing embeddings (full rebuild)
2. Split each markdown file by headers
3. Generate embeddings using OpenAI's `text-embedding-3-small`
4. Store chunks with metadata (source file, title, heading path)

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

- [x] **RAG Data Indexing** — Markdown content indexer with header-based chunking and embeddings
- [x] **RAG Retrieval** — Connect vector database to chat for contextual responses
- [ ] **More Tools** — Display resume and other advanced pieces of data in chat: GitHub stats, project demos, contact form
- [ ] **Voice Input** — Speech-to-text for real conversation-like experience ([Vercel AI SDK Speech API](https://ai-sdk.dev/docs/ai-sdk-core/speech))
- [ ] **Multi-model Support** — Switch between AI providers
