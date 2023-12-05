module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    const formattedDate = new Date(date).toLocaleDateString();
    return formattedDate;
  },

  equal: (x, y) => {
    return x === y;
  },

  ifCond: function (v1, v2, options) {
    console.log("hellooo", !v2)
    console.log('yoo', v1)
    if (v1 && !v2) {
      return options.fn(this);
    }
    return options.inverse(this);
    
  }
};

//used in singlePost.handlebars to see if post's user id matches the current user's id