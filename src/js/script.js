console.log("hello, world!");
console.log("sup bitch?");

// $(document).ready(function() {
//  $('.hamburger').click(function() {
//    $('.nav-links').slideToggle(); // This will toggle the visibility with a nice slide effect!
    // Alternatively, you could use .toggle() for a simple show/hide
    // $('.nav-links').toggle();
//  });
// });

// Random Border Images
document.addEventListener('DOMContentLoaded', function() {
    // Select all containers with the .posts-grid class
    const postGrids = document.querySelectorAll('.links-links');

    // Our "Art Palette" of styles! 🎨
    // Each object has the image URL and its matching background color.
    const borderStyles = [
        { id: 'borderBlue', url: 'url("/assets/Border-blue.png")', backgroundColor: '#BDE7FF' },
        { id: 'borderGreen', url: 'url("/assets/Border-green.png")', backgroundColor: '#BFEBAC' },
        { id: 'borderPeach', url: 'url("/assets/Border-peach.png")', backgroundColor: '#FFD5BD' },
        { id: 'borderPink', url: 'url("/assets/Border-pink.png")', backgroundColor: '#FFD0DE' },
		{ id: 'borderPurple', url: 'url("/assets/Border-purple.png")', backgroundColor: '#F1CBFF' },
		{ id: 'borderYellow', url: 'url("/assets/Border-yellow.png")', backgroundColor: '#FDFFBD' },
        // Add as many unique image/color pairs as you like!
    ];

    postGrids.forEach(grid => {
        // Find all the links we want to style inside this grid
        const linksToStyle = grid.querySelectorAll('li a');
        
        // This makes a "copy" of our styles that we can safely remove items from
        let availableStyles = [...borderStyles];

        // This is the updated part of your JS script
		linksToStyle.forEach(link => {
			if (availableStyles.length === 0) {
				availableStyles = [...borderStyles];
			}

			const randomIndex = Math.floor(Math.random() * availableStyles.length);
			const randomStyle = availableStyles[randomIndex];

			// THIS IS THE BIG CHANGE!
			// Instead of setting link.style, we set a data attribute.
			link.dataset.borderStyle = randomStyle.id; 
    
			// We can still set the background color here if we want.
			link.style.backgroundColor = randomStyle.backgroundColor;

			availableStyles.splice(randomIndex, 1);
		});
    });
});

//BACK TO TOP BUTTON
// Get the button:
let mybutton = document.getElementById("back-to-top-bttn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function backToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//COPYRIGHT
    const copyrightYearSpan = document.getElementById('copyright-year');
    const currentYear = new Date().getFullYear();
    copyrightYearSpan.textContent = currentYear;


//GALLERY 
document.addEventListener('DOMContentLoaded', () => {

    const galleryContainer = document.querySelector('.gallery-container');
    // The same value as our grid-auto-rows in CSS
    const rowHeight = 10; 
    // The same value as our 'gap' in CSS (e.g., 1rem is often 16px)
    const rowGap = 16; 

    function resizeGridItem(item) {
        // 'item' is now the <a> tag
        const image = item.querySelector('img');
        
        const applyResize = () => {
            // We get the height of the figure element inside the link
            const figure = item.querySelector('.gallery-item');
            const itemHeight = figure.clientHeight;
            
            // Calculate how many of our tiny rows the item needs to span
            const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
            
            // Apply the style to the <a> tag itself
            item.style.gridRowEnd = 'span ' + rowSpan;
        };

        // We need to wait for the image to load to get its true height
        image.addEventListener('load', applyResize);

        // A fallback for cached images that might not fire the 'load' event
        if (image.complete) {
            applyResize();
        }
    }

    // Get all the gallery links and apply the resize function
    const allItems = galleryContainer.querySelectorAll('.custom-lightbox-trigger');
    allItems.forEach(resizeGridItem);

});

//MODAL LIGHTBOX
// Wait for the page to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GET ALL THE ELEMENTS WE NEED ---
    const modal = document.querySelector('#my-modal');
    const modalImage = modal.querySelector('.modal-image');
    const closeButton = modal.querySelector('.modal-close-btn');
    const overlay = modal.querySelector('.modal-overlay');
    // Get ALL the links that should open the modal
    const triggerLinks = document.querySelectorAll('.custom-lightbox-trigger');


    // --- 2. FUNCTION TO OPEN THE MODAL ---
    function openModal() {
        modal.classList.add('modal-active');
    }

    // --- 3. FUNCTION TO CLOSE THE MODAL ---
    function closeModal() {
        modal.classList.remove('modal-active');
    }


    // --- 4. ADD EVENT LISTENERS ---

    // Loop through all trigger links and add a click event
    triggerLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // This is super important! It stops the link from going to a new page.
            event.preventDefault(); 
            
            // Get the image URL from the link's href
            const imageUrl = this.getAttribute('href');
            
            // Put that URL into our modal's <img> tag
            modalImage.setAttribute('src', imageUrl);
            
            // Open the modal!
            openModal();
        });
    });

    // Add click listeners to close the modal
    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Pro-tip: Also close the modal with the "Escape" key!
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

});