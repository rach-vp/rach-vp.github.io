// População dos campos de data de nascimento
const birthDaySelect = document.querySelector('#birth-day');
const birthMonthSelect = document.querySelector('#birth-month');
const birthYearSelect = document.querySelector('#birth-year');

function createDays() {
  for (let index = 1; index <= 31; index += 1) {
    const newDayOption = document.createElement('option');
    newDayOption.innerText = index.toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping: false});
    newDayOption.value = index;
    birthDaySelect.appendChild(newDayOption);
  }
}

function createMonths() {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  for (let index = 0; index < months.length; index += 1) {
    const newMonthOption = document.createElement('option');
    newMonthOption.innerText = months[index];
    newMonthOption.value = months[index];
    birthMonthSelect.appendChild(newMonthOption);
  }
}

function createYears() {
  for (let index = 2021; index >= 1905; index -= 1) {
    const newYearOption = document.createElement('option');
    newYearOption.innerText = index;
    newYearOption.value = index;
    birthYearSelect.appendChild(newYearOption);
  }
}

createDays();
createMonths();
createYears();

// Alert com email
function showAlert() {
  const buttonLogin = document.querySelector('#button-login');
  buttonLogin.addEventListener('click', function () {
    const caixaEmailTelefone = document.querySelector('#user-email-phone');
    alert(caixaEmailTelefone.value);
  });
}

showAlert();

// Verificação de campos vazios
function isTextInputEmpty() {
  const textInputs = document.querySelectorAll('.right-content input[type=text]');
  let isEmpty = false;
  for (let index = 0; index < textInputs.length; index += 1) {
    if (textInputs[index].value.trim() === '') {
      isEmpty = true;
      break;
    }
  }
  return isEmpty;
}

function isPasswordInputEmpty() {
  const passwordInput = document.querySelector('.right-content input[type=password]');
  let isEmpty = false;
  if (passwordInput.value.trim() === '') {
    isEmpty = true;
  }
  return isEmpty;
}

function isGenderInputChecked() {
  const genderInputs = document.querySelectorAll('.right-content input[type=radio]');
  let isChecked = false;
  for (let index = 0; index < genderInputs.length; index += 1) {
    if (genderInputs[index].checked) {
      isChecked = true;
      break;
    }
  }
  return isChecked;
}

// População de itens
function createHelloUserElement() {
  const userFirstName = document.querySelector('#firstname').value;
  const userLastName = document.querySelector('#lastname').value;
  const helloPhrase = `Olá, ${userFirstName} ${userLastName}`;
  return helloPhrase;
}

function clearContainer(container) {
  while (container.childElementCount > 0) {
    container.removeChild(container.lastChild);
  }
}

function createNewPContent(input) {
  // const newP = document.createElement('p');
  let newP;
  if (input.type === 'text') {
    // newP.innerText = input.value;
    newP = input.value;
  } else if (input.type === 'radio' && input.checked) {
    // newP.innerText = input.value;
    newP = input.value;
  }
  return newP;
}

function getFieldsContent() {
  const formInfo = [createHelloUserElement()];
  const inputs = document.querySelectorAll('.right-content input');
  for (let index = 2; index < inputs.length; index += 1) {
    const input = inputs[index];
    formInfo.push(createNewPContent(input));
  }
  return formInfo;
}

function showUserData() {
  const fieldsContent = getFieldsContent();
  const rightContainer = document.querySelector('.right-content');
  clearContainer(rightContainer);
  const newFieldsContent = fieldsContent.join(' ');
  rightContainer.innerText = newFieldsContent;
}

function checkFields() {
  const signUpButton = document.querySelector('#facebook-register');
  signUpButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (isTextInputEmpty() || isPasswordInputEmpty() || !isGenderInputChecked()) {
      if (!document.querySelector('.form-alert')) {
        const signUpForm = document.querySelector('.signup-form');
        const alertText = document.createElement('p');
        alertText.innerText = 'Campos inválidos';
        alertText.className = 'form-alert';
        signUpForm.prepend(alertText);
      }
    } else {
      showUserData();
    }
  });
}

checkFields();

// Adicionar/remover input de gênero personalizado
function removeInputBox() {
  if (document.querySelector('#custom-gender')) {
    const signUpForm = document.querySelector('.signup-form');
    const customGenderInput = document.querySelector('#custom-gender');
    signUpForm.removeChild(customGenderInput);
  }
}

function addInputBox() {
  if (!document.querySelector('#custom-gender')) {
    const signUpForm = document.querySelector('.signup-form');
    const customGenderInput = document.createElement('input');
    customGenderInput.type = 'text';
    customGenderInput.name = 'gender-custom';
    customGenderInput.placeholder = 'Gênero (opcional)';
    customGenderInput.id = 'custom-gender';
    signUpForm.insertBefore(customGenderInput, signUpForm.lastElementChild);
  }
}

function addOrRemoveCustomGenderInput() {
  const genderRadioButtons = document.querySelectorAll('.right-content input[type=radio]');
  for (let index = 0; index < genderRadioButtons.length; index += 1) {
    genderRadioButtons[index].addEventListener('change', function (event) {
      if (event.target.id === 'custom') {
        addInputBox();
      } else {
        removeInputBox();
      }
    });
  }
}

addOrRemoveCustomGenderInput();
