# Content Architecture & CMS Schema Specification

**Project:** Architect Portfolio & Lead Gen Platform
**Tech Stack:** Next.js 15, Keystatic (Git-based CMS), TypeScript
**Version:** 1.0.0
**Status:** Approved for Implementation

## 1. Executive Overview

This document defines the data models (Schemas) required for the content management system. The architecture separates content into **Collections** (repeatable data like Projects/Team) and **Singletons** (global data like Site Settings/Contact Info). This structure supports the current requirement (solopreneur) while enabling scalable future growth (hiring/team expansion).

---

## 2. Collections (Repeatable Data)

### 2.1 Projects Collection

_Primary portfolio items. Supports both built works and conceptual designs._

**Route:** `/projects/{slug}`
**Storage Path:** `content/projects/*`

| Field Key     | Data Type      | Label          | Validation / Configuration                                     | Description                                                     |
| :------------ | :------------- | :------------- | :------------------------------------------------------------- | :-------------------------------------------------------------- |
| `title`       | `slug`         | Project Title  | **Required**. Unique identifier.                               | The public name of the project (e.g., "The Courtyard House").   |
| `coverImage`  | `image`        | Main Render    | **Required**. Validation: Aspect ratio 16:9 preferred.         | The hero image displayed on the home page grid.                 |
| `location`    | `text`         | Location       | **Required**.                                                  | City, State (e.g., "Chennai, India").                           |
| `status`      | `select`       | Project Status | Options: `Completed`, `Under Construction`, `Concept`.         | Filters projects in the UI (e.g., separate "Built" vs "Ideas"). |
| `category`    | `select`       | Typology       | Options: `Residential`, `Commercial`, `Interior`, `Landscape`. | Used for filtering on the portfolio page.                       |
| `year`        | `text`         | Year           | Format: YYYY                                                   | Completion or design year.                                      |
| `area`        | `text`         | Area (Sq ft)   | Optional.                                                      | Built-up area metrics.                                          |
| `credits`     | `text`         | Credits        | Optional.                                                      | Text field for structural engineers, 3D visualizers, etc.       |
| `gallery`     | `array<image>` | Image Gallery  | Min: 1 image.                                                  | Full-resolution project images for the detail view.             |
| `description` | `document`     | Case Study     | Rich Text (Bold, Italic, Links).                               | The narrative description of the design philosophy.             |

### 2.2 Team Collection

_Staff profiles. Currently configured for a single principal architect but architected to support future hiring._

**Storage Path:** `content/team/*`

| Field Key  | Data Type | Label        | Validation / Configuration | Description                                      |
| :--------- | :-------- | :----------- | :------------------------- | :----------------------------------------------- |
| `name`     | `slug`    | Name         | **Required**.              | Full name of the team member.                    |
| `role`     | `text`    | Job Title    | **Required**.              | e.g., "Principal Architect", "Junior Architect". |
| `photo`    | `image`   | Headshot     | **Required**.              | Professional portrait.                           |
| `bio`      | `text`    | Short Bio    | Max char: 300.             | A brief introduction for the card view.          |
| `linkedin` | `url`     | LinkedIn URL | Optional.                  | Social connection link.                          |

### 2.3 Testimonials Collection

_Client reviews and social proof._

**Storage Path:** `content/reviews/*`

| Field Key | Data Type      | Label           | Validation / Configuration                | Description                                                   |
| :-------- | :------------- | :-------------- | :---------------------------------------- | :------------------------------------------------------------ |
| `client`  | `slug`         | Client Name     | **Required**.                             | Name of the person giving the review.                         |
| `quote`   | `text`         | Review          | **Required**.                             | The testimonial text.                                         |
| `project` | `relationship` | Related Project | Optional. Links to `projects` collection. | Contextualizes the review (e.g., "Review for _Beach House_"). |

### 2.4 FAQs Collection

_Common questions to reduce repetitive inquiries._

