const API_ENDPOINT = 'https://api.tetr.com/api/googlesheets/post';

// Form Elements
const form = document.getElementById('submissionForm');
const submitBtn = form.querySelector('.submit-btn');
const successMessage = document.getElementById('successMessage');

// Form Fields
const fields = {
    teamName: document.getElementById('teamName'),
    teamId: document.getElementById('teamId'),
    linkedinPost: document.getElementById('linkedinPost'),
    driveLink: document.getElementById('driveLink'),
    agreeTerms: document.getElementById('agreeTerms')
};

const errors = {
    teamName: document.getElementById('teamNameError'),
    teamId: document.getElementById('teamIdError'),
    linkedinPost: document.getElementById('linkedinError'),
    driveLink: document.getElementById('driveError'),
    agreeTerms: document.getElementById('termsError')
};

// Validation Functions
function validateField(field, value) {
    switch(field) {
        case 'teamName':
        case 'teamId':
        case 'driveLink':
            return value.trim().length > 0;
        case 'linkedinPost':
            // LinkedIn is optional, so empty is valid
            if (!value.trim()) return true;
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        case 'agreeTerms':
            return value === true;
        default:
            return true;
    }
}

function showError(fieldName) {
    if (fields[fieldName] && errors[fieldName]) {
        fields[fieldName].classList.add('error');
        errors[fieldName].style.display = 'block';
    }
}

function hideError(fieldName) {
    if (fields[fieldName] && errors[fieldName]) {
        fields[fieldName].classList.remove('error');
        errors[fieldName].style.display = 'none';
    }
}

// Real-time validation
Object.keys(fields).forEach(fieldName => {
    const field = fields[fieldName];
    
    if (!field) return; // Skip if field doesn't exist
    
    if (field.type === 'checkbox') {
        field.addEventListener('change', () => {
            if (validateField(fieldName, field.checked)) {
                hideError(fieldName);
            }
        });
    } else {
        field.addEventListener('input', () => {
            if (validateField(fieldName, field.value)) {
                hideError(fieldName);
            }
        });
        
        // Also validate on blur for URL fields
        if (fieldName === 'linkedinPost' || fieldName === 'driveLink') {
            field.addEventListener('blur', () => {
                if (!validateField(fieldName, field.value)) {
                    showError(fieldName);
                }
            });
        }
    }
});

// Form Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Hide previous success message
    successMessage.style.display = 'none';
    
    // Validate all fields
    let isValid = true;
    
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        if (!field) return;
        
        const value = field.type === 'checkbox' ? field.checked : field.value;
        
        if (!validateField(fieldName, value)) {
            showError(fieldName);
            isValid = false;
        } else {
            hideError(fieldName);
        }
    });

    if (!isValid) {
        // Scroll to first error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    // Prepare data
    const formData = {
        formId: "tetrAssignment",
        data: {
            teamName: fields.teamName.value.trim(),
            teamId: fields.teamId.value.trim(),
            linkedinPost: fields.linkedinPost.value.trim() || '',
            driveLink: fields.driveLink.value.trim(),
            agreeTerms: fields.agreeTerms.checked,
            submittedAt: new Date().toISOString()
        }
    };

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <span>SUBMITTING...</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
    `;

    try {
        // Submit to API
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Submission successful:', result);
        
        // Show success message
        successMessage.style.display = 'block';
        form.reset();
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);

    } catch (error) {
        console.error('Submission error:', error);
        alert('There was an error submitting your entry. Please try again.');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            SUBMIT
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
        `;
    }
});