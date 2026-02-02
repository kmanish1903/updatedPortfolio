
## Plan: Redesign Hero Section with "Create • Learn • Build" Theme

### Overview
Simplify and redesign the Hero section with a cleaner layout featuring your name prominently, the tagline "create • learn • build", and a clear call-to-action to connect. The 3D workspace stays on the right.

### New Hero Design

```text
┌─────────────────────────────────────────────────────────────────┐
│                          Hero Section                            │
│                                                                   │
│  ┌──────────────────────────┐   ┌─────────────────────────────┐ │
│  │                          │   │                             │ │
│  │  create • learn • build  │   │      3D Workspace           │ │
│  │                          │   │      (Interactive)          │ │
│  │      K. MANISH           │   │                             │ │
│  │                          │   │       ┌─────────┐           │ │
│  │   Final-year B.Tech CSE  │   │       │ Monitor │           │ │
│  │   MERN Stack Developer   │   │       └────┬────┘           │ │
│  │                          │   │    [Keyboard] [Mouse]       │ │
│  │   ─────────────────────  │   │    [Coffee]    [Plant]      │ │
│  │                          │   │         Desk                │ │
│  │   Let's build something  │   │                             │ │
│  │   amazing together       │   │                             │ │
│  │                          │   │                             │ │
│  │  [Connect With Me] 💬    │   │                             │ │
│  │  [Download Resume] 📄    │   │                             │ │
│  │                          │   │                             │ │
│  │  [GitHub] [LinkedIn]     │   │                             │ │
│  │                          │   │                             │ │
│  └──────────────────────────┘   └─────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Text Content Changes

| Element | Current | New |
|---------|---------|-----|
| Tagline | "Engineer. Developer. Continuous Learner." | **"create • learn • build"** |
| Greeting | "Hello, I'm 👋" | Remove or simplify |
| Name | "K. Manish" | "K. MANISH" (larger, bolder) |
| Sub-text | Typing effect only | Brief connection message |
| CTA | "Contact Me" | **"Connect With Me"** |

### Visual Enhancements

1. **"create • learn • build"** - Styled with:
   - Animated text with staggered fade-in
   - Dots styled as accent-colored bullets
   - Subtle glow effect on each word

2. **Name Display** - Enhanced with:
   - Larger font size
   - Gradient text effect
   - Subtle text shadow

3. **Connection Message** - New addition:
   - "Let's build something amazing together" or similar
   - Softer styling to invite engagement

4. **Layout Order** - Fixed for all screens:
   - Desktop: Text LEFT, 3D RIGHT
   - Mobile: Text on TOP, 3D below (not reversed)

### Implementation Steps

#### Step 1: Update Hero.tsx

**Key Changes:**
- Add "create • learn • build" tagline at the top
- Simplify greeting section
- Add connection invitation text
- Update button text to "Connect With Me"
- Fix mobile order (text always first)
- Keep typing effect for dynamic interest

### Mobile Responsiveness

- Text content stacks vertically on mobile
- 3D workspace shows below text (smaller height)
- All text remains readable and properly sized

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/portfolio/Hero.tsx` | Update content, layout order, new tagline |
| `src/index.css` | Add animation for "create • learn • build" (optional) |

### Expected Result
- Cleaner, more memorable first impression
- Clear "create • learn • build" philosophy
- Strong call-to-action to connect
- Professional yet personal feel
- 3D workspace on right as requested
