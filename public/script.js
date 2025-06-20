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
            // Try different request formats
            let response;
            let success = false;
            
            // Method 1: POST with JSON body
            console.log('Trying POST with JSON...');
            response = await fetch(validationEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: validationUrl,
                    email: email
                })
            });
            
            if (response.ok) {
                success = true;
            } else {
                console.log('POST JSON failed, status:', response.status);
                
                // Method 2: POST with form data
                console.log('Trying POST with form data...');
                const formData = new FormData();
                formData.append('url', validationUrl);
                formData.append('email', email);
                
                response = await fetch(validationEndpoint, {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    success = true;
                } else {
                    console.log('POST form data failed, status:', response.status);
                    
                    // Method 3: GET with query parameters
                    console.log('Trying GET with query parameters...');
                    const getUrl = `${validationEndpoint}?url=${encodeURIComponent(validationUrl)}&email=${encodeURIComponent(email)}`;
                    response = await fetch(getUrl, {
                        method: 'GET'
                    });
                    
                    if (response.ok) {
                        success = true;
                    } else {
                        console.log('GET failed, status:', response.status);
                    }
                }
            }
            
            if (!success) {
                let errorText = '';
                try {
                    errorText = await response.text();
                    console.log('Error response body:', errorText);
                } catch (e) {
                    errorText = 'Could not read response body';
                    console.log('Could not read error response body');
                }
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