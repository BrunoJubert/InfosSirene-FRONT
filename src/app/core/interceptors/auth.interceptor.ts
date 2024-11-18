import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const bearerToken = localStorage.getItem("bearerToken");
  const modifiedRequest = req.clone({ setHeaders: { Authorization: 'Bearer '+bearerToken } })
  // console.log('xxx intercept', bearerToken);
  if(bearerToken!=undefined && bearerToken!=null && bearerToken!=""){
    return next(modifiedRequest);
  }else{
    return next(req);
  }
};
