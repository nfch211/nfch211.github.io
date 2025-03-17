"use strict";

// Utility function to toggle the 'active' class on an element
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
}

// Testimonials modal
const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
};

// Open modal when clicking a testimonial item
testimonialsItems.forEach((item) => {
  item.addEventListener("click", function () {
    if (modalImg && modalTitle && modalText) {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector(
        "[data-testimonials-title]"
      ).innerHTML;
      modalText.innerHTML = this.querySelector(
        "[data-testimonials-text]"
      ).innerHTML;
      testimonialsModalFunc();
    }
  });
});

// Close modal when clicking close button or overlay
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// Portfolio filter functionality
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// Toggle dropdown visibility
if (select) {
  select.addEventListener("click", () => elementToggleFunc(select));
}

// Filter items based on selected value
const filterFunc = function (selectedValue) {
  filterItems.forEach((item) => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Handle dropdown item clicks
selectItems.forEach((item) => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    if (selectValue && select) {
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    }
  });
});

// Handle filter button clicks (for larger screens)
let lastClickedBtn = filterBtns[0];
filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    if (selectValue) {
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    }
  });
});

// Contact form with Formspree integration
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Enable/disable submit button based on form validity
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (form && form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// Handle form submission with Formspree AJAX
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    fetch("https://formspree.io/f/myzeznjg", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Message sent successfully!");
          form.reset(); // Clear form fields
          formBtn.setAttribute("disabled", ""); // Disable button until new input
        } else {
          alert("Failed to send message. Please try again.");
        }
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });
}

// Page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const pageName = this.innerHTML.toLowerCase();

    // Remove 'active' from all pages and links
    pages.forEach((page) => page.classList.remove("active"));
    navigationLinks.forEach((nav) => nav.classList.remove("active"));

    // Add 'active' to the matching page and clicked link
    pages.forEach((page) => {
      if (page.dataset.page === pageName) {
        page.classList.add("active");
      }
    });
    this.classList.add("active");

    window.scrollTo(0, 0); // Scroll to top
  });
});
