// Global variables
const API_BASE_URL = 'http://localhost:3000/api';
let currentUser = null;

// DOM elements
const notificationContainer = document.createElement('div');
notificationContainer.className = 'fixed top-4 right-4 z-50 space-y-2';
document.body.appendChild(notificationContainer);

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        info: 'bg-blue-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500'
    };
    
    notification.className = `px-4 py-2 rounded-md text-white ${colors[type] || colors.info} shadow-lg`;
    notification.textContent = message;
    
    notificationContainer.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function updateUIForLoggedInUser() {
    // Update balance display on all pages
    const balanceElements = document.querySelectorAll('.user-balance');
    balanceElements.forEach(el => {
        if (currentUser) {
            el.textContent = currentUser.balance;
        } else {
            el.textContent = '0';
        }
    });
    
    // Show/hide auth-related elements
    const authElements = document.querySelectorAll('[data-auth]');
    authElements.forEach(el => {
        if (currentUser) {
            if (el.dataset.auth === 'logged-in') {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        } else {
            if (el.dataset.auth === 'logged-out') {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        }
    });
}

function logoutUser() {
    localStorage.removeItem('authToken');
    currentUser = null;
    updateUIForLoggedInUser();
    showNotification('Logged out successfully', 'success');
    window.location.href = '/index.html';
}

// Authentication functions
async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('authToken', data.token);
            currentUser = data.user;
            updateUIForLoggedInUser();
            showNotification('Login successful', 'success');
            return true;
        } else {
            showNotification(data.message || 'Login failed', 'error');
            return false;
        }
    } catch (error) {
        showNotification('Network error. Please try again.', 'error');
        console.error('Login error:', error);
        return false;
    }
}

async function registerUser(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('authToken', data.token);
            currentUser = data.user;
            updateUIForLoggedInUser();
            showNotification('Registration successful', 'success');
            return true;
        } else {
            showNotification(data.message || 'Registration failed', 'error');
            return false;
        }
    } catch (error) {
        showNotification('Network error. Please try again.', 'error');
        console.error('Registration error:', error);
        return false;
    }
}

async function fetchCurrentUser() {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    
    try {
        const response = await fetch(`${API_BASE_URL}/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            return data;
        } else {
            localStorage.removeItem('authToken');
            return null;
        }
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    // Check if user is logged in
    currentUser = await fetchCurrentUser();
    updateUIForLoggedInUser();
    
    // Set up logout buttons
    const logoutButtons = document.querySelectorAll('.logout-btn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', logoutUser);
    });
    
    // Set up login form if it exists
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            
            const success = await loginUser(email, password);
            if (success) {
                window.location.href = '/lobby.html';
            }
        });
    }
    
    // Set up registration form if it exists
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            const confirmPassword = this.querySelector('#confirmPassword').value;
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            const success = await registerUser(email, password);
            if (success) {
                window.location.href = '/lobby.html';
            }
        });
    }
    
    // Set up password visibility toggles
    const passwordToggles = document.querySelectorAll('.toggle-password');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
});

// WebSocket connection for real-time updates
let socket = null;

function connectWebSocket() {
    if (socket) return;
    
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    socket = new WebSocket(`${protocol}//${host}`);
    
    socket.onopen = () => {
        console.log('WebSocket connected');
        // Authenticate if user is logged in
        const token = localStorage.getItem('authToken');
        if (token) {
            socket.send(JSON.stringify({ type: 'auth', token }));
        }
    };
    
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('WebSocket message:', data);
        
        if (data.type === 'balanceUpdate' && currentUser) {
            currentUser.balance = data.balance;
            updateUIForLoggedInUser();
        }
    };
    
    socket.onclose = () => {
        console.log('WebSocket disconnected');
        socket = null;
        // Try to reconnect after 5 seconds
        setTimeout(connectWebSocket, 5000);
    };
    
    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
}

// Connect WebSocket when user is logged in
document.addEventListener('DOMContentLoaded', () => {
    if (currentUser) {
        connectWebSocket();
    }
});