// Define a new custom class for the Banner HTML element
class Banner extends HTMLElement {
  // The connectedCallback method runs every time the custom element is added to the document
  connectedCallback() {
    // Set the 'active' attribute for the Banner element
    this.setAttribute('active', '');

    // Add a click event listener to the Banner element
    this.addEventListener('click', e => {
      // Find the closest ancestor element that matches the '[data-banner-close-btn]' selector
      const buttonClicked = /** @type {HTMLElement} */ (e.target).closest(
        '[data-banner-close-btn]'
      );

      // If the close button was clicked
      if (buttonClicked) {
        // Save the user's preference
        this.savePreference(buttonClicked);

        // Close the Banner element
        this.close();
      }
    });
  }

  // Save the user's preference for the Banner element
  savePreference(button) {
    // Get the 'storage-key' attribute value for the Banner element
    const storageKey = this.getAttribute('storage-key') || '';

    // Get the 'storage-value' attribute value for the close button
    const cta = button.getAttribute('storage-value');

    // If the 'storage-value' attribute exists
    if (cta) {
      // Save the user's preference to local storage
      localStorage.setItem(storageKey, cta);
    } else {
      // Find the first anchor element with an 'href' attribute
      const hrefCta = this.querySelector('a[href]');

      // If such an element exists
      if (hrefCta) {
        // Get the 'href' attribute value for the anchor element
        const ctaUrl = hrefCta.getAttribute('href') || '';

        // Save the user's preference to local storage
        localStorage.setItem(storageKey, ctaUrl);
      }
    }
  }

  // Close the Banner element
  close() {
    this.
