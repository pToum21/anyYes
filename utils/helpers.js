module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    const formattedDate = new Date(date).toLocaleDateString();
    return formattedDate;
  },

  equal: (x, y) => {
    return x === y;
  },

  ifCond: function (logged_in, sold, user_id1, user_id2, options) {
    if (!logged_in || sold || user_id1 === user_id2) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  }

};


//used in singlePost.handlebars to see if post's user id matches the current user's id