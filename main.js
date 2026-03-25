// ===== GLOBAL VARIABLES =====
let isLoaded = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
isLoaded = true;
initializePortfolio();
});

// ===== INITIALIZE ALL FUNCTIONALITY =====
function initializePortfolio() {
setupRainbowCursor();
setupSmoothScroll();
setupScrollReveal();
setupStatsAnimation();
setupInteractiveElements();
setupMobileMenu();
setupButtonRipples();
setupTheme();
setupChatbot();
addLoadingAnimations();
}

// ===== RAINBOW CURSOR EFFECT =====
function setupRainbowCursor() {
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

// Track mouse movement
document.addEventListener('mousemove', (e) => {
mouseX = e.clientX;
mouseY = e.clientY;
});

// Smooth animation loop
function animateCursor() {
currentX += (mouseX - currentX) * 0.1;
currentY += (mouseY - currentY) * 0.1;

document.body.style.setProperty('--mx', currentX + 'px');
document.body.style.setProperty('--my', currentY + 'px');

requestAnimationFrame(animateCursor);
}

// Start animation
animateCursor();

// Hide cursor effect on mobile/touch devices
if ('ontouchstart' in window) {
document.body.style.setProperty('--mx', '50%');
document.body.style.setProperty('--my', '50%');
}
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScroll() {
// Handle navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
const offsetTop = target.offsetTop - 80; // Account for fixed nav
window.scrollTo({
top: offsetTop,
behavior: 'smooth'
});
}
});
});

// Home button functionality
const homeBtn = document.getElementById('homeBtn');
if (homeBtn) {
homeBtn.addEventListener('click', () => {
window.scrollTo({
top: 0,
behavior: 'smooth'
});
});
}
}

// ===== SCROLL REVEAL ANIMATIONS =====
function setupScrollReveal() {
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('revealed');

// Staggered animation for child elements
const children = entry.target.querySelectorAll('.edu-item, .cert-item, .skill-card, .project-card, .timeline-item');
children.forEach((child, index) => {
setTimeout(() => {
child.style.opacity = '1';
child.style.transform = 'translateY(0)';
}, index * 100);
});
}
});
}, observerOptions);

// Observe all scroll-reveal elements
document.querySelectorAll('.scroll-reveal').forEach(element => {
observer.observe(element);
});
}

// ===== STATISTICS ANIMATION =====
function setupStatsAnimation() {
const statsObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
animateStats();
statsObserver.unobserve(entry.target);
}
});
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
statsObserver.observe(statsSection);
}
}

function animateStats() {
const statNumbers = document.querySelectorAll('.stat-number');

statNumbers.forEach((element, index) => {
setTimeout(() => {
const target = parseFloat(element.dataset.count);
animateNumber(element, target);
}, index * 200);
});
}

function animateNumber(element, target) {
let start = 0;
const duration = 2000; // 2 seconds
const increment = target / (duration / 16);
const isPercentage = target % 1 !== 0;

function updateNumber() {
start += increment;
if (start < target) {
element.textContent = isPercentage ?
start.toFixed(1) + '%' :
Math.floor(start);
requestAnimationFrame(updateNumber);
} else {
element.textContent = isPercentage ?
target.toFixed(1) + '%' :
target;
}
}

updateNumber();
}

// ===== THEME SWITCHER =====
function setupTheme() {
// Create theme toggle button
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = `
<svg viewBox="0 0 24 24" class="theme-icon">
<path d="M12 2a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 17a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zm8-8a1 1 0 0 1 1 1 1 1 0 1 1-2 0 1 1 0 0 1 1-1zm-17 0a1 1 0 0 1 1 1 1 1 0 1 1-2 0 1 1 0 0 1 1-1zm14.95 8.95a1 1 0 0 1 1.41 1.41 1 1 0 1 1-1.41-1.41zM3.64 14.64a1 1 0 0 1 1.41-1.41 1 1 0 1 1-1.41 1.41zM20.36 3.64a1 1 0 0 1 1.41 1.41A1 1 0 1 1 20.36 3.64zm-16.72 16.72a1 1 0 1 1 1.41 1.41 1 1 0 1 1-1.41-1.41zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"/>
</svg>
`;
document.body.appendChild(themeToggle);

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Toggle theme
themeToggle.addEventListener('click', () => {
const currentTheme = document.documentElement.getAttribute('data-theme');
const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

document.documentElement.setAttribute('data-theme', newTheme);
localStorage.setItem('theme', newTheme);
updateThemeIcon(newTheme);
});
}

