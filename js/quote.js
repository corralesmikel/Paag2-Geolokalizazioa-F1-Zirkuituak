const quoteContainer = document.getElementById('kimiQuote');

fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://kimiquotes.pages.dev/api/quote"))
    .then(response => response.json())
    .then(data => {
        // El contenido real está en data.contents
        const quoteData = JSON.parse(data.contents);
        quoteContainer.textContent = `"${quoteData.quote}" — Kimi Räikkönen (${quoteData.year})`;

        gsap.to(quoteContainer, { opacity: 1, duration: 1, ease: "power2.out" });
    })
    .catch(err => {
        quoteContainer.textContent = "Could not load Kimi quote.";
        gsap.to(quoteContainer, { opacity: 1, duration: 1, ease: "power2.out" });
        console.error(err);
    });
