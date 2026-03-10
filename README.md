# 📅 Tese.io Meeting Scheduler — SWE Intern Assessment

A fully functional AI-assisted meeting scheduling web application built for the Tese.io SWE Intern Technical Assessment. This replicates the **Climatiq × Tese** booking flow with a 5-step user journey: Calendar → Time Slot → Booking Form → Confirmation → Email Notification.

---

## 🧭 Project Overview

| Field        | Detail                              |
|--------------|-------------------------------------|
| Role         | Software Engineer Intern            |
| Company      | Tese.io                             |
| Location     | Bengaluru, Karnataka (On-site)      |
| Frontend     | React + TypeScript + Tailwind CSS   |
| Backend      | Node.js + Express                   |
| Database     | PostgreSQL + Prisma ORM             |
| Assessment   | AI-Assisted Build Challenge         |

---

## 🗂️ Project Structure

```
tese-meeting-scheduler/
│
├── frontend/                         # React App (TypeScript)
│   ├── public/
│   │   └── assets/                   # Static images, icons, logos
│   ├── src/
│   │   ├── components/
│   │   │   ├── Calendar.tsx          # Monthly calendar with date selection
│   │   │   ├── TimeSlotPicker.tsx    # 15-min slots + timezone selector
│   │   │   ├── BookingForm.tsx       # Multi-step form (name, surname, email)
│   │   │   ├── ConfirmationCard.tsx  # Post-booking summary with meeting details
│   │   │   └── ui/                   # Shared UI primitives (buttons, inputs, etc.)
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Entry: Calendar View (Step 1)
│   │   │   ├── Book.tsx              # Booking Form (Step 3)
│   │   │   └── Confirmation.tsx      # Confirmation Screen (Step 4)
│   │   ├── hooks/
│   │   │   ├── useBooking.ts         # Booking state and API calls
│   │   │   └── useTimezone.ts        # Timezone conversion logic
│   │   ├── utils/
│   │   │   └── timezones.ts          # Timezone helper functions
│   │   ├── types/
│   │   │   └── index.ts              # Shared TypeScript interfaces & types
│   │   ├── styles/
│   │   │   └── globals.css           # Tailwind base + Climatiq theme tokens
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
│
├── backend/                          # Node.js + Express API
│   ├── src/
│   │   ├── routes/
│   │   │   ├── slots.ts              # GET /api/slots
│   │   │   └── bookings.ts           # POST /api/bookings
│   │   ├── controllers/
│   │   │   ├── slotsController.ts    # Slot generation logic
│   │   │   └── bookingsController.ts # Booking creation + email trigger
│   │   ├── services/
│   │   │   ├── emailService.ts       # Nodemailer / Resend email sender
│   │   │   └── availabilityService.ts# Business logic for availability
│   │   ├── middleware/
│   │   │   ├── validation.ts         # Request validation (Zod)
│   │   │   └── errorHandler.ts       # Global error handling
│   │   ├── lib/
│   │   │   └── prisma.ts             # Prisma client instance
│   │   └── index.ts                  # Express app entry point
│   ├── prisma/
│   │   └── schema.prisma             # Database schema (PostgreSQL)
│   ├── .env                          # Backend environment variables (NOT committed)
│   ├── .env.example                  # Template for env vars
│   ├── tsconfig.json
│   └── package.json
│
├── PROMPT_LOG.md                     # ⚠️ MANDATORY: All AI prompt logs
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or pnpm
- PostgreSQL (running locally or via a hosted service)

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/tese-meeting-scheduler.git
cd tese-meeting-scheduler

# ── Frontend ──────────────────────────────────────
cd frontend
npm install
cp .env.example .env.local
# → Edit .env.local with your values

# ── Backend ───────────────────────────────────────
cd ../backend
npm install
cp .env.example .env
# → Edit .env with your database URL and email credentials

# Run database migrations
npx prisma migrate dev

# ── Start both servers ────────────────────────────
# Terminal 1 — Backend (runs on http://localhost:4000)
cd backend && npm run dev

# Terminal 2 — Frontend (runs on http://localhost:5173)
cd frontend && npm run dev
```