function updateThemeIcon(theme) {
const themeToggle = document.querySelector('.theme-toggle');
if (theme === 'dark') {
themeToggle.innerHTML = `
<svg viewBox="0 0 24 24">
<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
</svg>
`;
} else {
themeToggle.innerHTML = `
<svg viewBox="0 0 24 24">
<circle cx="12" cy="12" r="5"/>
<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
</svg>
`;
}
}

// ===== CHATBOT FUNCTIONALITY =====
function setupChatbot() {
// Create chatbot elements
const chatbotToggle = document.createElement('button');
chatbotToggle.className = 'chatbot-toggle';
chatbotToggle.innerHTML = `
<svg viewBox="0 0 24 24">
<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.5 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
</svg>
`;

const chatbotWidget = document.createElement('div');
chatbotWidget.className = 'chatbot-widget';
chatbotWidget.innerHTML = `
<div class="chatbot-header">
<div class="chatbot-title">🤖 AI Assistant</div>
<button class="chatbot-close">✕</button>
</div>
<div class="chatbot-messages" id="chatbot-messages">
<div class="chatbot-message bot">
<div class="message-avatar bot">AI</div>
<div class="message-bubble">Hi! I'm Sravanthi's AI assistant. Ask me anything about her projects, skills, or experience!</div>
</div>
</div>
<div class="chatbot-input-container">
<input type="text" class="chatbot-input" placeholder="Type your message..." maxlength="500">
<button class="chatbot-send" disabled>Send</button>
</div>
`;

document.body.appendChild(chatbotToggle);
document.body.appendChild(chatbotWidget);

// Chatbot functionality
const messagesContainer = chatbotWidget.querySelector('.chatbot-messages');
const input = chatbotWidget.querySelector('.chatbot-input');
const sendBtn = chatbotWidget.querySelector('.chatbot-send');
const closeBtn = chatbotWidget.querySelector('.chatbot-close');

// Toggle chatbot
chatbotToggle.addEventListener('click', () => {
chatbotWidget.classList.toggle('active');
});

// Close chatbot
closeBtn.addEventListener('click', () => {
chatbotWidget.classList.remove('active');
});

// Enable/disable send button
input.addEventListener('input', () => {
sendBtn.disabled = input.value.trim() === '';
});

// Send message
sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keypress', (e) => {
if (e.key === 'Enter' && !sendBtn.disabled) {
sendMessage();
}
});

function sendMessage() {
const message = input.value.trim();
if (!message) return;

// Add user message
addMessage(message, 'user');
input.value = '';
sendBtn.disabled = true;

// Show typing indicator
showTyping();

// Generate bot response
setTimeout(() => {
hideTyping();
const response = generateResponse(message);
addMessage(response, 'bot');
}, 1000 + Math.random() * 1000);
}

