// keystatic.config.ts
import { config, fields, collection, singleton } from "@keystatic/core";

// 1. Dynamic Repo Config (Robust Logic)
// 1. Dynamic Repo Config (Robust Logic)
const isProduction = process.env.NODE_ENV === "production";
const repo = (process.env.NEXT_PUBLIC_GITHUB_REPO || "").replace(
  "https://github.com/",
  "",
) as `${string}/${string}`;

console.log(`[Keystatic Config] Env: ${process.env.NODE_ENV}, Repo: ${repo}`);

// 2. Build Mode Detection (Fix for Vercel Build)
// When running in Vercel CI (Build), we want to use the File System (Local Mode)
// to ensure the 'reader' can find files in the cloned directory structure.
const isBuild = process.env.CI === "1";

// Force local mode for robustness during development/build without valid tokens
// const storageStrategy = { kind: "local" as const };
const storageStrategy =
  isProduction && repo && !isBuild
    ? {
        kind: "github" as const,
        repo,
      }
    : { kind: "local" as const };

console.log(`[Keystatic Config] Storage Strategy: ${storageStrategy.kind}`);

// 2. Asset Path Constants (The "Hardcoding" Fix)
// storageStrategy determines if we are in GitHub mode (Repo Root context) or Local mode (CWD context)
// const isGitHubMode = false; // Forced to false because storageStrategy is hardcoded to local above
const isGitHubMode = storageStrategy.kind === "github";

// In GitHub mode, we are at Repo Root, so we need to go into 'permitasapp/public/images'
// In Local mode, we are likely running 'npm run dev' inside 'permitasapp', so 'public/images' is correct.
const ASSET_BASE_PATH = isGitHubMode
  ? "permitasapp/public/images"
  : "public/images";

const ASSET_PUBLIC_PATH = "/images";

const CONTENT_PREFIX = isGitHubMode ? "permitasapp/" : "";

