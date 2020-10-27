module.exports = {
  success: (res, data, message) => {
    const responseData = {
      status_code: 200,
      status_message: message || 'Success',
      ...data,
    };

    res.json(responseData);
    res.end();
  },

  failed: (res, message, errorCode) => {
    const responseData = {
      status_code: errorCode || 500,
      status_message: message || 'Internal Server Error',
    };
    res.json(responseData);
    res.end();
  },
};
