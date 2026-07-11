builder-ki System Overview

What It Is

A personal knowledge management system that captures your thoughts (voice/photo/video), processes them with AI to extract insights,  
 and visualizes patterns across your menstrual cycle.

---

Core Components

1. Input Layer (Mobile - iOS)

- Voice Recording → Real-time capture or upload existing audio -> **ultimate audio ingester**
- Photos/Videos → Camera or library upload with EXIF data
- Daily Logs → Text notes (intention, daily, reflection, general)
- Cycle Tracking → Menstrual periods with flow intensity

2. Storage Layer (Supabase)

- PostgreSQL Database → All structured data (captures, insights, documents, cycles)
- File Storage → Audio files, images, videos in separate buckets
- Authentication → Email/password with row-level security

3. Processing Pipeline (n8n + AI)

- Transcription → OpenAI Whisper converts audio → text
- Synthesis → Anthropic Claude extracts:
  - Insights
  - Decisions
  - Questions
  - Concepts
- Knowledge Graph → Neo4j stores relationships between ideas

4. Visualization Layer (Web - Next.js)

- Pensieve Dashboard → Search/filter all captures with expandable insights
- Daily View → Date-based exploration with calendar navigation
- Document Editor → Rich text expansion of captures (Tiptap)
- Thinking Partner → AI chat with context from your entire capture database
- Media Library → Photo/video gallery with annotations

5. Planned: Timer System

- Mobile → Start/stop named timers, link voice notes to active sessions
- Web Calendar → Visualize timer sessions on 28-day cycle wheel

---

Data Flow (Step-by-Step)

CAPTURE (Mobile)
└─> Upload to Supabase Storage
└─> Create database record (status: pending)
└─> Auto-populate cycle day/phase based on log date

              ↓ webhook triggers n8n

PROCESSING (n8n)
└─> Download file from storage
└─> Transcribe with Whisper API (status: transcribing)
└─> Synthesize with Claude API (status: synthesizing)
└─> Create Neo4j nodes & relationships
└─> Save insights to Supabase (status: complete)

VISUALIZATION (Web)
└─> User searches/filters captures
└─> Display transcriptions + insights
└─> User creates document from capture
└─> User chats with AI using document context
└─> AI queries relevant captures for deeper context

---

Key Data Models

Captures → Core entity (voice/photo/video) with:

- Transcription/annotation
- Processing status
- Note type
- Cycle day (1-28) & phase (menstrual/follicular/ovulation/luteal)
- Link to daily log

Insights → AI-extracted from captures:

- Type: insight/decision/question/concept
- Content text
- Linked to parent capture

Documents → Rich text expansions:

- Tiptap JSON format
- Optional link to source capture
- Powers Thinking Partner context

Daily Logs → One per day per user:

- Groups all captures by date
- Backfillable for historical entries

Cycle Periods → Menstrual tracking:

- Start/end dates
- Flow intensity
- Auto-calculates cycle phase for all captures

---

Unique Features for Visuals

1. Automatic Cycle Tagging → Every capture is auto-tagged with cycle day/phase via database trigger
2. Dual Storage → Supabase (fast queries) + Neo4j (relationship mapping)
3. Context-Aware AI → Thinking Partner searches your database using keyword matching (last 5 recent + top 10 relevant)
4. Mobile Capture → Web Expansion → Voice notes on-the-go, deep work on desktop
5. Processing Pipeline → Visible status tracking (pending → transcribing → synthesizing → complete)

---

Flow Chart Suggestions

For your visuals, I'd recommend creating:

1. System Architecture Diagram → Show the 3 layers (Mobile | Supabase/n8n | Web)
2. Data Processing Pipeline → Capture → Transcribe → Synthesize → Graph → Display
3. User Journey Map → Record voice → See transcription → Expand in document → Chat with AI
4. Cycle Integration Flow → How period tracking auto-tags all captures
5. Database Schema → Key tables and relationships (captures ↔ insights ↔ documents)