function addMessage(content, sender) {
const messageDiv = document.createElement('div');
messageDiv.className = `chatbot-message ${sender}`;
messageDiv.innerHTML = `
<div class="message-avatar ${sender}">${sender === 'user' ? 'You' : 'AI'}</div>
<div class="message-bubble">${content}</div>
`;
messagesContainer.appendChild(messageDiv);
messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTyping() {
const typingDiv = document.createElement('div');
typingDiv.className = 'chatbot-message bot typing';
typingDiv.innerHTML = `
<div class="message-avatar bot">AI</div>
<div class="message-bubble">
<div class="typing-indicator">
<span></span>
<span></span>
<span></span>
</div>
</div>
`;
messagesContainer.appendChild(typingDiv);
messagesContainer.scrollTop = messagesContainer.scrollHeight;

// Add typing indicator styles
if (!document.querySelector('#typing-styles')) {
const style = document.createElement('style');
style.id = 'typing-styles';
style.textContent = `
.typing-indicator {
display: flex;
gap: 4px;
}
.typing-indicator span {
width: 8px;
height: 8px;
border-radius: 50%;
background: var(--text-light);
animation: typing 1.4s infinite;
}
.typing-indicator span:nth-child(2) {
animation-delay: 0.2s;
}
.typing-indicator span:nth-child(3) {
animation-delay: 0.4s;
}
@keyframes typing {
0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
30% { transform: translateY(-10px); opacity: 1; }
}
`;
document.head.appendChild(style);
}
}

function hideTyping() {
const typing = messagesContainer.querySelector('.typing');
if (typing) {
typing.remove();
}
}

function generateResponse(userMessage) {
const message = userMessage.toLowerCase();

// Project-related questions
if (message.includes('project') || message.includes('work') || message.includes('domain registry')) {
return "Sravanthi's featured project is the <strong>Domain Registry Platform</strong>, which won a National Award! It achieved 99.5% uptime and 35% throughput improvement. She also built a Multi-Agent Document Processing system with 50% overhead reduction and an Advanced RAG Chatbot with 85%+ relevance scores.";
}

// Skills and technologies
if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
return "Sravanthi specializes in <strong>Generative AI & LLMs</strong>, including RAG pipelines and Agentic AI. Her tech stack includes LangChain, LangGraph, FastAPI, Spring Boot, PyTorch, Docker, Kubernetes, and cloud platforms like AWS and OpenShift.";
}

// Experience
if (message.includes('experience') || message.includes('job') || message.includes('career')) {
return "Sravanthi is currently an <strong>Associate Systems Engineer</strong> (Nov 2024–Present) architecting production-grade GenAI solutions. Previously, she was an ML Engineering Intern developing the award-winning Domain Registry platform, and a Python Developer freelancer.";
}

// Education
if (message.includes('education') || message.includes('degree') || message.includes('college')) {
return "Sravanthi holds a <strong>Bachelor's in Computer Science (Data Science)</strong> from Dadi Institute of Engineering & Technology (2020–2024) with a CGPA of 8.0. She also has strong academic performance in her secondary education.";
}

// Certifications
if (message.includes('certification') || message.includes('certified') || message.includes('certificate')) {
return "Sravanthi holds several certifications including <strong>Nutanix Certified Professional</strong>, <strong>Oracle APEX Cloud Developer</strong>, <strong>Microsoft Azure Data Scientist Associate</strong>, and <strong>AWS Academy Cloud Foundations</strong>.";
}

// Contact/Connect
if (message.includes('contact') || message.includes('connect') || message.includes('email') || message.includes('reach')) {
return "You can reach Sravanthi via the <strong>Contact section</strong> above, or connect with her on GitHub, Kaggle, and LinkedIn. She'd love to discuss AI, ML engineering, and innovative projects!";
}

// AI/ML specific
if (message.includes('ai') || message.includes('machine learning') || message.includes('ml') || message.includes('llm')) {
return "Sravanthi has extensive experience in <strong>Generative AI</strong> and <strong>MLOps</strong>. She's implemented RAG pipelines reducing hallucination by 45%, created Agentic AI systems, and deployed scalable ML solutions with 99.5% uptime.";
}

// General greeting
if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
return "Hello! 👋 I'm here to help you learn about Sravanthi Gudla's work. You can ask about her projects, skills, experience, or how to connect with her!";
}

// Thank you
if (message.includes('thank') || message.includes('thanks')) {
return "You're welcome! 😊 Is there anything else you'd like to know about Sravanthi's work or experience?";
}

// Default response
return "That's an interesting question! 🤔 I can tell you about Sravanthi's <strong>projects</strong>, <strong>skills</strong>, <strong>experience</strong>, <strong>education</strong>, or help you <strong>connect</strong> with her. What would you like to know?";
}
}

// ===== INTERACTIVE ELEMENTS =====
function setupInteractiveElements() {
// Skill tag interactions
document.querySelectorAll('.skill-tag').forEach(tag => {
tag.addEventListener('mouseenter', function() {
this.style.transform = 'scale(1.1) rotate(5deg)';
});

tag.addEventListener('mouseleave', function() {
this.style.transform = 'scale(1) rotate(0deg)';
});
});

// Project card tilt effect
document.querySelectorAll('.project-card').forEach(card => {
card.addEventListener('mousemove', function(e) {
const rect = this.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;
const centerX = rect.width / 2;
const centerY = rect.height / 2;
const rotateX = (y - centerY) / 10;
const rotateY = (centerX - x) / 10;

this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
});

card.addEventListener('mouseleave', function() {
this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
});
});

// Nav link hover effects
document.querySelectorAll('.nav-links a').forEach(link => {
link.addEventListener('mouseenter', function() {
this.style.transform = 'translateY(-2px)';
});

link.addEventListener('mouseleave', function() {
this.style.transform = 'translateY(0)';
});
});
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
const nav = document.querySelector('nav');
const navLinks = document.querySelector('.nav-links');

// Create mobile menu button for smaller screens
if (window.innerWidth <= 768) {
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.innerHTML = '☰';
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.style.cssText = `
background: none;
border: none;
font-size: 1.5rem;
color: var(--primary);
cursor: pointer;
display: block;
`;

nav.appendChild(mobileMenuBtn);

mobileMenuBtn.addEventListener('click', () => {
navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});
}
}