---

## ⚙️ Environment Variables

The backend uses a single `.env` file. Use `backend/.env.example` as the template.

```env
# Server
PORT=4000
FRONTEND_URL=http://localhost:5173

# Database (PostgreSQL — required)
DATABASE_URL=postgresql://user:password@localhost:5432/tese_scheduler

# Email (Nodemailer / Resend / Mailtrap)
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=587
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_pass
EMAIL_FROM=scheduler@tese.io

# OR use Resend
RESEND_API_KEY=re_xxxxxxxxxxxx

# Google Meet (Optional Bonus)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
```

The frontend uses `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:4000
```

---

## 🔄 User Flow (5 Steps)

```
[Step 1] Calendar View
    → User sees March 2026 monthly calendar
    → Available dates are highlighted
    → Past dates + weekends are disabled

[Step 2] Time Slot Selection
    → 15-minute interval slots appear (e.g., 16:30, 16:45, 17:00…)
    → Timezone dropdown: UTC+05:00 → UTC+07:00 (minimum)
    → Slots update dynamically on timezone change

[Step 3] Booking Form
    → Fields: First Name, Surname, Email
    → Displays: Selected date, time, timezone, meeting location (Google Meet)
    → Client-side + server-side validation

[Step 4] Confirmation Screen
    → Full meeting summary card
    → Celebratory UI (animation/confetti)
    → "Invitation email has been sent" message

[Step 5] Email Notification
    → Sent to attendee email
    → Contains: date/time (with timezone), Google Meet link
    → Action buttons: Reschedule | Cancel
```

---

## 🎨 Design System (Climatiq Branding)

Match the Climatiq × Tese color scheme from reference screenshots:

| Token              | Value          | Usage                    |
|--------------------|----------------|--------------------------|
| `--color-primary`  | `#1A7F5E`      | CTA buttons, highlights  |
| `--color-surface`  | `#FFFFFF`       | Cards, panels            |
| `--color-bg`       | `#F4F6F8`       | Page background          |
| `--color-text`     | `#111827`       | Body text                |
| `--color-muted`    | `#6B7280`       | Labels, secondary text   |
| `--color-disabled` | `#D1D5DB`       | Past/weekend dates       |
| `--color-accent`   | `#10B981`       | Available date dots      |

Fonts: Inter (primary), system-ui fallback.

> All Tailwind custom tokens are defined in `tailwind.config.ts` under `theme.extend.colors`.

---

## 🧩 Key Components

### `<Calendar />`
- Renders a monthly grid for March 2026
- Props: `selectedDate`, `onDateSelect`, `availableDates`
- Disables: past dates, Saturdays, Sundays
- Highlights: available dates with a green dot indicator

### `<TimeSlotPicker />`
- Generates 15-minute slots from configured availability window
- Props: `date`, `timezone`, `onSlotSelect`
- Contains `<TimezoneSelector />` dropdown (UTC+05:00 to UTC+07:00)
- Converts all slot times on timezone change using `lib/timezones.ts`

### `<BookingForm />`
- Controlled form with React Hook Form + Zod validation
- Fields: `firstName`, `lastName`, `email`
- Displays booking summary (read-only) above form fields
- On submit → POST to `backend /api/bookings`

### `<ConfirmationCard />`
- Receives booking data via URL params or context
- Shows: name, date, time, timezone, Google Meet link
- Animated entry (Framer Motion or CSS keyframes)


## 📦 Tech Stack

| Layer      | Technology                              |
|------------|----------------------------------------|
| Frontend   | React (Vite)                           |
| Language   | TypeScript (frontend + backend)        |
| Styling    | Tailwind CSS                           |
| Forms      | React Hook Form + Zod                  |
| Backend    | Node.js + Express                      |
| Database   | PostgreSQL                             |
| ORM        | Prisma                                 |
| Email      | Nodemailer or Resend                   |
| Animations | Framer Motion or CSS                   |
| Testing    | Vitest + React Testing Library         |

