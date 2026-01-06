# Learning Guide

Technologies and concepts used in this website.

<div align="center">

**[View Live Demo](https://winter1165.github.io/Webpage-for-Messenger-Desktop-Client-Unofficial/)**

</div>

---

## CSS Techniques

### Custom Properties (Variables)
```css
:root {
    --primary: #0084ff;
    --easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```
Reusable values throughout the stylesheet.

### Glassmorphism
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(32px) saturate(180%);
```
Frosted glass effect for modern UI.

### Custom Scrollbar
```css
::-webkit-scrollbar { width: 14px; }
::-webkit-scrollbar-thumb { background: linear-gradient(...); }
```
Style the browser scrollbar.

### CSS Animations
```css
@keyframes float-icon {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-25px); }
}
```
Create smooth, looping animations.

### macOS Window Frame
```css
.preview-frame {
    background: rgba(30, 30, 40, 0.95);
    border-radius: 16px;
    box-shadow:
        0 25px 80px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.preview-dots .dot.red { background: #ff5f57; }
.preview-dots .dot.yellow { background: #ffbd2e; }
.preview-dots .dot.green { background: #28c840; }
```
Recreate macOS-style window controls.

### Shine Effect on Hover
```css
.preview-shine {
    position: absolute;
    left: -100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.8s ease;
}

.preview-frame:hover .preview-shine {
    left: 150%;
}
```
Sweeping light effect that activates on hover.

### Pulsing Glow Animation
```css
@keyframes preview-glow-pulse {
    0%, 100% {
        opacity: 0.6;
        transform: translate(-50%, -50%) scale(1);
    }
    50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.1);
    }
}
```
Breathing glow effect behind elements.

### Responsive Design
```css
@media (max-width: 768px) {
    .hero { padding: 140px 20px 100px; }
}
```
Adapt layout for different screen sizes.

---

## JavaScript Concepts

### Intersection Observer
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
});
```
Detect when elements enter the viewport.

### Request Animation Frame
```javascript
function animateCursor() {
    followerX += (mouseX - followerX) * 0.1;
    requestAnimationFrame(animateCursor);
}
```
Smooth animations synced with display refresh.

### 3D Tilt Effect
```javascript
card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${y * -10}deg)
    `;
});
```
Cards tilt based on mouse position.

### Reduced Motion Support
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    // Disable animations
}
```
Respect user accessibility preferences.

---

## Key Features Explained

| Feature | Tech Used |
|---------|-----------|
| Scroll animations | Intersection Observer API |
| Parallax effect | Scroll event + transform |
| 3D card tilt | Mouse position + CSS transform |
| Particle system | Dynamic DOM + CSS animations |
| Smooth scrolling | `scroll-behavior: smooth` |
| Custom cursor | Mouse events + RAF |
| Preview window | macOS-style frame + shine |
| Glow effects | Radial gradients + keyframes |

---

## Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [web.dev](https://web.dev/)
