document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const sidebar = document.querySelector('.sidebar');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-btn');
    const messagesWrapper = document.querySelector('.messages-wrapper');
    const emojiButton = document.querySelector('.emoji-btn');
    const attachButton = document.querySelector('.attach-btn');

    // Sidebar Toggle Functionality
    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Send Message Functionality
    function sendMessage(message) {
        if (!message.trim()) return;

        const currentTime = new Date();
        const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const messageHTML = `
            <div class="message sent">
                <div class="message-content">
                    <p>${message}</p>
                    <span class="time">${timeString}</span>
                </div>
            </div>
        `;

        messagesWrapper.insertAdjacentHTML('beforeend', messageHTML);
        chatInput.value = '';
        scrollToBottom();
    }

    // Send message on button click
    sendButton.addEventListener('click', () => {
        sendMessage(chatInput.value);
    });

    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(chatInput.value);
        }
    });

    // Scroll chat to bottom
    function scrollToBottom() {
        messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    }

    // Initial scroll to bottom
    scrollToBottom();

    // Auto-resize input field
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Attach button functionality
    attachButton.addEventListener('click', () => {
        // Create and trigger file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*,.pdf,.doc,.docx';
        fileInput.multiple = true;
        
        fileInput.addEventListener('change', handleFileSelect);
        fileInput.click();
    });

    // Handle file selection
    function handleFileSelect(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            // Here you would typically upload the file to a server
            // For now, we'll just show a message that a file was attached
            const fileName = file.name;
            const fileSize = (file.size / 1024).toFixed(2) + ' KB';
            
            const messageHTML = `
                <div class="message sent">
                    <div class="message-content">
                        <p><i class="fas fa-paperclip"></i> Attached: ${fileName} (${fileSize})</p>
                        <span class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>
            `;
            
            messagesWrapper.insertAdjacentHTML('beforeend', messageHTML);
            scrollToBottom();
        });
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('active');
            }
        }, 250);
    });

    // Add active class to current nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Prevent default on emoji button (placeholder for emoji picker)
    emojiButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Here you would typically initialize an emoji picker
        alert('Emoji picker functionality would be implemented here');
    });

    // Optional: Add typing indicator
    let typingTimer;
    chatInput.addEventListener('input', () => {
        clearTimeout(typingTimer);
        // Here you would typically emit a "typing" event to the server
        typingTimer = setTimeout(() => {
            // Here you would typically emit a "stopped typing" event
        }, 1000);
    });
});