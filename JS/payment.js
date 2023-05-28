const submitBtn = document.getElementById('submit-bayar');
var selectedBank = null;

let bankTerpilih = "";
submitBtn.disabled= true;
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
    submitBtn.disabled= false;
    submitBtn.addEventListener('click', makePayment);
  } else {
    submitBtn.disabled= true;
    submitBtn.removeEventListener('click', makePayment);
  }

}

function makePayment(){
    console.log("clicked")
    submitBtn.innerHTML = '<div class="loader"></div>';
    submitBtn.disabled= true;
    setTimeout(() => {
        
        submitBtn.disabled= false;
        submitBtn.innerHTML = 'Ceritanya udah kebayar';
    }, 3000);
}