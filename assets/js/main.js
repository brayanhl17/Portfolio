'use strict';

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "todo") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

const FORMSPREE_ID = 'xovklbzk'; 

    const form = document.querySelector('[data-form]');
    const formBtn = document.querySelector('[data-form-btn]');
    const formInputs = document.querySelectorAll('[data-form-input]');

    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        const allFilled = Array.from(formInputs).every(input => input.value.trim() !== '');
        formBtn.disabled = !allFilled;
      });
    });

    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      formBtn.disabled = true;
      const originalHTML = formBtn.innerHTML;
      formBtn.innerHTML = '<span>Enviando...</span>';
      
      try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: '¡Mensaje enviado!',
            text: 'Gracias por contactarme. Te responderé pronto.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#68b6ff',
            background: '#1e1e1f',
            color: '#fff',
            iconColor: '#68b6ff'
          });
          
          form.reset();
          formBtn.disabled = true;
        } else {
          throw new Error('Error en la respuesta del servidor');
        }
        
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo.',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#68b6ff',
          background: '#1e1e1f',
          color: '#fff',
          iconColor: '#ff6b6b'
        });
        
        console.error('Error:', error);
      } finally {
        formBtn.innerHTML = originalHTML;
      }
    });

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}