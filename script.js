document.addEventListener('DOMContentLoaded', ()=>{

  // --- год в футере ---
  document.getElementById('year').textContent = new Date().getFullYear();

  // --- меню для мобильных ---
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  menuBtn.addEventListener('click', ()=>{
    const expanded = menuBtn.getAttribute('aria-expanded')==='true';
    menuBtn.setAttribute('aria-expanded', (!expanded).toString());
    nav.style.display = expanded ? 'none' : 'flex';
  });

  // --- корзина ---
  const cartBody = document.getElementById('cart-body');
  const cartTotal = document.getElementById('cart-total');
  let total = 0;
  document.querySelectorAll('.add-to-cart').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      const row = document.createElement('tr');
      row.innerHTML = `<td>${name}</td><td>${price}</td><td><button class='remove'>✕</button></td>`;
      cartBody.appendChild(row);
      total += price;
      cartTotal.textContent = total;
      row.querySelector('.remove').addEventListener('click', ()=>{
        row.remove();
        total -= price;
        cartTotal.textContent = total;
      });
    });
  });

  // --- модальные окна и слайдер ---
  const slidesData = {
    'concept-coat': [
      'assets/DSC00627.JPG',
      'assets/DSC00627-2.JPG',
      'assets/DSC00627-3.JPG'
    ],
    'structured-coat': [
      'assets/placeholder-2.jpg',
      'assets/placeholder-2-2.jpg'
    ]
  };

  const currentSlide = {};

  window.openModal = function(id){
    const modal = document.getElementById(id);
    if(!modal) return;
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    currentSlide[id] = 0;
    updateSlide(id);
  }

  window.closeModal = function(id){
    const modal = document.getElementById(id);
    if(!modal) return;
    modal.classList.remove('show');
    setTimeout(()=>{
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }, 300);
  }

  function updateSlide(id){
    const modal = document.getElementById(id);
    const imgEl = modal.querySelector('img#'+id+'-main');
    imgEl.style.opacity = 0;
    setTimeout(()=>{
      imgEl.src = slidesData[id][currentSlide[id]];
      imgEl.style.opacity = 1;
    },150);
  }

  window.changeSlide = function(id, step){
    if(!slidesData[id]) return;
    currentSlide[id] = (currentSlide[id] + step + slidesData[id].length) % slidesData[id].length;
    updateSlide(id);
  }

  window.setSlide = function(id, index){
    if(!slidesData[id]) return;
    currentSlide[id] = index % slidesData[id].length;
    updateSlide(id);
  }

  // Закрытие модалки при клике вне контента
  window.onclick = function(event){
    document.querySelectorAll('.modal').forEach(modal=>{
      if(event.target === modal){
        modal.classList.remove('show');
        setTimeout(()=>{
          modal.style.display = 'none';
          document.body.classList.remove('modal-open');
        },300);
      }
    });
  }

  // --- клавиши для листания слайдов и закрытия ---
  window.addEventListener('keydown', function(event){
    // находим открытую модалку
    const openModalEl = document.querySelector('.modal.show');
    if(!openModalEl) return; // если модалка закрыта — ничего не делаем

    const id = openModalEl.id;
    if(event.key === 'ArrowLeft'){
      changeSlide(id, -1); // стрелка влево
    } else if(event.key === 'ArrowRight'){
      changeSlide(id, 1);  // стрелка вправо
    } else if(event.key === 'Escape'){
      closeModal(id); // Escape закрывает модалку
    }
  });

});
