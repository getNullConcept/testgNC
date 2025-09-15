document.addEventListener('DOMContentLoaded', ()=>{
  // Год
  document.getElementById('year').textContent = new Date().getFullYear();

  // Меню
  const menuBtn=document.querySelector('.menu-btn');
  const nav=document.querySelector('.nav');
  menuBtn.addEventListener('click',()=>{
    const expanded=menuBtn.getAttribute('aria-expanded')==='true';
    menuBtn.setAttribute('aria-expanded',(!expanded).toString());
    nav.style.display=expanded?'none':'flex';
  });

  // Корзина
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
      total+=price;cartTotal.textContent=total;
      row.querySelector('.remove').addEventListener('click',()=>{
        row.remove();total-=price;cartTotal.textContent=total;
      });
    });
  });

  // Модалки и слайдер
  const currentSlide={};
  const slidesData={};

  document.querySelectorAll('.slider-wrapper').forEach(wrapper=>{
    const modalId=wrapper.closest('.modal').id;
    slidesData[modalId]=Array.from(wrapper.querySelectorAll('img'));
    currentSlide[modalId]=0;
  });

  window.openModal=function(id){
    const modal=document.getElementById(id);
    if(!modal) return;
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    currentSlide[id]=0;
    updateSlide(id);
  }

  window.closeModal=function(id){
    const modal=document.getElementById(id);
    if(!modal) return;
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
  }

  function updateSlide(id){
    const wrapper=document.getElementById(id).querySelector('.slider-wrapper');
    wrapper.style.transform=`translateX(-${currentSlide[id]*100}%)`;
    document.getElementById(id).querySelectorAll('.product-gallery img').forEach((thumb,index)=>{
      thumb.classList.toggle('active', index===currentSlide[id]);
    });
  }

  window.changeSlide=function(id,step){
    if(!slidesData[id]) return;
    currentSlide[id]=(currentSlide[id]+step+slidesData[id].length)%slidesData[id].length;
    updateSlide(id);
  }

  window.setSlide=function(id,index){
    if(!slidesData[id]) return;
    currentSlide[id]=index%slidesData[id].length;
    updateSlide(id);
  }

  window.onclick=function(e){
    if(e.target.classList.contains('modal')) closeModal(e.target.id);
  }

  window.addEventListener('keydown',e=>{
    const openModalEl=document.querySelector('.modal.show');
    if(!openModalEl) return;
    const id=openModalEl.id;
    if(e.key==='ArrowLeft') changeSlide(id,-1);
    else if(e.key==='ArrowRight') changeSlide(id,1);
    else if(e.key==='Escape') closeModal(id);
  });
});
