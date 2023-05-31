
fetch('http://localhost:3000/news')
  .then(response => response.json())
  .then(news => {
    const newsContainer = document.getElementById('news-container');

    news.forEach(item => {
      const newsItem = document.createElement('div');
      newsItem.innerHTML = `
        <h2>${item.title}</h2>
        <p>${item.description}</p>
      `;
      newsContainer.appendChild(newsItem);
    });
  })
  .catch(error => {
    console.error('Error fetching sports news:', error);
  });
