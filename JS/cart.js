const totalHarga = document.getElementById('total-harga');
//const namaKelas = document.getElementById('course-title');
//const namaPengajar = document.getElementById('instructor-name');
//const hargaKelas = document.getElementById('course-amount');
const gambarKelas = document.getElementById('gambar-kelas');
const hapusCartItem = document.getElementById('delete-course');
const cartTemplate = document.getElementById('cart-item-template');
const courseCartContainer = document.querySelector('.course-container')
const btnCo = document.querySelector('.btn-co');

function deleteCart(event){
    event.preventDefault();

    const idCartItem = this.closest('.cart-item').dataset.idcart;
    
    fetch(`http://127.0.0.1:3333/payment/cart/${idCartItem}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Gagal menghapus data cart');
          }
        })
        .then(data => {
          console.log(data.message);
          window.location.reload(); 
        })
        .catch(error => {
          console.error(error);
        });
}

function addCart(){
    fetch('http://127.0.0.1:3333/payment/cart')
    .then(response => response.json())
    .then(cartItems => {
        let total = 0;
        cartItems.forEach(cartItem => {
            const cart = cartTemplate.content.cloneNode(true);

            cart.querySelector('.cart-item').setAttribute('data-idCart', cartItem.id);

            cart.querySelector('#course-title').textContent = cartItem.kelas.nama;
            cart.querySelector('#instructor-name').textContent = `Oleh ${cartItem.kelas.pengajar.nama}`;
            total += parseInt(cartItem.kelas.harga);
            cart.querySelector('#course-amount').textContent = `RP. ${parseInt(cartItem.kelas.harga).toLocaleString('id-ID')}`;
            courseCartContainer.appendChild(cart);
        });
        totalHarga.textContent = `RP.\t${total.toLocaleString('id-ID')}`;
        const hapusCart = document.querySelectorAll('.cart-item');
        hapusCart.forEach(hapus => {
            hapus.addEventListener('click', deleteCart);
        }); 
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
}
addCart();

btnCo.addEventListener('click', () => {
  window.location.href = '../Pelajar/payment.html?via=cart'
});
