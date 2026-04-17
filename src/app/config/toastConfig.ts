const toastBaseConfig = {
  timeOut: 3000,
  progressBar: true,
  closeButton: true,
  newestOnTop: true,
  positionClass: 'toast-top-right',
};

// حالة الـ Success بلون أخضر وحجم معين
const successConfig = {
  ...toastBaseConfig, // جيب كل اللي فوق
  toastClass: 'ngx-toastr !bg-primary', // غير بس الكلاس
};

// حالة الـ Error بلون أحمر ووقت أطول
const errorConfig = {
  ...toastBaseConfig,
  timeOut: 8000, // هنا بنغير الوقت مخصوص للـ Error
  toastClass: 'ngx-toastr !bg-danger',
};

export const toastConfig = {
  successConfig,
  errorConfig,
};
