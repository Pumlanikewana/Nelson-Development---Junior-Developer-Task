document.addEventListener('DOMContentLoaded', function() {
    // Test API functionality
    document.getElementById('apiTestForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const testString = document.getElementById('testString').value;
        const apiUrl = document.getElementById('apiUrl').value;
        const responseDiv = document.getElementById('apiResponse');
        
        // Show loading state
        responseDiv.style.display = 'block';
        responseDiv.className = 'response loading';
        responseDiv.textContent = 'Testing API...';
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: testString })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            responseDiv.className = 'response success';
            responseDiv.textContent = JSON.stringify(result, null, 2);
            
        } catch (error) {
            responseDiv.className = 'response error';
            responseDiv.textContent = 'Error: ' + error.message;
        }
    });

    // Submit to validation endpoint
    document.getElementById('validationForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const validationUrl = document.getElementById('validationUrl').value;
        const email = document.getElementById('email').value;
        const responseDiv = document.getElementById('validationResponse');
        
        // Show loading state
        responseDiv.style.display = 'block';
        responseDiv.className = 'response loading';
        responseDiv.textContent = 'Submitting for validation...';
        
        const validationEndpoint = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/junior-dev?url=${encodeURIComponent(validationUrl)}&email=${encodeURIComponent(email)}`;
        
        try {
            const response = await fetch(validationEndpoint);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.text();
            
            responseDiv.className = 'response success';
            responseDiv.textContent = result;
            
        } catch (error) {
            responseDiv.className = 'response error';
            responseDiv.textContent = 'Error: ' + error.message;
        }
    });
});