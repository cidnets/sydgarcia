// PASTE THIS ENTIRE BLOCK TO REPLACE EVERYTHING IN YOUR SCRIPT.JS FILE

console.log("hello, world!");
console.log("sup bitch?");

//COPYRIGHT
const copyrightYearSpan = document.getElementById('copyright-year');
const currentYear = new Date().getFullYear();
copyrightYearSpan.textContent = currentYear;

//NAVBAR Hide links after click on small screens
// Find the checkbox element by its ID
const menuToggle = document.getElementById('menu-toggle');

// Find all the navigation links within your menu
const navLinks = document.querySelectorAll('a.nav-links');

// Loop through each of the navigation links
navLinks.forEach(link => {
    // Add a 'click' event listener to each one
    link.addEventListener('click', () => {
        // When a link is clicked, set the checkbox to 'unchecked'
        // This will trigger your CSS to hide the menu again! ✨
        if (menuToggle) {
            menuToggle.checked = false;
        }
    });
});
  
//BACK TO TOP BUTTON
// Get the button:
let mybutton = document.getElementById("back-to-top-bttn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (mybutton && (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)) {
    mybutton.style.display = "block";
  } else if (mybutton) {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function backToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
// END UNIVERSAL PAGE FX

// Random Border Images
document.addEventListener('DOMContentLoaded', function() {
    // Select all containers with the .posts-grid class
    const postGrids = document.querySelectorAll('.links-links');

    const borderStyles = [
        { id: 'borderBlue', url: 'url("/assets/Border-blue.png")', backgroundColor: '#BDE7FF' },
        { id: 'borderGreen', url: 'url("/assets/Border-green.png")', backgroundColor: '#BFEBAC' },
        { id: 'borderPeach', url: 'url("/assets/Border-peach.png")', backgroundColor: '#FFD5BD' },
        { id: 'borderPink', url: 'url("/assets/Border-pink.png")', backgroundColor: '#FFD0DE' },
		{ id: 'borderPurple', url: 'url("/assets/Border-purple.png")', backgroundColor: '#F1CBFF' },
		{ id: 'borderYellow', url: 'url("/assets/Border-yellow.png")', backgroundColor: '#FDFFBD' },
    ];

    postGrids.forEach(grid => {
        const linksToStyle = grid.querySelectorAll('li a');
        let availableStyles = [...borderStyles];

		linksToStyle.forEach(link => {
			if (availableStyles.length === 0) {
				availableStyles = [...borderStyles];
			}

			const randomIndex = Math.floor(Math.random() * availableStyles.length);
			const randomStyle = availableStyles[randomIndex];

			link.dataset.borderStyle = randomStyle.id; 
			link.style.backgroundColor = randomStyle.backgroundColor;

			availableStyles.splice(randomIndex, 1);
		});
    });
});

// --- CORRECTED GALLERY SECTION STARTS HERE ---
document.addEventListener('DOMContentLoaded', () => {

    const galleryContainer = document.querySelector('.gallery-container');
    // If there's no gallery on the page, stop running the script.
    if (!galleryContainer) {
        return;
    }

    // This is our new and improved function that reads the gap size from your CSS!
    function resizeGridItem(item) {
        const grid = document.querySelector('.gallery-container');
        const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        const rowGap = parseInt(getComputedStyle(grid).getPropertyValue('gap'));

        const image = item.querySelector('img');
        if (!image) return; // Safety check

        const itemHeight = image.getBoundingClientRect().height;
        const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = 'span ' + rowSpan;
    }

    // This is the part that correctly loops through all gallery items.
    const allItems = document.querySelectorAll('.custom-lightbox-trigger');
    allItems.forEach(item => {
        const image = item.querySelector('img');
        if (image) {
            // This small function runs the resize logic for this one item.
            const applyResize = () => {
                resizeGridItem(item);
            };
            // We tell the browser to run our resize function ONLY after the image has loaded.
            image.addEventListener('load', applyResize);
            // This is a fallback for images that loaded so fast they are already in the browser's cache.
            if (image.complete) {
                applyResize();
            }
        }
    });

    // We also want to re-calculate everything if the browser window changes size.
    window.addEventListener('resize', () => {
        allItems.forEach(resizeGridItem);
    });

});
// --- CORRECTED GALLERY SECTION ENDS HERE ---


//MODAL LIGHTBOX
document.addEventListener('DOMContentLoaded', () => {

    const modal = document.querySelector('#my-modal');
    // Safety check: if the modal isn't on the page, don't run the script
    if (!modal) {
        return;
    }

    const modalImage = modal.querySelector('.modal-image');
    const closeButton = modal.querySelector('.modal-close-btn');
    const overlay = modal.querySelector('.modal-overlay');
    const triggerLinks = document.querySelectorAll('.custom-lightbox-trigger');

    const infoTrigger = document.querySelector('.modal-info-trigger');
    const infoPanel = document.querySelector('.modal-img-info');
    const modalTitle = document.querySelector('#modal-title');
    const modalDate = document.querySelector('#modal-date');
    const modalMedium = document.querySelector('#modal-medium');
    const modalSize = document.querySelector('#modal-size');


    function openModal() {
        modal.classList.add('modal-active');
    }

    function closeModal() {
        modal.classList.remove('modal-active');
        if (infoPanel) {
            infoPanel.classList.remove('is-visible');
        }
    }

    triggerLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 

            const title = this.dataset.title;
            const date = this.dataset.date;
            const medium = this.dataset.medium;
            const size = this.dataset.size;
            const imageUrl = this.getAttribute('href');

            modalImage.setAttribute('src', imageUrl);
            modalTitle.textContent = title;
            modalDate.textContent = date;
            modalMedium.textContent = medium;
            modalSize.textContent = size;

            openModal();
        });
    });

    if(closeButton) closeButton.addEventListener('click', closeModal);
    if(overlay) overlay.addEventListener('click', closeModal);

    if(infoTrigger) {
        infoTrigger.addEventListener('click', () => {
            infoPanel.classList.toggle('is-visible');
        });
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});