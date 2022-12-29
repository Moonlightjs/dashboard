export default {

  defaultString(val) {
    return !val ? "" : val;
  },

  isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  },

  defaultNumber(val) {
    return !val ? 0 : parseInt(val);
  },

  getYear(date) {
    return new Date(date).getFullYear();
  },

  getMonth(date) {
    return new Date(date).getMonth() + 1;
  },

  getDay(date) {
    return new Date(date).getDate();
  },

  /*
   @input: date: yyyy-mm-dd
   @output: {
      date: yyyy-mm-dd 00:00:00
   }
 */
  convertDateToTz(date) {
    var date = new Date(date);
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  },

  /*
    @input: date: yyyy-mm-dd
    @output: {
       date: yyyy/mm/dd
    }
  */
  formatDate(date) {
    if (!date) return null;

    const [year, month, day] = date.split("-");
    return `${year}/${month}/${day}`;
  },
  /*
    @input: date: yyyy/mm/dd
    @output: {
       date: yyyy-mm-dd
    }
  */
  parseDate(date) {
    if (!date) return null;

    const [month, day, year] = date.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  },

  /*
    @input: datetime
    @output: {
       date: yyyy/mm/dd
    }
  */
  convertTzTo(date, showTime = false, format = '/') {
    if (date) {
      var d = new Date(date);
      var month = '' + (d.getMonth() + 1);
      var day = '' + d.getDate();
      var year = d.getFullYear();
      var hour = d.getHours().toString();
      var min = d.getMinutes().toString();
      var milis = "00";
      if (month.length < 2)
        var month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      if (hour.length < 2)
        var hour = '0' + hour;
      if (min.length < 2)
        min = '0' + min;

      return !showTime ? [year, month, day].join(format) : [year, month, day].join(format) + " " + [hour, min, milis].join(':')
    }
    return "";
  },

  incrementDate(date, incrementor) {
    var parts = date.split("-");
    var dateTime = new Date(
      parseInt(parts[0], 10),      // year
      parseInt(parts[1], 10) - 1,  // month (starts with 0)
      parseInt(parts[2], 10)       // day
    );
    dateTime.setTime(dateTime.getTime() + incrementor * 86400000);
    parts[0] = "" + dateTime.getFullYear(); // year

    parts[1] = "" + (dateTime.getMonth() + 1); // month
    if (parts[1].length < 2) {
      parts[1] = "0" + parts[1];
    }

    parts[2] = "" + dateTime.getDate(); // day
    if (parts[2].length < 2) {
      parts[2] = "0" + parts[2];
    }
    return parts.join("-");
  },

  /*
    @input: Number, Number
    @output: {
      offset: Number
    }
  */
  calcPagination(currentPage, itemsPerPage) {
    var offset;
    if (currentPage == 1) {
      offset = 0;
    } else {
      offset = (currentPage - 1) * itemsPerPage;
    }
    return { offset }
  },

  getPageCounts(total, take) {
    let mid = total / take
    if (mid < 1) {
      return 1;
    }
    let pageCounts = Number.isInteger(mid) ? mid : (Math.ceil(mid))
    return pageCounts
  },

  /*
    @input: Number, Number, Number
    @output: {
      offset: Number
    }
  */
  showIndex(index, page, itemsPerPage) {

    index++
    if (page === 1) {
      return index
    }

    return index + ((page - 1) * itemsPerPage)
  },

  /*
    @input: error: Array
    @output: JSON
  */
  getError(error) {
    const errors = error.response
    return errors
  },

  /*
    @input: ArrayList
    @output: Array
  */
  getLastItem(array) {
    return array[array.length - 1]
  },

  getStatusContract(endDate) {
    if (!endDate) {
      return "";
    }

    let now = new Date();
    let end = new Date(endDate);
    if (end > now) {
      return "UNEXPIRED";
      // end.setDate(end.getDate() - 7);

      // if(end > now)
      // {
      //   return "UNEXPIRED";
      // }
      // return "ABOUT_EXPIRE";
    } else {
      return "EXPIRED";
    }
  },

  toLowerCaseNonAccentVietnamese(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  },

  // This function keeps the casing unchanged for str, then perform the conversion
  toNonAccentVietnamese(str) {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  }
};
