

## Plan: Add 3D Developer Workspace to Portfolio

### Overview
Add an interactive 3D computer desk/workspace scene to your Hero section using **React Three Fiber**. This will create a stunning first impression for recruiters, showcasing your skills with modern web technologies.

### Design Concept

```text
┌─────────────────────────────────────────────────────────┐
│                      Hero Section                        │
│  ┌─────────────────┐     ┌─────────────────────────┐    │
│  │   Your Info     │     │    3D Workspace         │    │
│  │   Name, Title   │     │    ┌─────────────┐      │    │
│  │   Buttons       │     │    │  Monitor    │      │    │
│  │   Social Links  │     │    │  (glowing)  │      │    │
│  │                 │     │    └─────┬───────┘      │    │
│  │                 │     │    [Keyboard] [Mouse]   │    │
│  │                 │     │    [Coffee Cup] [Plant] │    │
│  │                 │     │         Desk            │    │
│  └─────────────────┘     └─────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### 3D Scene Elements (Built with Primitives)
Since loading external 3D models can be slow, I'll create a stylized workspace using simple geometric shapes:

1. **Monitor** - Rounded box with glowing screen effect
2. **Monitor Stand** - Cylinder 
3. **Desk Surface** - Flat box with rounded edges
4. **Keyboard** - Thin box with key-like patterns
5. **Mouse** - Small rounded box
6. **Coffee Mug** - Cylinder with handle
7. **Small Plant** - Simple geometric pot with sphere leaves
8. **Floating Code Symbols** - `</>`, `{}` rotating around

### Interactive Features
- **Auto-rotation** - Scene slowly rotates for visual interest
- **Mouse interaction** - Scene tilts slightly based on mouse position
- **Glowing elements** - Monitor screen and accent lights pulse with your primary color
- **Floating particles** - Small code-related particles float around

### Technical Implementation

#### Step 1: Install Dependencies
```bash
npm install @react-three/fiber@^8.18 @react-three/drei@^9.122.0 three@^0.169.0
```

#### Step 2: Create 3D Components

**New Files:**
- `src/components/3d/DeveloperWorkspace.tsx` - Main 3D scene component
- `src/components/3d/Monitor.tsx` - 3D monitor with glowing screen
- `src/components/3d/Desk.tsx` - Desk surface
- `src/components/3d/Accessories.tsx` - Keyboard, mouse, coffee cup, plant

#### Step 3: Update Hero Section
- Change layout to split view (text left, 3D scene right)
- On mobile: 3D scene shows smaller above or below text
- Add loading fallback while 3D scene loads

### Component Structure

```tsx
// DeveloperWorkspace.tsx
<Canvas>
  <ambientLight />
  <directionalLight />
  <OrbitControls autoRotate />
  
  <group position={[0, 0, 0]}>
    <Monitor />           {/* Glowing screen */}
    <Desk />              {/* Desk surface */}
    <Keyboard />          {/* On desk */}
    <Mouse />             {/* On desk */}
    <CoffeeMug />         {/* Desk accessory */}
    <Plant />             {/* Small desk plant */}
    <FloatingCode />      {/* Rotating code symbols */}
  </group>
  
  <Environment preset="city" />
</Canvas>
```

### Visual Style
- **Color scheme**: Matches your portfolio (primary blue/purple gradient)
- **Lighting**: Soft ambient + directional for depth
- **Materials**: 
  - Desk: Dark wood-like material
  - Monitor: Metallic frame with emissive screen
  - Accessories: Subtle colors that complement the theme

### Mobile Optimization
- Reduced polygon count on mobile
- Smaller canvas size
- Disable auto-rotate on low-power devices
- Show a static fallback image if WebGL is not supported

### Files to Create/Modify:

| File | Action |
|------|--------|
| `src/components/3d/DeveloperWorkspace.tsx` | Create - Main 3D scene |
| `src/components/3d/WorkspaceElements.tsx` | Create - All 3D objects |
| `src/components/portfolio/Hero.tsx` | Modify - Add 3D scene |
| `package.json` | Modify - Add dependencies |

### Expected Result
- Eye-catching 3D workspace that slowly rotates
- Professional look that impresses recruiters
- Smooth performance with optimized primitives
- Responsive design that works on all devices

