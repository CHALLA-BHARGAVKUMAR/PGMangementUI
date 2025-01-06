import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

  if (token) {
    // Clone the request and add the authorization header
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  } else {
    return next(req);
  }
};
