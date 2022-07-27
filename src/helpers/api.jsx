const baseURL =
  process.env.NODE_ENV === "development"
    ? "https://api.antilorem.xyz"
    : "https://api.antilorem.xyz";
console.log(process.env);
export const api = {
  auth: {
    login: `${baseURL}/dj-rest-auth/login/`,
    register:`${baseURL}/dj-rest-auth/registration/`,
    logout: `${baseURL}/dj-rest-auth/logout/`
  },

  posts: {
    list: `${baseURL}/api/blog/posts/`,
    create: `${baseURL}/api/v1/post/`,
  },
};
