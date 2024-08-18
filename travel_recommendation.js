document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.querySelector("button[type='submit']");
    const clearButton = document.querySelector("button[type='reset']");
    const resultsContainer = document.querySelector("#results");

    searchButton.addEventListener("click", function(event) {
        event.preventDefault();
        const searchInput = document.querySelector("input[name='search']").value.toLowerCase();

        fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
                resultsContainer.innerHTML = ""; // Clear previous results

                let filteredResults = [];

                if (searchInput.includes("beach")) {
                    filteredResults = data.beaches;
                } else if (searchInput.includes("temple")) {
                    filteredResults = data.temples;
                } else {
                    // Searching for countries and their cities
                    data.countries.forEach(country => {
                        if (searchInput.includes(country.name.toLowerCase())) {
                            filteredResults.push(...country.cities);
                        }
                    });
                }

                if (filteredResults.length > 0) {
                    filteredResults.forEach(item => {
                        const resultItem = `
                            <div class="result-item">
                                <img src="${item.imageUrl}" alt="${item.name}">
                                <h3>${item.name}</h3>
                                <p>${item.description}</p>
                                <button>Visit</button>
                            </div>
                        `;
                        resultsContainer.innerHTML += resultItem;
                    });
                } else {
                    resultsContainer.innerHTML = "<p>No results found.</p>";
                }
            })
            .catch(error => console.error('Error fetching the data:', error));
    });

    clearButton.addEventListener("click", function() {
        resultsContainer.innerHTML = "";
        document.querySelector("input[name='search']").value = "";
    });
});