export default config({
  storage: storageStrategy,

  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: `${CONTENT_PREFIX}content/projects/*`,
      format: { contentField: "description" },
      schema: {
        title: fields.slug({ name: { label: "Project Title" } }),
        coverImage: fields.image({
          label: "Main Render",
          // Dynamic Path Injection
          directory: `${ASSET_BASE_PATH}/projects`,
          publicPath: `${ASSET_PUBLIC_PATH}/projects/`,
        }),
        location: fields.text({ label: "Location" }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Completed", value: "completed" },
            { label: "Under Construction", value: "construction" },
            { label: "Concept", value: "concept" },
          ],
          defaultValue: "completed",
        }),
        category: fields.select({
          label: "Typology",
          options: [
            { label: "Residential", value: "residential" },
            { label: "Commercial", value: "commercial" },
            { label: "Interior", value: "interior" },
            { label: "Landscape", value: "landscape" },
          ],
          defaultValue: "residential",
        }),
        year: fields.text({ label: "Year (YYYY)" }),
        area: fields.text({ label: "Area (Sq ft)" }),
        credits: fields.text({ label: "Credits" }),
        gallery: fields.array(
          fields.image({
            label: "Gallery Image",
            directory: `${ASSET_BASE_PATH}/projects/gallery`,
            publicPath: `${ASSET_PUBLIC_PATH}/projects/gallery/`,
          }),
          { label: "Image Gallery" },
        ),
        description: fields.document({
          label: "Case Study",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    team: collection({
      label: "Team",
      slugField: "name",
      path: `${CONTENT_PREFIX}content/team/*`,
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        role: fields.text({ label: "Job Title" }),
        photo: fields.image({
          label: "Headshot",
          directory: `${ASSET_BASE_PATH}/team`,
          publicPath: `${ASSET_PUBLIC_PATH}/team/`,
        }),
        bio: fields.text({ label: "Short Bio", multiline: true }),
        linkedin: fields.url({ label: "LinkedIn URL" }),
      },
    }),
    testimonials: collection({
      label: "Testimonials",
      slugField: "client",
      path: `${CONTENT_PREFIX}content/reviews/*`,
      schema: {
        client: fields.slug({ name: { label: "Client Name" } }),
        quote: fields.text({ label: "Review", multiline: true }),
        project: fields.relationship({
          label: "Related Project",
          collection: "projects",
        }),
      },
    }),
    faqs: collection({
      label: "FAQs",
      slugField: "question",
      path: `${CONTENT_PREFIX}content/faq/*`,
      schema: {
        question: fields.slug({ name: { label: "Question" } }),
        answer: fields.document({ label: "Answer", formatting: true }),
      },
    }),
  },

  singletons: {
    settings: singleton({
      label: "Global Settings",
      path: `${CONTENT_PREFIX}content/settings`,
      schema: {
        siteTitle: fields.text({ label: "Website Title" }),
        siteDescription: fields.text({
          label: "SEO Description",
          multiline: true,
        }),
        logo: fields.image({
          label: "Logo",
          directory: `${ASSET_BASE_PATH}/brand`,
          publicPath: `${ASSET_PUBLIC_PATH}/brand/`,
        }),
        socialInstagram: fields.url({ label: "Instagram Link" }),
        socialLinkedIn: fields.url({ label: "LinkedIn Link" }),
        contactEmail: fields.text({ label: "Official Email" }),
        contactPhone: fields.text({ label: "Phone Number" }),
        footerText: fields.text({ label: "Footer Copyright Text" }),
        navigation: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            link: fields.text({ label: "URL Path" }),
          }),
          {
            label: "Main Navigation",
            itemLabel: (props) => props.fields.label.value || "Menu Item",
          },
        ),
      },
    }),
    homePage: singleton({
      label: "Home Page",
      path: `${CONTENT_PREFIX}content/pages/home`,
      schema: {
        // --- Hero Section ---
        heroHeadline: fields.text({ label: "Hero Title" }),
        heroSubhead: fields.text({ label: "Sub-headline" }),
        heroVideoFile: fields.file({
          label: "Hero Video File (Upload)",
          description:
            "Upload a small .mp4 file (Max 10MB recommended). Prioritized over the URL below.",
          directory: `${ASSET_BASE_PATH}/videos`,
          publicPath: `${ASSET_PUBLIC_PATH}/videos/`,
          validation: { isRequired: false },
        }),
        heroVideoUrl: fields.text({
          label: "Hero Background Video URL",
          description:
            "Direct link to .mp4 file (e.g. Vimeo direct link, AWS S3, Pexels). Overrides image if present.",
        }),
        heroImage: fields.image({
          label: "Hero Fallback Image",
          directory: `${ASSET_BASE_PATH}/pages`,
          publicPath: `${ASSET_PUBLIC_PATH}/pages/`,
        }),

        // --- Mission Statement (Storyboard) ---
        missionLine1: fields.text({ label: "Mission Line 1 (Precision)" }),
        missionLine2: fields.text({ label: "Mission Line 2 (Trust)" }),
        missionLine3: fields.text({ label: "Mission Line 3 (Approval)" }),
        missionBody: fields.text({
          label: "Mission Body Text",
          multiline: true,
        }),

        // --- Services Section ---
        services: fields.array(
          fields.object({
            title: fields.text({ label: "Service Title" }),
            description: fields.text({ label: "Description", multiline: true }),
            linkUrl: fields.text({ label: "Link URL" }),
          }),
          {
            label: "Services List",
            itemLabel: (props) => props.fields.title.value || "Service Item",
          },
        ),

        // --- Process Section ---
        processSteps: fields.array(
          fields.object({
            title: fields.text({ label: "Step Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          {
            label: "Process Flow Steps",
            itemLabel: (props) => props.fields.title.value || "Process Step",
          },
        ),

        // --- Selected Works ---
        featuredProjects: fields.array(
          fields.relationship({
            label: "Project",
            collection: "projects",
          }),
          {
            label: "Featured Work",
            itemLabel: (props) => props.value || "Select Project",
          },
        ),

        // --- Testimonials Section ---
        testimonialSelection: fields.array(
          fields.relationship({
            label: "Testimonial",
            collection: "testimonials",
          }),
          {
            label: "Testimonials to Display",
            itemLabel: (props) => props.value || "Select Testimonial",
          },
        ),
      },
    }),
    contactPage: singleton({
      label: "Contact Page",
      path: `${CONTENT_PREFIX}content/pages/contact`,
      schema: {
        heading: fields.text({ label: "Page Heading" }),
        subtext: fields.text({ label: "Sub-text" }),
        calendlyUrl: fields.text({ label: "Booking URL (Cal.com/Calendly)" }),
        formSuccessMessage: fields.text({ label: "Success Message" }),
      },
    }),
    legal: singleton({
      label: "Legal Pages",
      path: `${CONTENT_PREFIX}content/pages/legal`,
      schema: {
        privacyPolicy: fields.document({
          label: "Privacy Policy Text",
          formatting: true,
        }),
        termsOfService: fields.document({
          label: "Terms & Conditions",
          formatting: true,
        }),
      },
    }),
    aboutPage: singleton({
      label: "About Page",
      path: `${CONTENT_PREFIX}content/pages/about`,
      schema: {
        stats: fields.array(
          fields.object({
            value: fields.text({ label: "Value (e.g. 100+)" }),
            label: fields.text({ label: "Label (e.g. Projects)" }),
          }),
          {
            label: "Stats Bar",
            itemLabel: (props) =>
              `${props.fields.value.value} - ${props.fields.label.value}`,
          },
        ),
      },
    }),
  },
});
