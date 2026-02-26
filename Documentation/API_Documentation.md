# Permitas App - API Documentation

This document outlines the API integrations and endpoints used within the Permitas Next.js application. Based on the current architecture, the project primarily relies on a headless CMS approach with Keystatic and third-party API integrations, rather than custom-built internal Next.js API routes.

## 1. Content Management API (Keystatic)

The application uses [Keystatic](https://keystatic.com/) for content management, which exposes a required API route to handle reading and writing to the local file system or GitHub repository.

### Endpoint: `/api/keystatic/[...params]`

- **Method(s):** `GET`, `POST`
- **Location:** `app/api/keystatic/[[...params]]/route.tsx`
- **Purpose:** Acts as the bridge between the Keystatic Admin UI (accessible at `/keystatic`) and the content storage (Markdown/JSON files).
- **Authentication:** In local mode, no authentication is strictly enforced by the route. In `github` mode (production), it relies on GitHub OAuth tokens.
- **Payload & Responses:** Managed internally by `@keystatic/next`. It handles fetching collections (Projects, Team, Testimonials, FAQs) and singletons (Settings, Home Page, Contact Page, Legal, About).

---

## 2. External Integrations

### 2.1 Web3Forms (Contact Form Submission)

The contact form in the application sends messages directly to an external service, avoiding the need for a custom email-sending backend route.

- **Endpoint:** `https://api.web3forms.com/submit`
- **Method:** `POST`
- **Location Referenced:** `components/contact/ContactForm.tsx`
- **Headers:**
  - `Content-Type`: `application/json`
  - `Accept`: `application/json`
- **Request Body (JSON):**
  - `access_key` (string, required): Handled via environment variable `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.
  - `name` (string): Sender's name.
  - `email` (string): Sender's email address.
  - `phone` (string, optional): Sender's phone number.
  - `message` (string): The inquiry or message content.
  - `from_name` (string): Hardcoded to `"Permitas Contact Form"`.
- **Response Handling:**
  - Expects a JSON response with a `success` boolean.
  - Upon success, displays a confirmation message.
  - Logs errors to the console in case of failure.

### 2.2 Cal.com / Calendly Integration

- **Purpose:** Used for booking appointments on the contact page.
- **Implementation:** Integrated via the `@calcom/embed-react` package. The specific booking URL can be configured through the Keystatic admin panel under "Contact Page settings" (`calendlyUrl`).
- **Endpoint:** This is a client-side iframe/widget embed, so there is no direct server-to-server REST API call required from the Next.js backend.
