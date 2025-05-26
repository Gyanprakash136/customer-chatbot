// script.js
class CustomerSupportChatbot {
    constructor() {
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.chatMessages = document.getElementById('chatMessages');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.charCount = document.getElementById('charCount');

        this.init();
    }

    init() {
        // Event listeners
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        this.messageInput.addEventListener('input', () => {
            this.updateCharCount();
        });

        this.sendButton.addEventListener('click', () => {
            this.sendMessage();
        });

        // Initial setup
        this.updateCharCount();
        this.scrollToBottom();

        console.log('Customer Support Chatbot initialized');
    }

    updateCharCount() {
        const length = this.messageInput.value.length;
        this.charCount.textContent = `${length}/500`;

        if (length > 450) {
            this.charCount.style.color = '#dc3545';
        } else {
            this.charCount.style.color = '#6c757d';
        }
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();

        if (!message) {
            this.showNotification('Please enter a message', 'warning');
            return;
        }

        if (message.length > 500) {
            this.showNotification('Message too long. Please keep it under 500 characters.', 'error');
            return;
        }

        // Disable input while processing
        this.setInputState(false);

        // Add user message to chat
        this.addMessage(message, true);

        // Clear input
        this.messageInput.value = '';
        this.updateCharCount();

        // Show loading
        this.showLoading(true);

        try {
            // Send message to backend
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();

            if (data.success) {
                // Add bot response to chat
                this.addMessage(data.response, false, data.source);
            } else {
                throw new Error(data.error || 'Failed to get response');
            }

        } catch (error) {
            console.error('Error sending message:', error);
            this.addMessage('Sorry, I encountered an error. Please try again or contact our support team directly.', false);
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            this.showLoading(false);
            this.setInputState(true);
            this.messageInput.focus();
        }
    }

    addMessage(content, isUser = false, source = '') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        const messageText = document.createElement('p');
        messageText.textContent = content;

        const messageTime = document.createElement('span');
        messageTime.className = 'message-time';
        messageTime.textContent = this.getCurrentTime();

        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);

        // Add source indicator for bot messages
        if (!isUser && source) {
            const sourceSpan = document.createElement('span');
            sourceSpan.style.fontSize = '0.7rem';
            sourceSpan.style.opacity = '0.6';
            sourceSpan.textContent = ` (${source})`;
            messageTime.appendChild(sourceSpan);
        }

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    setInputState(enabled) {
        this.messageInput.disabled = !enabled;
        this.sendButton.disabled = !enabled;

        if (enabled) {
            this.messageInput.focus();
        }
    }

    showLoading(show) {
        this.loadingIndicator.style.display = show ? 'flex' : 'none';
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#007bff'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;

        // Add to page
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    clearChat() {
        // Keep only the initial bot message
        const messages = this.chatMessages.querySelectorAll('.message');
        for (let i = 1; i < messages.length; i++) {
            messages[i].remove();
        }

        this.showNotification('Chat cleared successfully', 'info');
    }
}

// Global functions for HTML onclick handlers
function sendQuickMessage(message) {
    const chatbot = window.customerChatbot;
    if (chatbot) {
        chatbot.messageInput.value = message;
        chatbot.sendMessage();
    }
}

function sendMessage() {
    const chatbot = window.customerChatbot;
    if (chatbot) {
        chatbot.sendMessage();
    }
}

function clearChat() {
    const chatbot = window.customerChatbot;
    if (chatbot) {
        if (confirm('Are you sure you want to clear the chat?')) {
            chatbot.clearChat();
        }
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.customerChatbot = new CustomerSupportChatbot();
    console.log('Customer Support Chatbot ready!');
});
