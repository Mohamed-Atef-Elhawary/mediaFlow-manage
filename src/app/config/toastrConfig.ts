const toastrBaseConfig = {
  timeOut: 3000,
  progressBar: true,
  closeButton: true,
  newestOnTop: true,
  positionClass: 'toast-top-right',
};

const successConfig = {
  ...toastrBaseConfig,
  toastClass: 'ngx-toastr !bg-primary',
};

const errorConfig = {
  ...toastrBaseConfig,
  timeOut: 8000,
  toastClass: 'ngx-toastr !bg-danger',
};

export const toastrConfig = {
  successConfig,
  errorConfig,
};
