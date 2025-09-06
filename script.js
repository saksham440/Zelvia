// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize all components
    initializeHeader();
    initializeSearch();
    initializeChat();
    initializeScrollToTop();
    initializeAnimations();
    initializeNewsletter();
    initializeSmoothScrolling();
});

// Categories data for search functionality
const categories = [
    { name: "Men's Fashion", id: "mens-fashion", keywords: ["mens", "fashion", "clothing", "shirts", "jeans"] },
    { name: "Women's Fashion", id: "womens-fashion", keywords: ["womens", "fashion", "shopping", "dresses", "tops"] },
    { name: "Electronics & Gadgets", id: "electronics", keywords: ["electronics", "gadgets", "technology", "devices"] },
    { name: "Fashion & Accessories", id: "accessories", keywords: ["fashion", "accessories", "jewelry", "watches"] },
    { name: "Home & Kitchen Products", id: "home-kitchen", keywords: ["home", "kitchen", "appliances", "cookware"] },
    { name: "Beauty & Personal Care", id: "beauty", keywords: ["beauty", "cosmetics", "skincare", "wellness"] },
    { name: "Toys & Games", id: "toys", keywords: ["toys", "games", "colorful", "educational"] },
    { name: "Smartphones Latest", id: "smartphones", keywords: ["smartphones", "latest", "mobile", "phones"] },
    { name: "Smartwatch New Arrival", id: "smartwatches", keywords: ["smartwatches", "fitness", "trackers", "wearable"] },
    { name: "Grocery & Gourmet Foods", id: "grocery", keywords: ["grocery", "gourmet", "foods", "fresh"] },
    { name: "Jewelry", id: "jewelry", keywords: ["jewelry", "luxury", "accessories", "elegant"] },
    { name: "Books & e-Books", id: "books", keywords: ["books", "ebooks", "bestselling", "authors", "novels"] },
    { name: "Festive Items", id: "festive", keywords: ["festive", "christmas", "decorations", "holiday", "celebration"] }
];

// Header functionality
function initializeHeader() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    // Mobile menu toggle
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu
    if (mobileNavClose && mobileNav) {
        mobileNavClose.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Close mobile menu when clicking links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav && mobileNav.classList.contains('open') && 
            !mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Header scroll effect
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--background)';
                header.style.backdropFilter = 'none';
            }
        }
        
        lastScrollY = currentScrollY;
    });
}

