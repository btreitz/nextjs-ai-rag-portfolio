# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server (http://localhost:3000)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Architecture

**nextjs-ai-rag-portfolio** - A Next.js 16 App Router application for building AI-powered portfolio websites with RAG (Retrieval-Augmented Generation) capabilities using the Vercel AI SDK.

### Key Dependencies

- **Vercel AI SDK** (`ai`, `@ai-sdk/openai`, `@ai-sdk/react`) - For streaming chat and tool calling
- **Tailwind CSS v4** - Styling via `@tailwindcss/postcss` with typography plugin
- **Framer Motion** - Animations and transitions
- **Zod** - Schema validation for AI tools
- **react-markdown** + **react-syntax-highlighter** - Markdown rendering with code highlighting

### Project Structure

```
app/
  page.tsx              # Main chat page (thin orchestration layer)
  api/chat/route.ts     # AI chat API endpoint
  globals.css           # CSS variables, animations, complex styles

components/
  chat/                 # Chat-specific components
    hero-section.tsx    # Landing hero with title and suggestions
    chat-messages.tsx   # Message list with bubble rendering
    chat-input.tsx      # Animated input with rainbow border
  ui/                   # Reusable UI components
    ai-bubble.tsx       # AI message bubble styling
    button.tsx          # shadcn-style button
    chat-bubble.tsx     # Bubble dispatcher (ai/user)
    code-block.tsx      # Syntax-highlighted code
    conversation.tsx    # Scroll container (use-stick-to-bottom)
    tool-output.tsx     # Collapsible tool result display
    typewriter-text.tsx # Character-by-character animation
    user-bubble.tsx     # User message bubble styling

lib/
  utils.ts              # cn() helper for class merging
```

### AI SDK Patterns

- The chat API uses `UIMessage` and `convertToModelMessages` for message handling
- Tools are defined with Zod schemas via the `tool()` helper
- Custom tool results render in the frontend via `message.parts` with type discrimination (e.g., `"tool-weather"`)
- `stepCountIs(n)` controls agentic loop iterations

### Environment

- Requires `OPENAI_API_KEY` environment variable for the OpenAI provider

---

## Best Practices

### Component Architecture

1. **Separation of Concerns**

   - Page components (`app/page.tsx`) should be thin orchestration layers
   - Extract feature logic into dedicated components under `components/`
   - Import components directly from their files (no barrel exports)

2. **Component Organization**

   - `components/ui/` - Generic, reusable UI primitives
   - `components/chat/` - Feature-specific components
   - Co-locate related components in feature folders

3. **Component Design**
   - Use `forwardRef` for input components that need ref access
   - Define clear prop interfaces with TypeScript
   - Include JSDoc comments for complex components
   - Prefer composition over configuration

### Styling with Tailwind CSS

1. **Prefer Utility Classes**

   - Use Tailwind utility classes directly in JSX whenever possible
   - Avoid creating custom CSS unless absolutely necessary

2. **When to Use globals.css**

   - CSS variables and theme definitions
   - Keyframe animations (Tailwind doesn't support custom keyframes inline)
   - Styles that override third-party library defaults

3. **Document CSS Decisions**

   - Add comments explaining why styles are in CSS instead of Tailwind
   - Group related styles with section headers

4. **Dark Mode**
   - This project uses `prefers-color-scheme` (automatic system detection)
   - Use `dark:` variants in Tailwind for simple cases
   - Complex light/dark variants may need CSS media queries

### React & Next.js Patterns

1. **Client Components**

   - Add `"use client"` only when needed (hooks, browser APIs, event handlers)
   - Keep server components where possible for better performance

2. **State Management**

   - Lift state to the nearest common ancestor
   - Use `useState` for local UI state
   - Leverage AI SDK hooks (`useChat`) for chat state

3. **Animation**
   - Use Framer Motion for complex animations
   - Keep animation variants co-located with components
   - Use `AnimatePresence` for enter/exit animations

### TypeScript

1. **Type Safety**

   - Define explicit interfaces for component props
   - Use `type` for simple type aliases, `interface` for extensible types
   - Leverage AI SDK types (`UIMessage`, etc.)

2. **Imports**
   - Use path aliases (`@/components/...`) for cleaner imports
   - Group imports: React, external libs, internal modules

### Code Quality

1. **File Size**

   - Each component should be in its own file
   - If a component exceeds ~150 lines, consider splitting it
   - Extract reusable logic into custom hooks or utilities

2. **Naming**

   - Components: PascalCase (`ChatMessages.tsx`)
   - Utilities: camelCase (`utils.ts`)
   - Constants: SCREAMING_SNAKE_CASE

3. **Comments**
   - Avoid obvious comments
   - Document "why" not "what"
   - Use JSDoc for public component APIs
