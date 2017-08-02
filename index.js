var MyForm = {
  validate: function() {
    var isValid = true;
    var errorFields = [];
    $.prototype.addClassError = function (reg) {
      if (!reg.test(this.val())) {
        this.addClass('error');
        isValid = false;
        errorFields.push(this.attr('name'));
      } else {
        this.removeClass('error');
      }
    };
    $.prototype.addClassErrorPhone = function (reg, number) {
      if (!reg.test(this.val())) {
        this.addClass('error');
        isValid = false;
        errorFields.push(this.attr('name'));
      } else {
        var str = this.val().replace(/[^0-9]/g, '');
        var summ = 0;
        for (var i = 0; i < 11; i++)
          summ += str[i] * 1;
        if (summ > number) {
          this.addClass('error');
          isValid = false;
          errorFields.push(this.attr('name'));
        } else {
          this.removeClass('error');
        }
      }
    };
    var regFio = /^[a-zа-яё\-]+(\s[a-zа-яё]+){2}$/i;
    var regEmail = /^\w([\.-_]?\w)*@(ya.ru|yandex.ru|yandex.ua|yandex.by|yandex.kz|yandex.com)$/;
    var regPhone = /^\+7\(\d{3}\)\d{3}(\-\d{2}){2}$/g;
    $('input[name="fio"]').addClassError(regFio);
    $('input[name="email"]').addClassError(regEmail);
    $('input[name="phone"]').addClassErrorPhone(regPhone, 30);
    return {isValid: isValid, errorFields: errorFields};
  },
  getData: function () {
    return {fio: $('input[name="fio"]').val(),
            email: $('input[name="email"]').val(),
            phone: $('input[name="phone"]').val() }
  },
  setData: function (Object) {
    $('input[name="fio"]').val(Object.fio);
    $('input[name="email"]').val(Object.email);
    $('input[name="phone"]').val(Object.phone);
  },
  submit: function() {
    var obj = this.validate();
    if (obj.isValid) {
      $.ajax({
        url: $('#myForm').attr('action'),
        type: $('#myForm').attr('method'),
        dataType: "html",
        data: $('#myForm').serialize(),
        success: function (response) {
          $("#resultContainer").addClass(response.status);
          switch (response.status) {
            case 'success':
              $('#resultContainer').text('Success');
              break;
            case 'error':
              $('#resultContainer').text(response.reason);
              break;
            case 'progress':
              setTimeout(submit(), response.timeout);
              break;
            default:
              break;
          }
        },
        error: function (response, exception) {
          alert(exception)
        }
      });
    }
  }
};
