# SLO Alumni Reunion Invitation

Public-facing event website and registration flow built for a real school alumni reunion. The project is part of a small fullstack system: this repository handles the public experience, while a separate authenticated admin panel is used to review registrations stored in Supabase.

The UI is written in Polish because it serves a real local audience. This README is written in English for portfolio and recruiter review.

## Live Project

Public website:

<https://mikel538.github.io/Zaproszenie-Zjazd-SLO/>

Related admin panel:

<https://mikel538.github.io/Zaproszenie-Zjazd-SLO-Admin/>

Demo credentials for the admin panel:

- Email: `test`
- Password: `test`

## Portfolio Context

This project represents how I approach small real-world product work as a junior fullstack developer:

- building a complete user flow instead of a static mockup
- connecting a public frontend to a real backend service
- separating public and administrative responsibilities into different apps
- treating validation, consent and data handling as part of the implementation, not as afterthoughts

## What This Project Does

- publishes reunion details in a simple responsive layout
- collects attendee registrations through a low-friction form
- stores submissions in Supabase
- captures optional background data about alumni education and work paths
- passes management of submitted data to a separate protected admin application

## Key Features

- Responsive landing page for a real event
- Registration form with required attendee data: first name, surname, email, graduation year and optional note
- Optional alumni survey fields: completed studies, profession and work country
- Client-side validation before submission
- Consent checkbox with modal terms / GDPR information
- Honeypot anti-spam field
- Direct insert to Supabase from vanilla JavaScript
- Static deployment through GitHub Pages

## Architecture

This repository contains only the public-facing side of the system.

The full workflow is:

1. A visitor opens the public reunion website.
2. The form validates required fields in the browser.
3. Valid submissions are sent to Supabase.
4. Organizers review the data in a separate authenticated admin panel.

This split was intentional. The public website stays simple, while administrative access and data protection are handled separately in the admin repository and database layer.

## Engineering Notes

- The frontend uses a public Supabase key, which is expected for browser-based access.
- Security does not rely on hiding frontend code.
- Data protection is enforced in Supabase through database permissions and admin-side authentication.
- The project was built for practical use, not only as a portfolio exercise.

## Tech Stack

- HTML5
- SCSS / CSS
- Vanilla JavaScript (ES Modules)
- Supabase
- GitHub Pages

## Local Run

No build process is required to preview the current version.

1. Clone the repository:

```bash
git clone https://github.com/MikeL538/Zaproszenie-Zjazd-SLO.git
```

2. Open `index.html` in a browser or run it with a simple local server.

## Repository Structure

```text
.
|- index.html
|- js/
|  `- script.js
|- img/
|- style/
|- style.scss
|- style.min.css
`- readme.md
```

## Why It Matters

- It is a real project prepared for an actual event, not a fictional landing page.
- It shows end-to-end thinking across frontend UX, validation, backend integration and admin workflow.
- It demonstrates that even a small vanilla JavaScript project can be structured like a practical product feature.
