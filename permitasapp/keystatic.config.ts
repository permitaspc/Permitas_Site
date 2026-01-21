// keystatic.config.ts
import { config, fields, collection, singleton } from "@keystatic/core";

// ROOT CAUSE FIX:
// 1. We use process.env.NODE_ENV because it is visible to the Browser.
// 2. We explicitly check for the Repo variable to ensure we don't crash.
const isProduction = process.env.NODE_ENV === "production";
const repo = process.env.NEXT_PUBLIC_GITHUB_REPO as `${string}/${string}`;

const storageStrategy =
  isProduction && repo
    ? {
        kind: "github" as const,
        repo: repo,
      }
    : {
        kind: "local" as const,
      };

export default config({
  storage: storageStrategy,

  // ... (The rest of your collections/singletons remain exactly the same)
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      format: { contentField: "description" },
      schema: {
        title: fields.slug({ name: { label: "Project Title" } }),
        coverImage: fields.image({
          label: "Main Render",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
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
            directory: "public/images/projects/gallery",
            publicPath: "/images/projects/gallery/",
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
      path: "content/team/*",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        role: fields.text({ label: "Job Title" }),
        photo: fields.image({
          label: "Headshot",
          directory: "public/images/team",
          publicPath: "/images/team/",
        }),
        bio: fields.text({ label: "Short Bio", multiline: true }),
        linkedin: fields.url({ label: "LinkedIn URL" }),
      },
    }),
    testimonials: collection({
      label: "Testimonials",
      slugField: "client",
      path: "content/reviews/*",
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
      path: "content/faq/*",
      schema: {
        question: fields.slug({ name: { label: "Question" } }),
        answer: fields.document({ label: "Answer", formatting: true }),
      },
    }),
  },

  singletons: {
    settings: singleton({
      label: "Global Settings",
      path: "content/settings",
      schema: {
        siteTitle: fields.text({ label: "Website Title" }),
        siteDescription: fields.text({
          label: "SEO Description",
          multiline: true,
        }),
        logo: fields.image({
          label: "Logo",
          directory: "public/images/brand",
          publicPath: "/images/brand/",
        }),
        socialInstagram: fields.url({ label: "Instagram Link" }),
        socialLinkedIn: fields.url({ label: "LinkedIn Link" }),
        contactEmail: fields.text({ label: "Official Email" }),
        contactPhone: fields.text({ label: "Phone Number" }),
      },
    }),
    homePage: singleton({
      label: "Home Page",
      path: "content/pages/home",
      schema: {
        heroHeadline: fields.text({ label: "Hero Title" }),
        heroSubhead: fields.text({ label: "Sub-headline" }),
        heroImage: fields.image({
          label: "Hero Background",
          directory: "public/images/pages",
          publicPath: "/images/pages/",
        }),
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
      },
    }),
    contactPage: singleton({
      label: "Contact Page",
      path: "content/pages/contact",
      schema: {
        heading: fields.text({ label: "Page Heading" }),
        subtext: fields.text({ label: "Sub-text" }),
        calendlyUrl: fields.text({ label: "Calendly Event URL" }),
        formSuccessMessage: fields.text({ label: "Success Message" }),
      },
    }),
    legal: singleton({
      label: "Legal Pages",
      path: "content/pages/legal",
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
  },
});
