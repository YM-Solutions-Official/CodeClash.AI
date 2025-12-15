# CodeClash.AI

## What is this?
A real-time 1v1 competitive coding platform where two users solve the same problem under a time limit and submit their solutions to determine a winner.

## Why We're building this
We originally built a version of this during a hackathon. It worked, but the codebase was rushed and over-scoped.
This rebuild focuses on doing one thing well first: a clean, minimal competitive coding experience.
No feature overload. No premature complexity.

## Core Idea (Week 1)
- Two users join the same room
- The room creator starts the match
- Both users receive the same problem
- A countdown timer begins
- Users write code privately
- Users submit before time runs out
- A winner is declared


## Tech Stack
- Frontend: Next.js + TypeScript
- Backend: Express.js + TypeScript
- Realtime: Socket.io
- Code Editor: Monaco Editor
- Deployment:
  - Frontend: Vercel
  - Backend: Render

## MVP (Week 1)
- Create / Join room via code
- Start match
- Hardcoded coding problem
- Timer
- Code submission
- Simple winner logic
- Deployed and usable

## Planned Features (Later)
1. Authentication
2. Multiple problems & topics
3. Code execution & judging
4. Rankings & match history
5. AI mentor & recommendations

## Status
🚧 Week 1 – Building the core competitive loop

