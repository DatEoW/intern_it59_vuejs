export default class CustomError extends Error {
  constructor(options) {
    super(options.message || 'Đã xảy ra lỗi');
    this.details = options.errors || [];
  }
}




