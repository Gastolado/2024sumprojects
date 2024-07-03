document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('results');

  searchButton.addEventListener('click', function() {
      const query = searchInput.value;
      if (query) {
          fetchResults(query);
      }
  });

  async function fetchResults(query) {
      const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`;

      try {
          const response = await fetch(url);
          const data = await response.json();
          displayResults(data.query.search);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }

  function displayResults(results) {
      resultsContainer.innerHTML = '';
      results.forEach(result => {
          const resultItem = document.createElement('div');
          resultItem.classList.add('result-item');

          const title = document.createElement('a');
          title.href = `https://en.wikipedia.org/?curid=${result.pageid}`;
          title.target = '_blank';
          title.textContent = result.title;

          const snippet = document.createElement('p');
          snippet.innerHTML = result.snippet;

          resultItem.appendChild(title);
          resultItem.appendChild(snippet);
          resultsContainer.appendChild(resultItem);
      });
  }
});
