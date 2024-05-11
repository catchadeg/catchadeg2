// Require the necessary modules
const { fetch, FormData } = require('node-fetch');

// Initialize array to store the uploaded photos
let uploadedPhotos = [];

// Function to upload a photo to Imgur
async function uploadToImgur(file, tags) {
    try {
        const clientId = 'YOUR_IMGUR_CLIENT_ID_HERE';
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', tags);

        const response = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                'Authorization': `Client-ID ${clientId}`
            },
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            const photoInfo = {
                url: data.data.link, // Use the Imgur URL
                tags: tags
            };
            // Add the new photo at the end of the array
            uploadedPhotos.push(photoInfo);
            console.log('Photo uploaded to Imgur:', data.data.link);
            alert('Photo uploaded successfully!');
            displayPhotos(); // Display the uploaded photos
        } else {
            console.error('Error uploading photo to Imgur:', await response.text());
        }
    } catch (error) {
        console.error('Error uploading photo:', error);
    }
}

// Add an event listener to the form submission
document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission behavior
            const photoInput = document.getElementById('photo-input');
            const tagsInput = document.getElementById('tags-input');
            await uploadToImgur(photoInput.files[0], tagsInput.value);
        });
    }
});

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
