
class TypingEffect {
    constructor(element, texts, options = {}) {
      this.element = element;
      this.texts = texts;
      this.typeSpeed = options.typeSpeed || 100;
      this.deleteSpeed = options.deleteSpeed || 50;
      this.delayBetweenTexts = options.delayBetweenTexts || 1500;
      this.loop = options.loop !== undefined ? options.loop : true;
      
      this.textIndex = 0;
      this.charIndex = 0;
      this.isDeleting = false;
      
      this.type();
    }
    
    type() {
      const currentText = this.texts[this.textIndex];
      
      if (this.isDeleting) {
        // Delete text
        this.element.textContent = currentText.substring(0, this.charIndex - 1);
        this.charIndex--;
        
        if (this.charIndex === 0) {
          this.isDeleting = false;
          this.textIndex = (this.textIndex + 1) % this.texts.length;
          
          if (this.textIndex === 0 && !this.loop) {
            return;
          }
          
          setTimeout(() => this.type(), this.delayBetweenTexts);
        } else {
          setTimeout(() => this.type(), this.deleteSpeed);
        }
      } else {
        // Type text
        this.element.textContent = currentText.substring(0, this.charIndex + 1);
        this.charIndex++;
        
        if (this.charIndex === currentText.length) {
          this.isDeleting = true;
          setTimeout(() => this.type(), this.delayBetweenTexts);
        } else {
          setTimeout(() => this.type(), this.typeSpeed);
        }
      }
    }
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('#typing-text');
    
    if (typingElement) {
      new TypingEffect(typingElement, [
        'Web Developer',
        'UI/UX Designer',
        'Problem Solver',
        'Creative Thinker'
      ], {
        typeSpeed: 100,
        deleteSpeed: 50,
        delayBetweenTexts: 2000
      });
    }
  });