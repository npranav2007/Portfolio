// Define the images for each project slideshow
const projectImages = {
    "project1": [
      "dpa2.png",
      "dpa3.png",
      "dpa4.png"
    ],
    "project2": [
      "mp2.png",
      "mp3.png",
      "mp4.png"
    ],
    "project3": [
      "gymSS.png",
      "gymSS2.png",
      "gymSS3.png"
    ]
  };
  
  // Variables to track current slideshow state
  let currentProject = null;
  let currentImageIndex = 0;
  
  // Create slideshow HTML elements and add to page
  function createSlideshowElements() {
    const slideshowOverlay = document.createElement('div');
    slideshowOverlay.className = 'slideshow-overlay';
    slideshowOverlay.innerHTML = `
      <div class="slideshow-container">
        <button class="close-btn">&times;</button>
        <div class="slideshow-content">
          <img src="" alt="Project Image" class="slideshow-image">
          <div class="slideshow-controls">
            <button class="prev-btn">❮</button>
            <div class="slideshow-counter">1 / 3</div>
            <button class="next-btn">❯</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(slideshowOverlay);
    
    // Add event listeners for slideshow controls
    document.querySelector('.close-btn').addEventListener('click', closeSlideshow);
    document.querySelector('.prev-btn').addEventListener('click', prevImage);
    document.querySelector('.next-btn').addEventListener('click', nextImage);
    
    // Close when clicking outside the image
    slideshowOverlay.addEventListener('click', function(e) {
      if (e.target === slideshowOverlay) {
        closeSlideshow();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (!document.querySelector('.slideshow-overlay').classList.contains('active')) return;
      
      if (e.key === 'Escape') closeSlideshow();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    });
  }
  
  // Set up click handlers for project images
  function initSlideshow() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      const projectId = `project${index + 1}`;
      const projectImage = card.querySelector('.project-image');
      
      projectImage.addEventListener('click', function() {
        openSlideshow(projectId);
      });
    });
    
    createSlideshowElements();
  }
  
  // Open slideshow for a specific project
  function openSlideshow(projectId) {
    currentProject = projectId;
    currentImageIndex = 0;
    updateSlideshow();
    document.querySelector('.slideshow-overlay').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  // Close the slideshow
  function closeSlideshow() {
    document.querySelector('.slideshow-overlay').classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  // Navigate to previous image
  function prevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
    } else {
      currentImageIndex = projectImages[currentProject].length - 1;
    }
    updateSlideshow();
  }
  
  // Navigate to next image
  function nextImage() {
    if (currentImageIndex < projectImages[currentProject].length - 1) {
      currentImageIndex++;
    } else {
      currentImageIndex = 0;
    }
    updateSlideshow();
  }
  
  // Update the displayed image and counter
  function updateSlideshow() {
    const slideshowImage = document.querySelector('.slideshow-image');
    const slideshowCounter = document.querySelector('.slideshow-counter');
    
    slideshowImage.src = projectImages[currentProject][currentImageIndex];
    slideshowCounter.textContent = `${currentImageIndex + 1} / ${projectImages[currentProject].length}`;
  }
  
  // Initialize when the page loads
  document.addEventListener('DOMContentLoaded', initSlideshow);