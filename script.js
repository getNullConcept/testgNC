document.addEventListener('DOMContentLoaded',()=>{

  // --- год ---
  document.getElementById('year').textContent=new Date().getFullYear();

  // --- меню ---
  const menuBtn=document.querySelector('.menu-btn');
  const nav=document.querySelector('.nav');
  menuBtn.addEventListener('click',()=>{
    const expanded=menuBtn.getAttribute('aria-expanded')==='true';
    menuBtn.setAttribute('aria-expanded',(!expanded).toString());
    nav.style.display=expanded?'none':'flex';
  });

  // --- корзина ---
  const cartBody=document.getElementById('cart-body');
  const cartTotal=document.getElementById('cart-total');
  let total=0;
  document.querySelectorAll('.add-to-cart').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const name=btn.dataset.name;
      const price=parseFloat(btn.dataset.price);
      const row=document.createElement('tr');
      row.innerHTML=`<td>${name}</td><td>${price}</td><td><button class='remove'>✕</button></td>`;
      cartBody.appendChild(row);
      total+=price;
      cartTotal.textContent=total;
      row.querySelector('.remove').addEventListener('click',()=>{
        row.remove();
        total-=price;
        cartTotal.textContent=total;
      });
    });
  });

  // --- слайдеры с актуальными фото ---
  const slidesData={
    'concept-coat': [
      'assets/DSC00627.JPG',
      'assets/photo_2025-09-14_22-33-07.jpg',
      'assets/photo_2025-09-14_22-33-11.jpg'
    ],
    'structured-coat': [
      'assets/photo_2025-08-10_22-17-16.jpg',
      'assets/photo_2025-07-15_22-25-38.jpg'
    ]
  };
  const currentSlide={};

  // --- открыть модалку ---
  window.openModal=function(id){
    const modal=document.getElementById(id);
    if(!modal) return;
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    currentSlide[id]=0;
    updateSlide(id);
  }

  // --- закрыть модалку ---
  window.closeModal=function(id){
    const modal=document.getElementById(id);
    if(!modal) return;
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
  }

  // --- обновить слайд ---
  function updateSlide(id){
    const modal=document.getElementById(id);
    const imgEl=modal.querySelector('img#'+id+'-main');
    imgEl.src=slidesData[id][currentSlide[id]];
    modal.querySelectorAll('.product-gallery img').forEach((thumb,index)=>{
      thumb.classList.toggle('active',index===currentSlide[id]);
    });
  }

  // --- стрелки ---
  window.changeSlide=function(id,step){
    if(!slidesData[id]) return;
    currentSlide[id]=(currentSlide[id]+step+slidesData[id].length)%slidesData[id].length;
    updateSlide(id);
  }

  // --- миниатюры ---
  window.setSlide=function(id,index){
    if(!slidesData[id]) return;
    currentSlide[id]=index%slidesData[id].length;
    updateSlide(id);
  }

  // --- закрытие кликом вне ---
  window.onclick=function(e){
    if(e.target.classList.contains('modal')) closeModal(e.target.id);
  }

  // --- клавиши ---
  window.addEventListener('keydown',e=>{
    const openModalEl=document.querySelector('.modal.show');
    if(!openModalEl) return;
    const id=openModalEl.id;
    if(e.key==='ArrowLeft') changeSlide(id,-1);
    else if(e.key==='ArrowRight') changeSlide(id,1);
    else if(e.key==='Escape') closeModal(id);
  });

  // --- курсор для миниатюр ---
  document.querySelectorAll('.product-gallery img').forEach(img=>{
    img.style.cursor='pointer';
  });

});
