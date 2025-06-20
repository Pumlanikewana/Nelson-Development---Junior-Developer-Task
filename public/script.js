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
        
        // Validate URL format
        if (!validationUrl.includes('/api/sort-string')) {
            responseDiv.style.display = 'block';
            responseDiv.className = 'response error';
            responseDiv.textContent = 'Error: URL must end with /api/sort-string';
            return;
        }
        
        // Show loading state
        responseDiv.style.display = 'block';
        responseDiv.className = 'response loading';
        responseDiv.textContent = 'Submitting for validation...';
        
        const validationEndpoint = 'https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/junior-dev';
        
        try {
            // Try POST method first
            let response = await fetch(validationEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: validationUrl,
                    email: email
                })
            });
            
            // If POST fails with 400, try GET method
            if (response.status === 400) {
                responseDiv.textContent = 'POST failed, trying GET method...';
                
                const getUrl = `${validationEndpoint}?url=${encodeURIComponent(validationUrl)}&email=${encodeURIComponent(email)}`;
                response = await fetch(getUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            }
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
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