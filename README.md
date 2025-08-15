# 3D Shoe Shop Website

A modern, interactive 3D shoe shop website built with Next.js, React, and Three.js using React Three Fiber.

## Features

- 🎨 **3D Interactive Scene**: Floating 3D shoe models with animations
- 🌟 **Modern UI**: Glassmorphism design with backdrop blur effects
- 📱 **Responsive Design**: Works on all devices and screen sizes
- 🎭 **Interactive Elements**: Click on shoes to view details and 3D previews
- 🎪 **Animated Background**: Floating particles and dynamic lighting
- 🚀 **Performance Optimized**: Built with Next.js 14 and optimized rendering

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **TypeScript** - Type-safe development
- **CSS3** - Modern styling with glassmorphism effects

## Installation

1. **Navigate to the project directory:**
   ```bash
   cd shoeshop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
shoeshop/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── HeroSection.tsx     # Hero section with CTA buttons
│   │   ├── Scene3D.tsx         # Main 3D scene with floating shoes
│   │   └── ShoeGrid.tsx        # Product grid with modal
│   ├── globals.css             # Global styles and glassmorphism effects
│   ├── layout.tsx              # Root layout component
│   └── page.tsx                # Main page component
├── package.json                 # Dependencies and scripts
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## Key Components

### Scene3D.tsx
- **FloatingShoe**: 3D shoe models built with primitive geometries
- **FloatingText**: 3D text elements with animations
- **Interactive Controls**: Orbit controls for camera movement
- **Dynamic Lighting**: Multiple light sources for dramatic effects
- **Particle System**: Decorative floating particles

### ShoeGrid.tsx
- **Product Cards**: Interactive shoe product displays
- **Modal System**: Detailed product view with 3D preview option
- **Size Selection**: Available sizes for each shoe
- **Responsive Grid**: Adapts to different screen sizes

## Customization

### Adding New Shoes
Edit the `shoes` array in `ShoeGrid.tsx`:

```typescript
const shoes: Shoe[] = [
  {
    id: 7,
    name: "Your Shoe Name",
    price: 120,
    color: "Custom Color",
    size: ["7", "8", "9", "10"],
    image: "/path/to/image",
    description: "Your shoe description"
  }
]
```

### Modifying 3D Scene
Edit `Scene3D.tsx` to:
- Change shoe colors and positions
- Add new 3D elements
- Modify lighting and camera settings
- Adjust animation speeds

### Styling
Modify `globals.css` to:
- Change color schemes
- Adjust glassmorphism effects
- Modify animations and transitions
- Update responsive breakpoints

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Tips

- The 3D scene is dynamically imported to avoid SSR issues
- Suspense boundaries ensure smooth loading
- Optimized Three.js geometries for better performance
- Responsive design reduces unnecessary rendering

## Troubleshooting

### Common Issues

1. **3D Scene Not Loading**
   - Ensure all dependencies are installed
   - Check browser console for errors
   - Verify WebGL support in your browser

2. **Performance Issues**
   - Reduce particle count in Scene3D.tsx
   - Lower shadow map resolution
   - Disable auto-rotation if needed

3. **Build Errors**
   - Clear `.next` folder
   - Reinstall dependencies
   - Check TypeScript configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please check the troubleshooting section or create an issue in the repository.