---

## 🗄️ Database Model

Managed via **Prisma ORM** with a **PostgreSQL** database. Schema lives in `backend/prisma/schema.prisma`.

### Tables & Entities

| Table        | Description                                                                 |
|--------------|-----------------------------------------------------------------------------|
| `attendees`  | Stores the person booking a meeting — name, email, created timestamp        |
| `time_slots` | Pre-seeded available slots — date, start time, end time, booked status      |
| `bookings`   | The confirmed meeting record — links an attendee to a time slot, plus timezone and meet link |
| `emails`     | Log of every email sent per booking — type (confirmation/reschedule/cancel), status, sent timestamp |

### Relationships

```
Attendee   (1) ──→ (many)  Bookings
TimeSlot   (1) ──→ (1)     Booking
Booking    (1) ──→ (many)  Emails
```

> A single attendee can make multiple bookings. Each time slot can only be booked once. Every booking can generate multiple emails (confirmation, reschedule, cancellation).

---

## ✅ Features Checklist

### Core (Required)
- [x] Monthly calendar view with date selection
- [x] Disable past dates and weekends
- [x] 15-minute time slot generation
- [x] Timezone selector (UTC+05:00 → UTC+07:00)
- [x] Dynamic slot conversion on timezone change
- [x] Multi-step booking form with validation
- [x] Confirmation page with meeting summary
- [x] Email notification on booking (test/sandbox)
- [x] Responsive design (desktop + mobile)
- [x] Error handling and loading states

### Bonus (Optional)
- [ ] Google Calendar API integration
- [ ] Auto-generated Google Meet links
- [ ] Reschedule/Cancel from email
- [ ] Admin view of all bookings
- [ ] Rate limiting on booking API
- [ ] WCAG 2.1 AA accessibility
- [ ] Unit + integration tests

---

## 📝 Prompt Log

> **MANDATORY DELIVERABLE**

All AI coding assistant interactions are logged in [`PROMPT_LOG.md`](./PROMPT_LOG.md) at the root of this repository.

Each entry follows this format:

```markdown
## Prompt #[number]
- **Timestamp:** YYYY-MM-DD HH:MM
- **Tool:** Windsurf / Cursor / Copilot
- **Mode:** Chat / Inline Edit / Agent
- **Prompt:** [Exact text]
- **Context Given:** [Files attached or selected]
- **Outcome:** Accepted / Modified / Rejected
- **What I Changed After:** [Manual edits]
- **Why:** [Reasoning]
```

---

## 🧪 Running Tests

```bash
# Unit tests
npm run test

# With coverage
npm run test:coverage

# E2E (if configured)
npm run test:e2e
```

---

## 📤 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Set environment variables in the Vercel dashboard under **Project → Settings → Environment Variables**.

### Railway / Render
- Connect GitHub repo
- Set `NODE_ENV=production`
- Add all `.env.local` variables to the platform's env config

---

## 📬 Submission

- **GitHub Repo:** [Link here]
- **Live Demo:** [Vercel URL here]
- **Loom Video:** [3–5 min walkthrough]
- **Submit to:** sushil@tese.io
- **Subject:** `SWE Intern Assessment — [Your Full Name]`

---

## 🤖 AI Tools Used

| Tool        | Purpose                                      |
|-------------|----------------------------------------------|
| VS code    | Primary AI coding IDE (Codex Plugin)               |
| Claude      | Architecture planning, debugging             |
| GPT-5.3      | Code generation, problem solving             |

All prompts are logged in `PROMPT_LOG.md`.

---

## 📄 License

This project is submitted as part of the Tese.io SWE Intern Technical Assessment. **Confidential — for candidate use only. Do not distribute.**
