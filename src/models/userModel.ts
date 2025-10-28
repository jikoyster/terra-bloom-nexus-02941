// src/models/userModel.ts
export const UserModel = {
  saveUser: (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser: () => {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  },

  clearUser: () => {
    localStorage.removeItem('user');
  },
};
