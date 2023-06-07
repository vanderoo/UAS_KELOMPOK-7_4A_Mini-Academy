const submitBtn = document.getElementById('submit-bayar');


var selectedBank = null;

let bankTerpilih = "";
submitBtn.disabled = true;
function selectBank(index) {
  var banks = document.getElementsByClassName('bank');
  for (var i = 0; i < banks.length; i++) {
    banks[i].classList.remove('selected');
    banks[i].querySelector('.checkmark').style.display = 'none';
  }

  var selectedBankElement = banks[index];
  selectedBankElement.classList.add('selected');
  selectedBankElement.querySelector('.checkmark').style.display = 'block';

  switch (index) {
    case 0:
      bankTerpilih = "BCA";
      break;
    case 1:
      bankTerpilih = "BNI";
      break;
    case 2:
      bankTerpilih = "PERMATA";
      break;

    default:
      bankTerpilih = "";
      break;
  }

  console.log(bankTerpilih);
  console.log(bankTerpilih);

  if (bankTerpilih != "") {
    submitBtn.disabled = false;
    submitBtn.addEventListener('click', makePayment);
  } else {
    submitBtn.disabled = true;
    submitBtn.removeEventListener('click', makePayment);
  }

}

function makePayment() {
  console.log("clicked")
  submitBtn.innerHTML = '<div class="loader"></div>';
  submitBtn.disabled = true;


  checkoutCart();
  
  setTimeout(() => {

    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Ceritanya udah kebayar';
  }, 3000);
}
function checkoutCart(){
  let cartData;
  fetch('http://127.0.0.1:3333/payment/cart')
      .then(response => response.json())
      .then(data => {
        cartData = data;
        console.log(cartData);
        const payloadItems = cartData.map(item => ({
          id: item.id_kelas.toString(),
          price: item.kelas.harga,
          quantity: 1,
          nama: item.kelas.nama
        }));
        console.log(payloadItems);
    
        fetch('http://127.0.0.1:3333/payment/charge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payloads)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            
          })
          .catch(error => {
            console.log(error);
            
          });
    
      })
      .catch(error => {
        console.log(error);
    
      });
}

  