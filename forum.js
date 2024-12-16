// Report object
const report = {
    title: "User-Reported Content",
    description: "",
    submitter: "Anonymous",
    submittedAt: new Date().toLocaleString(),
    displayInfo() {
        return `Report by ${this.submitter}: ${this.title} - ${this.description}. Submitted at: ${this.submittedAt}`;
    },
    submitReport() {
        console.log(`Report titled "${this.title}" has been submitted.`);
    }
};

// Handle form submission
const reportForm = document.getElementById('reportForm');
const confirmationMessage = document.getElementById('confirmationMessage');
const reportContent = document.getElementById('reportContent');

// Function to handle the form submission
reportForm.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent page reload on form submit
    
    const content = reportContent.value.trim();

    if (content) {
      
        report.description = content;
        
   
        report.submitReport();

        // Display the confirmation message
        confirmationMessage.classList.remove('hidden');

        reportForm.reset();

        // Optionally, hide the confirmation message after 5 seconds
        setTimeout(function() {
            confirmationMessage.classList.add('hidden');
        }, 5000);
    } else {
        alert('Please enter a report description.');
    }
});
