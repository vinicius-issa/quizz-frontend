const TOKEN = process.env.REACT_APP_TOKEN
export const isAuthenticated = () => localStorage.getItem(TOKEN) !== null;
export const getToken = () => localStorage.getItem(TOKEN);
export const login = (token,user) => {
    localStorage.setItem(TOKEN,token);
    setUser(user);
}
export const logout = () =>{
    localStorage.removeItem(TOKEN);
    localStorage.removeItem('username');
}
export const setUser = username =>{
    localStorage.setItem('username',username);
}

export const getUser = () =>{
    return localStorage.getItem('username');
}