// Search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    const searchResults = {
        'hero-search-results': document.getElementById('hero-search-results'),
        'mobile-search-results': document.getElementById('mobile-search-results')
    };

    searchInputs.forEach(input => {
        let timeout;
        
        input.addEventListener('input', (e) => {
            clearTimeout(timeout);
            const query = e.target.value.trim();
            
            timeout = setTimeout(() => {
                handleSearch(query, input);
            }, 300);
        });

        input.addEventListener('focus', (e) => {
            if (e.target.value.trim()) {
                handleSearch(e.target.value.trim(), input);
            }
        });
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        Object.values(searchResults).forEach(resultsContainer => {
            if (resultsContainer && !resultsContainer.contains(e.target) && 
                !e.target.classList.contains('search-input')) {
                resultsContainer.classList.remove('show');
            }
        });
    });

    function handleSearch(query, inputElement) {
        const resultsContainer = getSearchResultsContainer(inputElement);
        
        if (!resultsContainer) return;
        
        if (query.length === 0) {
            resultsContainer.classList.remove('show');
            return;
        }

        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(query.toLowerCase()) ||
            category.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
        );

        displaySearchResults(filtered, resultsContainer);
    }

    function getSearchResultsContainer(inputElement) {
        const container = inputElement.closest('.search-container');
        return container ? container.querySelector('.search-results') : null;
    }

    function displaySearchResults(results, container) {
        container.innerHTML = '';
        
        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'search-result-item';
            noResults.textContent = 'No categories found';
            noResults.style.color = 'var(--foreground-muted)';
            container.appendChild(noResults);
        } else {
            results.forEach(category => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.textContent = category.name;
                item.setAttribute('data-testid', `search-result-${category.id}`);
                
                item.addEventListener('click', () => {
                    scrollToCategory(category.id);
                    container.classList.remove('show');
                    
                    // Clear search input
                    const searchInput = container.closest('.search-container').querySelector('.search-input');
                    if (searchInput) searchInput.value = '';
                });
                
                container.appendChild(item);
            });
        }
        
        container.classList.add('show');
    }

    function scrollToCategory(categoryId) {
        const element = document.getElementById(categoryId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Chat functionality
function initializeChat() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWindow = document.querySelector('.chat-window');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    const chatBody = document.querySelector('.chat-body');
    const quickReplyBtns = document.querySelectorAll('.quick-reply-btn');
    
    let isAgentConnected = false;
    let messageId = 1;

    // Toggle chat window
    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('open');
            if (chatWindow.classList.contains('open')) {
                chatInput?.focus();
            }
        });
    }

    // Close chat window
    if (chatClose && chatWindow) {
        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('open');
        });
    }

    // Send message
    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', sendMessage);
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Quick reply buttons
    quickReplyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnText = e.currentTarget.textContent.trim();
            
            if (btnText === 'Premium Live Agent') {
                handleAgentConnection();
            } else {
                handleQuickReply(btnText);
            }
        });
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        addMessage(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        showTyping();
        
        // Simulate response
        setTimeout(() => {
            hideTyping();
            const responses = [
                'Thank you for reaching out. I understand your inquiry and I\'m processing the information to provide you with the most accurate assistance.',
                'I appreciate your message. Let me check our system to provide you with detailed information regarding your request.',
                'Thank you for contacting Zelvia Premium Support. I\'m reviewing your message and will provide comprehensive assistance shortly.'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, isAgentConnected ? 'agent' : 'bot');
        }, 2000);
    }

    function handleQuickReply(text) {
        addMessage(text, 'user');
        
        // Hide quick replies
        const quickReplies = document.querySelector('.quick-replies');
        if (quickReplies) {
            quickReplies.style.display = 'none';
        }
        
        showTyping();
        
        setTimeout(() => {
            hideTyping();
            let response = '';
            
            switch (text) {
                case 'Order Assistance':
                    response = 'I\'d be happy to help with your order. Please provide your order number, and I\'ll check the status, tracking information, or assist with any modifications you need.';
                    break;
                case 'Product Consultation':
                    response = 'Our product specialists are here to help. Which category interests you? I can provide detailed specifications, compatibility information, and personalized recommendations.';
                    break;
                case 'Exclusive Offers':
                    response = 'Welcome to our VIP offers! As a valued customer, you have access to exclusive deals up to 60% off across premium categories. Would you like me to show you today\'s featured offers?';
                    break;
                default:
                    response = 'Thank you for your inquiry. How can I assist you further?';
            }
            
            addMessage(response, 'bot');
        }, 2500);
    }

    function handleAgentConnection() {
        addMessage('I would like to speak with a live agent', 'user');
        
        // Hide quick replies
        const quickReplies = document.querySelector('.quick-replies');
        if (quickReplies) {
            quickReplies.style.display = 'none';
        }
        
        showTyping();
        
        setTimeout(() => {
            hideTyping();
            addMessage('I\'m connecting you with one of our premium support specialists. Please hold for just a moment...', 'bot');
            
            setTimeout(() => {
                isAgentConnected = true;
                updateChatHeader();
                addMessage('Hello! I\'m Sarah from Zelvia Premium Support. I have your chat history and I\'m here to provide personalized assistance. How can I help you today?', 'agent');
            }, 3000);
        }, 2000);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.setAttribute('data-testid', `message-${messageId++}`);

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        let senderName = '';
        if (sender === 'bot') senderName = 'Zelvia AI';
        else if (sender === 'agent') senderName = 'Sarah';

        let senderHtml = '';
        if (sender !== 'user') {
            senderHtml = `
                <div class="message-sender">
                    ${senderName}
                    ${sender === 'agent' ? '<span class="premium-badge">Premium Agent</span>' : ''}
                </div>
            `;
        }

        messageDiv.innerHTML = `
            ${senderHtml}
            <div class="message-content">${text}</div>
            <div class="message-time">
                ${currentTime}
                ${sender === 'user' ? '<i data-lucide="check-circle" class="message-status"></i>' : ''}
            </div>
        `;

        chatBody.appendChild(messageDiv);
        lucide.createIcons();
        scrollChatToBottom();
    }

    function showTyping() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'block';
            scrollChatToBottom();
        }
    }

    function hideTyping() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'none';
        }
    }

    function updateChatHeader() {
        const agentName = document.querySelector('.agent-name');
        const agentStatus = document.querySelector('.agent-status');
        
        if (agentName) {
            agentName.textContent = 'Sarah - Premium Support';
        }
        
        if (agentStatus) {
            agentStatus.innerHTML = '<div class="status-dot"></div>Live Agent Available';
        }
    }

    function scrollChatToBottom() {
        if (chatBody) {
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }
}

