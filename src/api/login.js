// import { fetchPostLogin } from './utils.js';

export const login = ({ email, password }) => {
  if (email === 'hdrale@gmail.com' && password === '123') {
    return {
      token: '1Hke5wPTdUFQ1R2GZod_Th7i1yY4_im2uwpuPf44gzQ0',
    };
  }
  return new Error();

  // const bodyObject = {
  //   email,
  //   password,
  // };
  // return fetchPostLogin('login', bodyObject).then(data => {
  //   return {
  //     token: data.access_token,
  //   };
  // });
};

export const signup = ({ email, password }) => {
  if (email === 'hdrale@gmail.com' && password === '123') {
    return '1Hke5wPTdUFQ1R2GZod_Th7i1yY4_im2uwpuPf44gzQ0';
  }
  return new Error();
};

// export const signup = ({ email, password }) => {
//   const bodyObject = {
//     email,
//     password,
//   };
//   return fetchPostLogin('registration/brand_sign_up', bodyObject).then(data => {
//     return {
//       token: data.token,
//     };
//   });
// };

export default login;
