export default {
  required(val, name) {

    if (val === 0) {
      return;
    }
    return val => !!val || `${name} bắt buộc`;
  },
  email(val) {
    return val => /.+@.+\..+/.test(val) || "Định dạng email không chính xác";
  },
  validTime(time) {
    const from = new Date(time.dateFrom + " " + time.timeFrom + ":00")
    const to = new Date(time.dateTo + " " + time.timeTo + ":00")
    return from < to || "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc";
  },

  min(val, name, max) {
    return (
      (val || "") < parseInt(max) || `${name} should be less than max`
    );
  },
  max(val, name, min) {
    return (val || "") > parseInt(min) || `${name} should be greater than min`;
  },

  fileSize(val, name, size) {
    var converSize = size * 1024000; // convert to MB
    return val =>
      !val ||
      val.size < converSize ||
      `${name} size should be less than ${size} MB!`;
  },

  phoneNumber(val) {
    return val =>
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val) ||
      "Phone number must be valid";
  },

  rangeNumber(val, name, min, max) {
    return val => /^[1][1-9]$|^[2][0-0]$/.test(val) || `${name} must be from ${min} to ${max}`
  },

  password(val) {
    return val => /^(?=.*\d)[a-zA-Z0-9]{8,}$/.test(val) || "パスワードは最低8桁の英数字のみ入力可能です。";
  },
  repass(password, repass) {
    return password === repass || "Re password not matched!"
  },

  requiredArray(val, name) {
    return val => val.length > 0 || `${name} bắt buộc`;
  }
};
