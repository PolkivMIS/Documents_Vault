// quotes.js

const quotes = [
  "The stars don’t look bigger, but they do look brighter.",
  "Space is the breath of art.",
  "Astronauts are dreamers with rocket fuel.",
  "Even the darkest night will end and the stars will shine.",
  "We are all made of stardust.",
  "Shoot for the moon. Even if you miss, you'll land among the stars.",
  "In space, no one can hear you doubt yourself.",
  "The cosmos is within us. We are made of star stuff."
];

function showRandomQuote() {
  const quoteLayer = document.getElementById('quoteLayer');
  quoteLayer.innerHTML = ''; // Clear previous quote

  const quote = document.createElement('div');
  quote.className = 'floating-quote';
  quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  // Random position
  quote.style.top = `${Math.random() * 80 + 10}%`;
  quote.style.left = `${Math.random() * 80 + 10}%`;

  // Random font size and rotation
  quote.style.fontSize = `${Math.random() * 0.5 + 1}rem`;
  quote.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;

  quoteLayer.appendChild(quote);

  // Remove after animation
  setTimeout(() => {
    quote.remove();
  }, 5000);
}

// Show a new quote every 6 seconds
setInterval(showRandomQuote, 6000);

// Show one immediately on load
showRandomQuote();