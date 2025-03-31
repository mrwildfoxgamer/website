// Fixed particles.js with mouse interaction
class ParticleBackground {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 50;
    this.mouse = {
      x: undefined,
      y: undefined,
      radius: 150 // Interaction radius
    };
    
    this.init();
    this.animate();
  }
  
  init() {
    // Create and style canvas
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.opacity = '0.7';
    document.body.appendChild(this.canvas);
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.createParticles();
    });
    
    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
    
    // Reset mouse position when mouse leaves
    window.addEventListener('mouseout', () => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    });
    
    this.createParticles();
  }
  
  createParticles() {
    this.particles = [];
    
    for (let i = 0; i < this.particleCount; i++) {
      const size = Math.random() * 3 + 1;
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: size,
        baseRadius: size, // Store original size for restoration
        color: '#3498db',
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        baseSpeedX: Math.random() * 1 - 0.5, // Store original speed
        baseSpeedY: Math.random() * 1 - 0.5  // Store original speed
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      // Check if mouse is near this particle
      if (this.mouse.x && this.mouse.y) {
        const dx = particle.x - this.mouse.x;
        const dy = particle.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          // Calculate force based on distance (closer = stronger)
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          
          // Apply force to push particles away from mouse
          const directionX = dx / distance || 0;
          const directionY = dy / distance || 0;
          
          // Increase speed based on force (with limits to prevent excessive speeds)
          const maxSpeed = 3;
          particle.speedX = Math.max(-maxSpeed, Math.min(maxSpeed, particle.baseSpeedX + directionX * force * 2));
          particle.speedY = Math.max(-maxSpeed, Math.min(maxSpeed, particle.baseSpeedY + directionY * force * 2));
          
          // Increase size based on force
          particle.radius = particle.baseRadius + force * 2;
        } else {
          // If not near mouse, gradually return to original state
          particle.speedX = particle.speedX * 0.95 + particle.baseSpeedX * 0.05;
          particle.speedY = particle.speedY * 0.95 + particle.baseSpeedY * 0.05;
          particle.radius = particle.radius * 0.95 + particle.baseRadius * 0.05;
        }
      } else {
        // If mouse isn't on screen, gradually return to original state
        particle.speedX = particle.speedX * 0.98 + particle.baseSpeedX * 0.02;
        particle.speedY = particle.speedY * 0.98 + particle.baseSpeedY * 0.02;
        particle.radius = particle.radius * 0.98 + particle.baseRadius * 0.02;
      }
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();
      
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Improved boundary check - wrap around instead of bounce
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Draw connections to other particles
      this.particles.forEach(otherParticle => {
        if (particle === otherParticle) return; // Skip self
        
        const distance = Math.sqrt(
          Math.pow(particle.x - otherParticle.x, 2) + 
          Math.pow(particle.y - otherParticle.y, 2)
        );
        
        if (distance < 150) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(52, 152, 219, ${1 - distance / 150})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.stroke();
        }
      });

      // Draw connection to mouse
      if (this.mouse.x && this.mouse.y) {
        const mouseDistance = Math.sqrt(
          Math.pow(particle.x - this.mouse.x, 2) + 
          Math.pow(particle.y - this.mouse.y, 2)
        );
        
        if (mouseDistance < this.mouse.radius) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(52, 152, 219, ${1 - mouseDistance / this.mouse.radius})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.stroke();
        }
      }
    });
    
    requestAnimationFrame(this.animate.bind(this));
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new ParticleBackground();
});