// Scroll to top functionality
function initializeScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.category-card, .trust-indicator, .review-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Counter animation for reviews
    const ratingElement = document.querySelector('[data-testid="text-overall-rating"]');
    if (ratingElement) {
        observer.observe(ratingElement);
    }
}

// Newsletter functionality
function initializeNewsletter() {
    const newsletterForm = document.querySelector('[data-testid="form-newsletter"]');
    const newsletterInput = document.querySelector('[data-testid="input-newsletter-email"]');
    const newsletterBtn = document.querySelector('[data-testid="button-newsletter-subscribe"]');

    if (!newsletterForm || !newsletterInput || !newsletterBtn) return;

    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = newsletterInput.value.trim();
        
        if (!email) {
            showNotification('Please enter your email address to subscribe.', 'error');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Disable button and show loading
        const originalText = newsletterBtn.textContent;
        newsletterBtn.disabled = true;
        newsletterBtn.innerHTML = '<span class="loading"></span> Subscribing...';

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            newsletterInput.value = '';
        } catch (error) {
            showNotification('There was an error subscribing you to our newsletter. Please try again.', 'error');
        } finally {
            newsletterBtn.disabled = false;
            newsletterBtn.textContent = originalText;
        }
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i data-lucide="x"></i>
            </button>
        </div>
    `;

    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 5rem;
            right: 1rem;
            background: white;
            border: 1px solid var(--border);
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            padding: 1rem;
            z-index: 1100;
            max-width: 20rem;
            animation: slideInRight 0.3s ease;
        }
        
        .notification-success {
            border-left: 4px solid hsl(142, 76%, 36%);
        }
        
        .notification-error {
            border-left: 4px solid hsl(0, 84%, 60%);
        }
        
        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
        }
        
        .notification-message {
            flex: 1;
            font-size: 0.875rem;
            line-height: 1.4;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 0.25rem;
            color: hsl(210, 25%, 45%);
            transition: var(--transition);
        }
        
        .notification-close:hover {
            background: hsl(210, 25%, 95%);
            color: var(--foreground);
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', 'true');
        document.head.appendChild(style);
    }

    // Add to DOM
    document.body.appendChild(notification);
    lucide.createIcons();

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Hero action buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    const shopNowBtn = document.querySelector('[data-testid="button-shop-now"]');
    const viewOffersBtn = document.querySelector('[data-testid="button-view-offers"]');
    
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', () => {
            const categoriesSection = document.getElementById('categories');
            if (categoriesSection) {
                categoriesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (viewOffersBtn) {
        viewOffersBtn.addEventListener('click', () => {
            // Highlight featured categories with offers
            const featuredCategories = ['smartphones', 'beauty', 'electronics'];
            featuredCategories.forEach(id => {
                const categoryCard = document.getElementById(id);
                if (categoryCard) {
                    categoryCard.style.transform = 'scale(1.02)';
                    categoryCard.style.boxShadow = '0 20px 25px rgba(59, 130, 246, 0.15)';
                    setTimeout(() => {
                        categoryCard.style.transform = '';
                        categoryCard.style.boxShadow = '';
                    }, 2000);
                }
            });
            
            const categoriesSection = document.getElementById('categories');
            if (categoriesSection) {
                categoriesSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            showNotification('Check out our featured offers highlighted below!', 'success');
        });
    }
});

// Performance optimization
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src || img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap';
    preloadLink.as = 'style';
    document.head.appendChild(preloadLink);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});