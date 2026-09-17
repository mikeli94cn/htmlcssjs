// Define interfaces for API structures if needed later
interface LoginResponse {
    token?: string;
    success: boolean;
    message?: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form') as HTMLFormElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
    const errorAlert = document.getElementById('error-message') as HTMLDivElement;
    const successAlert = document.getElementById('success-message') as HTMLDivElement;
    const btnText = submitBtn.querySelector('.btn-text') as HTMLSpanElement;
    const spinner = submitBtn.querySelector('.spinner') as HTMLSpanElement;

    loginForm.addEventListener('submit', async (e: Event) => {
        e.preventDefault();
        
        // Clear previous alert states
        errorAlert.classList.add('hidden');
        successAlert.classList.add('hidden');

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Front-end structural validation
        if (!email || !password) {
            showError('Please fill out all fields.');
            return;
        }

        // Set Loading state
        setLoading(true);

        try {
            // Prepared body structure for your Java backend API endpoint
            const payload = { email, password };

            /* 
               Uncomment and replace the URL when your Java backend is ready:
               
               const response = await fetch('http://localhost:8080/api/auth/login', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(payload)
               });
               
               const data: LoginResponse = await response.json();
            */

            // Simulation of a backend request delay (Remove this in production)
            await new Promise(resolve => setTimeout(resolve, 1500));
            const dummyResponse: LoginResponse = { success: true, token: 'mock-jwt-token' };

            if (dummyResponse.success) {
                successAlert.classList.remove('hidden');
                // Store your authentication token (e.g., localStorage or Cookie)
                if (dummyResponse.token) localStorage.setItem('authToken', dummyResponse.token);
                
                // Redirect user to the Ticket Dashboard page after 1 second
                setTimeout(() => {
                    window.location.href = '/dashboard.html';
                }, 1000);
            } else {
                showError(dummyResponse.message || 'Invalid credentials.');
                setLoading(false);
            }

        } catch (error) {
            console.error('Login system communication error:', error);
            showError('Unable to connect to the login server. Please try again later.');
            setLoading(false);
        }
    });

    function showError(message: string): void {
        errorAlert.textContent = message;
        errorAlert.classList.remove('hidden');
    }

    function setLoading(isLoading: boolean): void {
        submitBtn.disabled = isLoading;
        if (isLoading) {
            btnText.textContent = 'Authenticating...';
            spinner.classList.remove('hidden');
        } else {
            btnText.textContent = 'Sign In';
            spinner.classList.add('hidden');
        }
    }
});
