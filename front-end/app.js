document.addEventListener("DOMContentLoaded", () => {
    // Function to execute the query
    const executeQuery = async () => {
        const queryInput = document.getElementById("queryInput").value;

        try {
            const response = await fetch('http://localhost:3000/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: queryInput }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}: ${await response.text()}`);
            }

            const result = await response.json();
            displayResult(result);
        } catch (error) {
            console.error('Error executing query:', error.message);
            displayResult({ error: 'An error occurred while executing the query.' });
        }
    };

    // Function to display the result
    const displayResult = (result) => {
        const resultOutput = document.getElementById("resultOutput");

        if (result.error) {
            resultOutput.innerHTML = `<p>Error: ${result.error}</p>`;
        } else {
            resultOutput.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
        }
    };

    // Attach executeQuery function to the global scope for simplicity
    window.executeQuery = executeQuery;
});

