# SLO Alumni Reunion Invitation

Public-facing event website and registration form built for a real school alumni reunion. The project is used as an informational landing page and submission flow for graduates, while a separate authenticated admin panel is used by organizers to review registrations.

The interface is written in Polish because it serves a real local audience, but this README describes the project in English for portfolio and recruiter review.

## Live Project

Public website:

<https://mikel538.github.io/Zaproszenie-Zjazd-SLO/>

Related admin panel:

<https://mikel538.github.io/Zaproszenie-Zjazd-SLO-Admin/>

Demo credentials for the admin panel:

- Email: `test`
- Password: `test`

## Project Purpose

- Publish clear reunion details for alumni
- Collect registrations through a simple low-friction form
- Capture optional background data about alumni career and education paths
- Separate public registration from protected administrative access

## Features

- Responsive single-page event website
- Event information blocks for date, venue, fee and attendance details
- Registration form with required attendee data:
  - first name
  - surname
  - email
  - graduation year
  - optional extra note
- Optional alumni survey fields:
  - completed studies
  - current profession
  - work country
- Client-side validation before submission
- Required consent checkbox with modal terms / GDPR information
- Basic anti-spam honeypot field
- Direct Supabase insert from the frontend

## Architecture

This repository contains the public registration website only.

The administrative side of the system lives in a separate repository and is intentionally split from the public frontend. That admin app uses Supabase Auth and Row Level Security to protect access to real submissions.

In this public project:

- the website is static and deployed on GitHub Pages
- form submissions are sent from vanilla JavaScript to Supabase
- the frontend uses a public Supabase key, while data protection is handled in the database and admin layer

## Tech Stack

- HTML5
- SCSS/CSS
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
|  |- script.js
|- img/
|- style/
|- style.scss
|- style.min.css
`- readme.md
```

## Notes

- This is a real project prepared for a school event, not a fictional landing page.
- The public form stores data in Supabase, while secure record management is handled in the separate admin application.