**Storage Path:** `content/faq/*`

| Field Key  | Data Type  | Label    | Validation / Configuration | Description                                |
| :--------- | :--------- | :------- | :------------------------- | :----------------------------------------- |
| `question` | `slug`     | Question | **Required**.              | e.g., "What is your design fee structure?" |
| `answer`   | `document` | Answer   | **Required**. Rich Text.   | The detailed response.                     |

---

## 3. Singletons (Global & Page-Specific Data)

### 3.1 Global Site Settings

_Data that appears in the Header, Footer, and SEO meta tags._

**Storage Path:** `content/settings.json`

| Field Key         | Data Type | Label           | Description                                   |
| :---------------- | :-------- | :-------------- | :-------------------------------------------- |
| `siteTitle`       | `text`    | Website Title   | Used for SEO (e.g., "Studio Arch - Chennai"). |
| `siteDescription` | `text`    | SEO Description | Meta description for Google Search results.   |
| `logo`            | `image`   | Logo (SVG/PNG)  | The main brand asset.                         |
| `socialInstagram` | `url`     | Instagram Link  | Footer link.                                  |
| `socialLinkedIn`  | `url`     | LinkedIn Link   | Footer link.                                  |
| `contactEmail`    | `text`    | Official Email  | Displayed in the footer.                      |
| `contactPhone`    | `text`    | Phone Number    | Displayed in the footer.                      |

### 3.2 Contact Page Configuration

_Manages the "Book Consultation" page logic._

**Storage Path:** `content/pages/contact.json`

| Field Key            | Data Type | Label              | Description                                                              |
| :------------------- | :-------- | :----------------- | :----------------------------------------------------------------------- |
| `heading`            | `text`    | Page Heading       | e.g., "Start your dream project".                                        |
| `subtext`            | `text`    | Sub-text           | Instructions for the user.                                               |
| `calendlyUrl`        | `text`    | Calendly Event URL | The embed link for the booking widget (e.g., `calendly.com/user/30min`). |
| `formSuccessMessage` | `text`    | Success Message    | Text shown after form submission (e.g., "Thanks! We'll be in touch.").   |

### 3.3 Home Page Configuration

_Editable sections of the landing page._

**Storage Path:** `content/pages/home.json`

| Field Key          | Data Type      | Label           | Description                                                                   |
| :----------------- | :------------- | :-------------- | :---------------------------------------------------------------------------- |
| `heroHeadline`     | `text`         | Hero Title      | Big text at the top (e.g., "Designing Timeless Spaces").                      |
| `heroSubhead`      | `text`         | Sub-headline    | Supporting text.                                                              |
| `heroImage`        | `image`        | Hero Background | High-res background image.                                                    |
| `featuredProjects` | `relationship` | Featured Work   | Select specific projects from the `Projects` collection to highlight on Home. |

---

## 4. Legal & Compliance Data

### 4.1 Legal Pages

_Static text content for compliance._

**Storage Path:** `content/pages/legal.json`

| Field Key        | Data Type  | Label               | Description                                     |
| :--------------- | :--------- | :------------------ | :---------------------------------------------- |
| `privacyPolicy`  | `document` | Privacy Policy Text | Rich text field for the GDPR/Privacy statement. |
| `termsOfService` | `document` | Terms & Conditions  | Rich text field for service terms.              |

---

## 5. Technical Implementation Notes for AI Agents

1.  **Image Handling:** All `image` fields must be configured in Keystatic to output to `public/images/{collection_name}/` and reference the path relative to the public root.
2.  **Rich Text:** The `document` fields use Keystatic's structured content JSON. Ensure the frontend renderer (`@keystatic/next/renderer`) is implemented to handle bold, italic, and list formatting.
3.  **Relationships:** The `featuredProjects` field in the Home Page singleton must resolve the relation to fetch the `coverImage` and `slug` of the selected projects at build time.
