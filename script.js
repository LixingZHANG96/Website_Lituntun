const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeButton = document.querySelector('.lightbox-close');
const prevButton = document.querySelector('.lightbox-prev');
const nextButton = document.querySelector('.lightbox-next');

const duneImperiumImages = [
  'assets/BG_Dune_Imperium/Dune_Imperium_Demo.jpg',
  'assets/BG_Dune_Imperium/Lady%20Jessica_Bene%20Gesserit%20Sisters.jpg',
  'assets/BG_Dune_Imperium/Liet-Kynes_Fremen-Troops.jpg',
  'assets/BG_Dune_Imperium/Mentat_2.jpg',
  'assets/BG_Dune_Imperium/Sardaukar%20troops_1.jpg',
];

const oathswornImages = [
  'assets/BG_Oathsworn/Fine_Boss_Frog.jpg',
  'assets/BG_Oathsworn/Fine_Boss_WASP.jpg',
  'assets/BG_Oathsworn/Fine_Enemy_Assassin.jpg',
  'assets/BG_Oathsworn/Normal_Boss_NTR.jpg',
  'assets/BG_Oathsworn/Oathsworn_Boss_1.jpg',
];

const warhammer40KImages = [
  'assets/WH_40K_fighting_scenario/Warhammer_40K_fighting.jpg',
  'assets/WH_40K_fighting_scenario/NMM_Captain.jpg',
  'assets/WH_40K_fighting_scenario/Squad_Overview_1.jpg',
  'assets/WH_40K_fighting_scenario/Squad_Overview_2.jpg',
];

const LixillboxNurgleImages = [
  'assets/WH_Lixillbox_Nurgle/Nurgle_Team_1.jpg',
  'assets/WH_Lixillbox_Nurgle/Nurgle_Team_2.jpg',
  'assets/WH_Lixillbox_Nurgle/Nurgle_Team_3.jpg',
  'assets/WH_Lixillbox_Nurgle/Nurgle_Team_4.jpg',
  'assets/WH_Lixillbox_Nurgle/Nurgle_Team_5.jpg',
  'assets/WH_Lixillbox_Nurgle/Nurgle_Team_6.jpg',
  'assets/WH_Lixillbox_Nurgle/Nurgle_Team_7.jpg',
  'assets/WH_Lixillbox_Nurgle/Nurgle_Team_8.jpg',
  'assets/WH_Lixillbox_Nurgle/Nurgle_Team_9.jpg',
  'assets/WH_Lixillbox_Nurgle/Nurgle_Captain.jpg',
];

const LixillboxKriegImages = [
  'assets/WH_Lixillbox_Krieg/Krieg_Team_1.jpg',
  'assets/WH_Lixillbox_Krieg/Krieg_Team_2.jpg',
  'assets/WH_Lixillbox_Krieg/Krieg_Team_3.jpg',
  'assets/WH_Lixillbox_Krieg/Krieg_Team_4.jpg',
  'assets/WH_Lixillbox_Krieg/Box_Grey_Command_1_4.png',
];

const galleryImages = {
  'dune-imperium': duneImperiumImages,
  'oathsworn': oathswornImages,
  'warhammer-40k': warhammer40KImages,
  'Lixillbox-Nurgle': LixillboxNurgleImages,
  'Lixillbox-Krieg': LixillboxKriegImages,
};

let lightboxImages = [];
let lightboxIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;

function openLightbox(images, index = 0) {
  if (!images || !images.length) {
    return;
  }

  lightboxImages = images;
  lightboxIndex = index;
  lightboxImage.src = images[index];
  lightboxImage.alt = `Image ${index + 1}`;
  lightboxCaption.textContent = `${index + 1} / ${images.length}`;
  lightboxModal.classList.add('visible');
  lightboxModal.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightboxModal.classList.remove('visible');
  lightboxModal.setAttribute('aria-hidden', 'true');
}

function showLightboxSlide(offset) {
  if (!lightboxImages.length) {
    return;
  }

  lightboxIndex = (lightboxIndex + offset + lightboxImages.length) % lightboxImages.length;
  lightboxImage.src = lightboxImages[lightboxIndex];
  lightboxImage.alt = `Image ${lightboxIndex + 1}`;
  lightboxCaption.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
}

function handleTouchStart(event) {
  touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
  touchEndX = event.changedTouches[0].screenX;
  const deltaX = touchEndX - touchStartX;

  if (Math.abs(deltaX) < swipeThreshold) {
    return;
  }

  if (deltaX < 0) {
    showLightboxSlide(1);
  } else {
    showLightboxSlide(-1);
  }
}

closeButton.addEventListener('click', closeLightbox);
prevButton.addEventListener('click', () => showLightboxSlide(-1));
nextButton.addEventListener('click', () => showLightboxSlide(1));

lightboxModal.addEventListener('click', (event) => {
  if (event.target === lightboxModal) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (!lightboxModal.classList.contains('visible')) {
    return;
  }

  if (event.key === 'Escape') {
    closeLightbox();
  }

  if (event.key === 'ArrowLeft') {
    showLightboxSlide(-1);
  }

  if (event.key === 'ArrowRight') {
    showLightboxSlide(1);
  }
});

lightboxImage.addEventListener('touchstart', handleTouchStart, { passive: true });
lightboxImage.addEventListener('touchend', handleTouchEnd, { passive: true });

document.querySelectorAll('.lightbox-trigger').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();

    const galleryKey = trigger.dataset.gallery;
    if (galleryImages[galleryKey]) {
      openLightbox(galleryImages[galleryKey], 0);
      return;
    }

    console.warn('No gallery configured for:', galleryKey);
  });
});
