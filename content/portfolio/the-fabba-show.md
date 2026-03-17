---
title: The FABBA Show Web Platform v2 Overhaul
category: Client
publishedAt: 2026-03-13
description: A complete architectural overhaul featuring a Sanity v3 upgrade, dynamic event routing, and a custom UI tailored to the band's iconic stage aesthetic.
liveUrl: https://www.thefabbashow.com
sourceUrl: https://github.com/michaelzeta/fabba-show
image: /imgs/fabba/home-02.png
keywords: Next.js, React, TypeScript, UX/UI Design, Sanity CMS, CSS Modules
featuredOrder: 02
---

## Executive Summary

Following the success of the initial FABBA Show web platform, I spearheaded a complete v2 overhaul to address the band's scaling marketing needs and to drastically improve the backend content management experience.

As the former bassist for the act, I worked closely with the show's Director to translate her exacting, highly specific brand vision into a performant digital reality. This overhaul focused on three primary pillars: engineering a bespoke UI that matched their real-world aesthetic, restructuring the event architecture to drive higher ticket sales, and streamlining a complex headless CMS into a foolproof, intuitive dashboard for a non-technical stakeholder.

## The Challenge: Empowering a Non-Technical Stakeholder

The most significant bottleneck of the v1 platform was the Content Editor Experience. The Director—while a brilliant creative force—is entirely non-technical. The standard CMS configuration proved too complex, causing friction when trying to push critical tour updates.

Furthermore, the client had precise visual requirements. The digital presence needed to perfectly mirror the high-energy aesthetic of their live performances, specifically requesting a custom blue and gold color scheme mapped directly to their iconic stage outfits, alongside modern expectations like full Light/Dark mode support.

## Engineering the Solution & Tech Upgrades

To solve these challenges, I executed a ground-up rebuild focusing on modern features and extreme backend simplicity.

### 1. Sanity v3 Upgrade & Editor Streamlining

I upgraded the backend architecture to Sanity v3, leveraging the new Studio customization features to strip away unnecessary technical bloat. I engineered a highly streamlined, custom-tailored editor interface designed specifically for the Director's workflow. This allowed her to easily update complex event data, upload media, and publish announcements without ever needing to touch code or navigate confusing schema structures.

![Sanity Dashboard for Rich Text Editing and Event Management](/imgs/fabba/sanity-01.png)

### 2. Custom Theming & UI Identity

To meet the client's exact branding requests, I developed a robust, custom design system. I implemented a dynamic theming engine that seamlessly toggles between a cohesive Light and Dark mode. In both modes, the UI utilizes a striking blue and gold color palette that perfectly matches the band's stage costumes, creating a deeply immersive, brand-aligned experience for fans.

```
/* app/globals.css */

:root {
  /* Base Light Theme */
  --light: hsl(180, 67%, 97%);
  --dark: hsl(241, 100%, 5%);
  --foreground: var(--dark);
  --background: var(--light);
}

/* System Preference Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --background: var(--dark);
    --foreground: var(--light);
  }
}

/* Manual Theme Overrides for User Selection */
[data-theme='light'] {
  --foreground: var(--dark);
  --background: var(--light);
}

[data-theme='dark'] {
  --foreground: var(--light);
  --background: var(--dark);
}

/* Custom Brand Gradients mapping to stage costumes */
.gold-gradient {
  background-image: linear-gradient(
    160deg,
    hsl(57deg 96% 53%) 0%,
    hsl(54deg 76% 54%) 57%,
    hsl(51deg 63% 54%) 100%
  );
}

.blue-gradient {
  background-image: linear-gradient(
    160deg,
    hsl(197deg 79% 30%) 0%,
    hsl(237deg 95% 14%) 60%,
    hsl(233deg 98% 21%) 100%
  );
}
```

### 3. Dynamic Event Routing & Editorial Architecture

The primary business goal of the platform is to drive event attendance. The v1 site utilized a simple, flat master list for upcoming shows. To optimize for conversions and SEO, I completely re-architected the routing system:

- **Standalone Event Pages:** Every single tour stop now generates its own dynamic, dedicated landing page.
- **Rich Editorial Features:** These event pages act as mini-blogs. Using Sanity's Portable Text, the client can now embed promotional videos, insert photo galleries, and write rich-text editorial content specific to that single venue, providing fans with all the hype and logistics they need to purchase tickets.

![Newly Designed Blue & Gold Theme](/imgs/fabba/home-01.png)

### 4. New "Announcements" Content Hub

Recognizing that the band needed a way to communicate outside of specific tour dates, I built out a brand-new "Posts" architecture. This provides a dedicated news feed for the band to share general announcements, behind-the-scenes videos, and photo dumps with their fanbase, keeping the audience engaged even during the off-season.

```
// app/events/[eventSlug]/page.tsx

import { getEvent, EventType } from '@/lib/sanityQueries'
import { PortableText } from '@portabletext/react'

export const revalidate = 60 // Revalidate page every 60s for fresh Sanity data

export default async function Page({ params: paramsPromise }: EventPageProps) {
  // Resolve route parameters to fetch the specific event slug
  const params = await paramsPromise
  const event: EventType = await getEvent(params.eventSlug)

  if (!event) {
    return (
      <div className='container'>
        <h1>Event Not Found</h1>
        <p>Sorry, we could not find the event you're looking for.</p>
      </div>
    )
  }

  // Helper function to dynamically cascade title priority (Name > Date > Venue)
  const { heading, subheading } = composeEventTitles(event)

  return (
    <article className={styles.eventPage}>
      <Header
        backgroundImage={event.thumbnail?.url}
        title={heading || 'To Be Announced'}
        subtitle={subheading || 'Check back soon for details'}
      >
        <div className={styles.eventButtons}>
           {/* Conditional rendering for ticketing and calendar integrations */}
          {event.getTickets && (
            <Button href={event.getTickets} disabled={event.soldOut}>
              {event.soldOut ? 'Sold Out!' : 'Get Tickets'}
            </Button>
          )}
        </div>
      </Header>

      <main className='container'>
        {/* Render Rich Editorial Content from Sanity CMS */}
        <div className={styles.eventDescription}>
            <PortableText value={event.description} />
        </div>
      </main>
    </article>
  )
}
```

## Business Impact & Reflections

This v2 overhaul successfully transformed the website from a simple digital flyer into a comprehensive, dynamic marketing engine.

- **Increased Conversion Opportunities:** By giving every event its own rich, shareable landing page, we drastically improved local SEO and gave promoters a direct, high-quality link to drive ticket sales.
- **Content Autonomy:** The heavily customized Sanity v3 Studio completely removed me as the technical bottleneck, empowering the Director to take full, independent control of the band's digital marketing and fan communications.
- **Brand Cohesion:** The custom blue and gold theming, paired with modern Light/Dark mode support, ensured the website matched the premium, theatrical quality of the actual stage show.

**Key Takeaways:**
This project reinforced that engineering a great product is only half the job; engineering a great _content editor experience_ is just as crucial. By empathizing with a non-technical client and building tools specifically around her workflow, I delivered a solution that she actually enjoys using to grow her business.
