
var validateFormService = (function(){
  var validForm = [];
  validForm[0] = false;
  validForm[1] = false;
  validForm[2] = false;
  validForm[3] = false;
  validForm[4] = false;
  validForm[5] = false;
  validForm[6] = false;
  validForm[7] = false;


  var invalidButton = true;

  var buttonValidForm = function(){
    console.log(validForm)
    invalidButton = true;
    for(var i = 0; i < validForm.length; i++){
      if(validForm[i]==false){
        invalidButton = false;
      }
    }

    if(invalidButton){
      var buttonRegister = document.getElementsByClassName('js-validateForm')[0];
      buttonRegister.classList.remove('is-disabled');
      buttonRegister.classList.add('is-actived');
    }else{

      var buttonRegister = document.getElementsByClassName('js-validateForm')[0];
      buttonRegister.classList.remove('is-actived');
      buttonRegister.classList.add('is-disabled');
    }
  }

  return {

    removeMask: function(selector, action){
      var button = document.getElementsByClassName(selector)[0];
      button.addEventListener(action, function(){
        var valueCNPJ = document.getElementsByClassName('js-validateCNPJ')[0].value;
        valueCNPJ = valueCNPJ.replace(".", "");
        valueCNPJ = valueCNPJ.replace(".", "");
        valueCNPJ = valueCNPJ.replace("-", "");
        valueCNPJ = valueCNPJ.replace("/", "");
        document.getElementsByClassName('js-validateCNPJ')[0].value = valueCNPJ;
      });
    },

    validateName: function(selector, action){
      var valueName = document.querySelector(selector);
      valueName.addEventListener(action, function(){
        document.getElementById('errorName').style.display = "none";
        if (valueName.value == "") {
          document.getElementById('errorName').style.display = "";
          validForm[0] = false;
          buttonValidForm();
        }else{
          validForm[0] = true;
          buttonValidForm();
        }
      });
    },

    validateCNPJ: function(selector, action){
      var valueCNPJ = document.querySelector(selector);
      valueCNPJ.addEventListener(action, function(){
        VMasker(valueCNPJ).maskPattern("99.999.999/9999-99");

        document.getElementById('errorCNPJ').style.display = "";
        if(valueCNPJ.value == ""){
          document.getElementById('errorCNPJ').innerHTML = "Campo obrigatório!";
          validForm[1] = false;
          buttonValidForm();
        }else if (valueCNPJ.value.length<18) {
          document.getElementById('errorCNPJ').innerHTML = "CNPJ inválido!";
          console.log("cnpj invalido");
          validForm[1] = false;
          buttonValidForm();
        }else{
          document.getElementById('errorCNPJ').style.display = "none";
          validForm[1] = true;
          buttonValidForm();
        }
      });
    },


    validatePhone: function(selector, action){
      var valuePhone = document.querySelector(selector);
      valuePhone.addEventListener(action, function(){
        VMasker(valuePhone).maskPattern("(99)9999-9999");
        document.getElementById('errorPhone').style.display = "";
        if(valuePhone.value == ""){
          document.getElementById('errorPhone').innerHTML = "Campo obrigatório!";
          validForm[2] = false;
          buttonValidForm();
        }else if (valuePhone.value.length<13) {
          document.getElementById('errorPhone').innerHTML = "Telefone inválido!";
          validForm[2] = false;
          buttonValidForm();

        }else{
          document.getElementById('errorPhone').style.display = "none";
          validForm[2] = true;
          buttonValidForm();
        }
      });
    },


    validateEmail: function(selector, action){
      var valueEmail = document.querySelector(selector);
      valueEmail.addEventListener(action, function(){
        document.getElementById('errorEmail').style.display = "";
        var regexEmailValidate = /^([a-zA-Z0-9_\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        var emailValidate = regexEmailValidate.test(valueEmail.value.trim());
        document.getElementById('errorEmail').style.display = "";

        if (valueEmail.value == "") {
          document.getElementById('errorEmail').innerHTML = "Campo obrigatório!";
          validForm[3] = false;
          buttonValidForm();
        }
        if(!emailValidate && valueEmail.value != ""){
          document.getElementById('errorEmail').innerHTML = "e-mail inválido!";
          validForm[3] = false;
          buttonValidForm();
        }else if(emailValidate){
          document.getElementById('errorEmail').style.display = "none";
          validForm[3] = true;
          buttonValidForm();
        }
      });
    },


    validateAddress: function(selector, action){
      var valueAddress = document.querySelector(selector);
      valueAddress.addEventListener(action, function(){
        if (valueAddress.value == "") {
          document.getElementById('errorAddress').style.display = "";
          validForm[4] = false;
          buttonValidForm();
        }else{
          document.getElementById('errorAddress').style.display = "none";
          validForm[4] = true;
          buttonValidForm();
        }
      });
    },

    validateExtension: function(selector, action){
      var valueExtension = document.querySelector(selector);
      valueExtension.addEventListener(action, function(){
        VMasker(valueExtension).maskPattern("9999");
        if (valueExtension.value == "") {
          document.getElementById('errorExtension').style.display = "";
          validForm[5] = false;
          buttonValidForm();
        }else{
          document.getElementById('errorExtension').style.display = "none";
          validForm[5] = true;
          buttonValidForm();
        }
      });
    },

    validatePassword: function(selector, selectorConfirmation, action ){
      var valuePassword = document.querySelector(selector);
      var valuePasswordConfirmation = document.querySelector(selectorConfirmation);

      valuePassword.addEventListener(action, function(){
        document.getElementById('errorPassword').style.display = "";
        if(valuePassword.value.length > 0 && valuePassword.value.length < 6){
          document.getElementById('errorPassword').innerHTML = "Senha deve ter no minimo 6 digitos!";
          validForm[6] = false;
          buttonValidForm();
        }else if(valuePassword.value.length == 0){
          document.getElementById('errorPassword').innerHTML = "Campo obrigatório!";
          validForm[6] = false;
          buttonValidForm();
        }else{
          document.getElementById('errorPassword').style.display = "none";
          validForm[6] = true;
          buttonValidForm();
        }
      });

      valuePasswordConfirmation.addEventListener(action, function(){
        document.getElementById('errorPasswordConfirmation').style.display = "";

        if(valuePasswordConfirmation.value.length >= 0){
          if(valuePasswordConfirmation.value != valuePassword.value){
            document.getElementById('errorPasswordConfirmation').innerHTML = "Senhas não correspondem!";
            validForm[7] = false;
            buttonValidForm();
          }else{
            document.getElementById('errorPasswordConfirmation').style.display = "none";
            validForm[7] = true;
            buttonValidForm();
          }
        }

      });

    },

    validatePositiveNumber: function(){
      var inputNumber = document.getElementsByClassName('js-necessityInput');
      for(var i = 0; i < 8; i++){
        if(inputNumber[i].value < 0){
          alert("Por favor, utilize apenas números maiores que 0!");
          inputNumber[i].value = null;
        }
      }
    },

    validateEmptyInput: function(){
      var inputNumber = document.getElementsByClassName('js-necessityInput');
      var button = document.getElementsByClassName("js-nextButton")[0];
      for(var i = 0; i < 8; i++){
        if(inputNumber[i].value != 0){
          button.classList.add('is-actived');
          button.classList.remove('is-disabled');
          return true;
        }
      }
      button.classList.add('is-disabled');
      button.classList.remove('is-actived');
      return false;
    },

  }

})()
