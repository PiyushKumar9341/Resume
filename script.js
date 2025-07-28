document.addEventListener('DOMContentLoaded', function() {
    // --- Copy Email Functionality ---
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailAddressSpan = document.getElementById('email-address');
    const messageBox = document.getElementById('messageBox');

    if (copyEmailBtn && emailAddressSpan && messageBox) {
        copyEmailBtn.addEventListener('click', function() {
            const email = emailAddressSpan.textContent;
            
            // Copy text to clipboard using document.execCommand
            const tempInput = document.createElement('textarea');
            tempInput.value = email;
            document.body.appendChild(tempInput);
            tempInput.select();
            try {
                document.execCommand('copy');
                showMessage('Email copied to clipboard!', 'success');
            } catch (err) {
                showMessage('Failed to copy email. Please copy manually.', 'error');
                console.error('Copy command failed:', err);
            }
            document.body.removeChild(tempInput);
        });
    }

    function showMessage(message, type) {
        messageBox.textContent = message;
        messageBox.style.display = 'block';
        messageBox.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
        messageBox.style.color = type === 'success' ? '#155724' : '#721c24';
        messageBox.style.borderColor = type === 'success' ? '#c3e6cb' : '#f5c6cb';

        // Hide message after 3 seconds
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 3000);
    }

    // --- Scroll to Top Button Functionality ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Show/hide the button based on scroll position
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    };

    // When the user clicks on the button, scroll to the top of the document
    scrollToTopBtn.addEventListener('click', function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });

    // --- Section Highlighting (Active Navigation) ---
    const sections = document.querySelectorAll('section');
    const sectionTitles = document.querySelectorAll('.section-title');

    function highlightActiveSection() {
        let currentActive = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Check if the section is in the viewport, considering a buffer
            if (pageYOffset >= sectionTop - sectionHeight / 3) { // Adjust buffer as needed
                currentActive = section.getAttribute('id');
            }
        });

        sectionTitles.forEach(title => {
            title.classList.remove('active');
            // Find the corresponding title for the active section
            if (title.parentElement.getAttribute('id') === currentActive) {
                title.classList.add('active');
            }
        });
    }

    // Listen for scroll events to highlight sections
    window.addEventListener('scroll', highlightActiveSection);
    // Call on load to set initial active section
    highlightActiveSection(); 

    // --- Skills Hover Effect ---
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        // Tailwind's hover classes are usually sufficient, but if more complex JS interaction is needed,
        // you would add mouseenter/mouseleave listeners here.
        // For now, the CSS transition handles the effect, but this is where you'd add JS for it.
    });

    // --- Name Hover Effect ---
    const userName = document.getElementById('userName');
    if (userName) {
        userName.addEventListener('mouseenter', function() {
            userName.classList.add('hovered');
        });
        userName.addEventListener('mouseleave', function() {
            userName.classList.remove('hovered');
        });
    }
});