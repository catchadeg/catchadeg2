// Initialize array to store the uploaded photos
let uploadedPhotos = [];

// Check if document is defined (browser environment) before using it
if (typeof document !== 'undefined') {
    // Display the uploaded photos
    function displayPhotos() {
        const photoGrid = document.getElementById('photo-grid');
        photoGrid.innerHTML = '';

        uploadedPhotos.forEach(photo => {
            const photoCard = document.createElement('div');
            photoCard.classList.add('photo-card');

            const img = document.createElement('img');
            img.src = photo.url; // Use the Imgur URL
            img.alt = photo.tags;

            const h3 = document.createElement('h3');
            h3.textContent = photo.tags;

            photoCard.appendChild(img);
            photoCard.appendChild(h3);
            photoGrid.appendChild(photoCard);
        });
    }

    // Fetch photos from the server and display them on the website
    async function fetchAndDisplayPhotos() {
        try {
            const response = await fetch('/photos');
            if (response.ok) {
                const photos = await response.json();
                uploadedPhotos = photos; // Assign fetched photos to uploadedPhotos array
                displayPhotos(); // Display the fetched photos
            } else {
                console.error('Failed to fetch photos:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    }

    // Call fetchAndDisplayPhotos when the page is loaded
    document.addEventListener('DOMContentLoaded', fetchAndDisplayPhotos);

    // Add an event listener to the form submission
    document.getElementById('upload-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const photoInput = document.getElementById('photo-input');
        const tagsInput = document.getElementById('tags-input');
        await uploadToImgur(photoInput.files[0], tagsInput.value);
    });
}