// ===== BUTTON RIPPLES =====
function setupButtonRipples() {
document.querySelectorAll('.cta-button, .download-btn, .contact-link').forEach(button => {
button.addEventListener('click', function(e) {
const ripple = document.createElement('span');
const rect = this.getBoundingClientRect();
const size = Math.max(rect.width, rect.height);
const x = e.clientX - rect.left - size / 2;
const y = e.clientY - rect.top - size / 2;

ripple.style.cssText = `
position: absolute;
width: ${size}px;
height: ${size}px;
left: ${x}px;
top: ${y}px;
background: rgba(255, 255, 255, 0.3);
border-radius: 50%;
transform: scale(0);
animation: ripple 0.6s ease-out;
pointer-events: none;
`;

this.style.position = 'relative';
this.style.overflow = 'hidden';
this.appendChild(ripple);

setTimeout(() => {
ripple.remove();
}, 600);
});
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
@keyframes ripple {
to {
transform: scale(2);
opacity: 0;
}
}
`;
document.head.appendChild(style);
}

// ===== LOADING ANIMATIONS =====
function addLoadingAnimations() {
// Add fade-in animation to body
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in-out';

setTimeout(() => {
document.body.style.opacity = '1';
}, 100);

// Add stagger animations to elements
const elements = document.querySelectorAll('.edu-item, .cert-item, .skill-card');
elements.forEach((element, index) => {
element.style.opacity = '0';
element.style.transform = 'translateY(20px)';
element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

setTimeout(() => {
element.style.opacity = '1';
element.style.transform = 'translateY(0)';
}, index * 100 + 500);
});
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
let timeout;
return function executedFunction(...args) {
const later = () => {
clearTimeout(timeout);
func(...args);
};
clearTimeout(timeout);
timeout = setTimeout(later, wait);
};
}

// Throttle function for resize events
function throttle(func, limit) {
let inThrottle;
return function() {
const args = arguments;
const context = this;
if (!inThrottle) {
func.apply(context, args);
inThrottle = true;
setTimeout(() => inThrottle = false, limit);
}
}
}

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', throttle(() => {
// Handle responsive behavior
if (window.innerWidth > 768) {
const navLinks = document.querySelector('.nav-links');
if (navLinks) {
navLinks.style.display = 'flex';
}
}
}, 250));

// ===== PAGE VISIBILITY API =====
document.addEventListener('visibilitychange', () => {
if (document.hidden) {
// Page is hidden, pause animations
document.body.style.animationPlayState = 'paused';
} else {
// Page is visible, resume animations
document.body.style.animationPlayState = 'running';
}
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
function setupAccessibility() {
// Add keyboard navigation support
document.querySelectorAll('.skill-tag, .tech, .social-icon').forEach(element => {
element.setAttribute('tabindex', '0');

element.addEventListener('keydown', (e) => {
if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
element.click();
}
});
});

// Add ARIA labels
document.querySelectorAll('.stat-card').forEach((card, index) => {
const number = card.querySelector('.stat-number')?.textContent || '0';
const label = card.querySelector('.stat-label')?.textContent || 'Statistic';
card.setAttribute('aria-label', `${number} ${label}`);
});
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', setupAccessibility);

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
module.exports = {
setupRainbowCursor,
setupSmoothScroll,
setupScrollReveal,
animateStats,
animateNumber
};
}

// ===== EDUCATION CARDS ENHANCEMENTS =====
function setupEducationCards() {
const eduCards = document.querySelectorAll('.edu-card');

eduCards.forEach((card, index) => {
// Add entrance animation with stagger
card.style.animationDelay = `${index * 0.1}s`;

// Enhanced hover effects
card.addEventListener('mouseenter', function() {
this.style.transform = 'translateY(-10px) scale(1.03)';

// Add glowing border effect
this.style.boxShadow = '0 25px 50px rgba(6, 182, 212, 0.3)';
});

card.addEventListener('mouseleave', function() {
this.style.transform = 'translateY(0) scale(1)';
this.style.boxShadow = '';
});

// Click animation
card.addEventListener('click', function() {
this.style.transform = 'translateY(-5px) scale(1.05)';
setTimeout(() => {
this.style.transform = 'translateY(-10px) scale(1.03)';
}, 150);
});

// Keyboard navigation
card.addEventListener('keydown', function(e) {
if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
this.click();
}
});

// Progress bar animation on scroll into view
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('card-revealed');
}
});
}, { threshold: 0.5 });

observer.observe(card);
});
}

// Initialize education cards when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
setupEducationCards();
});

// ===== CERTIFICATION SECTION ENHANCEMENTS =====
function setupCertificationCards() {
const certCards = document.querySelectorAll('.cert-card');

certCards.forEach((card, index) => {
// Add entrance animation with stagger
card.style.animationDelay = `${index * 0.1}s`;

// Enhanced hover effects
card.addEventListener('mouseenter', function() {
this.style.transform = 'translateY(-12px) scale(1.04)';

// Animate the icon
const icon = this.querySelector('.cert-icon');
if (icon) {
icon.style.transform = 'scale(1.15) rotate(10deg)';
}

// Add glow effect
this.style.boxShadow = '0 30px 60px rgba(6, 182, 212, 0.4)';
});

card.addEventListener('mouseleave', function() {
this.style.transform = 'translateY(0) scale(1)';
this.style.boxShadow = '';

// Reset icon
const icon = this.querySelector('.cert-icon');
if (icon) {
icon.style.transform = 'scale(1) rotate(0deg)';
}
});

// Click animation
card.addEventListener('click', function() {
this.style.transform = 'translateY(-8px) scale(1.06)';
setTimeout(() => {
this.style.transform = 'translateY(-12px) scale(1.04)';
}, 150);
});

// Keyboard navigation
card.addEventListener('keydown', function(e) {
if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
this.click();
}
});

// Progress indicator animation
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('card-revealed');

// Animate the status indicator
const statusIndicator = entry.target.querySelector('.status-indicator');
if (statusIndicator) {
statusIndicator.style.animation = 'pulse 2s ease-in-out infinite';
}
}
});
}, { threshold: 0.3 });

observer.observe(card);
});
}

// Animate certification stats
function animateCertStats() {
const statNumbers = document.querySelectorAll('.cert-stat-number');

statNumbers.forEach((element, index) => {
setTimeout(() => {
const text = element.textContent;
if (text.includes('+')) {
const number = parseInt(text);
animateNumber(element, number, '+');
} else if (text.includes('%')) {
const number = parseFloat(text);
animateNumber(element, number, '%');
} else {
const number = parseInt(text);
animateNumber(element, number);
}
}, index * 200);
});
}

function animateNumber(element, target, suffix = '') {
let start = 0;
const duration = 2000;
const increment = target / (duration / 16);

function updateNumber() {
start += increment;
if (start < target) {
element.textContent = Math.floor(start) + suffix;
requestAnimationFrame(updateNumber);
} else {
element.textContent = target + suffix;
}
}

updateNumber();
}

// Initialize certification features
document.addEventListener('DOMContentLoaded', () => {
setupCertificationCards();

// Animate stats when certifications section is visible
const certObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
animateCertStats();
certObserver.unobserve(entry.target);
}
});
}, { threshold: 0.5 });

const certSection = document.querySelector('#certifications');
if (certSection) {
certObserver.observe(certSection);
}
});

// Enhanced contact section interactions
document.addEventListener('DOMContentLoaded', function() {
    const contactContent = document.querySelector('#contact .contact-content');
    
    if (contactContent) {
        // Intersection observer for scroll reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.2
        });
        
        observer.observe(contactContent);
    }

    // Add hover effects for contact card
    const contactCard = document.querySelector('.contact-card');
    if (contactCard) {
        contactCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        contactCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Social icon interactions
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
});
