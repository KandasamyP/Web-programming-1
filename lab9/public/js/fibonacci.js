let myForm = document.getElementById('fibonacciForm');
let textInput = document.getElementById('fibNo');
let myUl = document.getElementById('results');
let errorDiv = document.getElementById('error');


if (myForm) {
  myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (textInput.value) {
      errorDiv.hidden = true;
      let li = document.createElement('li');

      let val1 = 0;
      let val2 = 1;
      let result = 0;
      let isPrime = true;
      if (textInput.value == 1)
        result = 1;

      for (let i = 1; i < textInput.value; i++) {
          result = val1 + val2;
          val1 = val2;
          val2 = result;          
      }

      for (let i = 2; i < result; i++) {
        if (result % i == 0) {
          isPrime = false;
          break;
        }
      }

      if (isPrime)
        li.classList.add("is-prime");
      else
        li.classList.add("not-prime");
      
      li.innerHTML = "The Fibonacci of " + textInput.value + " is " + result + ".";

      myUl.appendChild(li);
      myForm.reset();
      textInput.focus();
    } else {
      textInput.value = '';
      errorDiv.hidden = false;
      errorDiv.innerHTML = 'ERROR: You must enter a value';
    //  frmLabel.className = 'error';
      textInput.focus();
     // textInput.className = 'inputClass';
    }
  });
}

console.log("hi");