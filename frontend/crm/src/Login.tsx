import { AuthProvider, PasswordInput } from "react-admin";

export const authProvider = ({
    // called when the user attempts to log in
    login: ({ username, password }: { username: string; password: string }) => {
        return new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest();
            const url = `${import.meta.env.VITE_API_URL}/login`
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    console.log("status: ", xhr.status)
                    if(xhr.status == 200){
                        const json = JSON.parse(xhr.responseText);
                        console.log('Response received: ', json);
                        localStorage.setItem('auth', JSON.stringify({...json}));
                        resolve(json);
                    } else{
                        console.error('Login failed: ', xhr.status, xhr,this.statusText);
                        reject(new Error("Inicio de sesión fallido"));
                    }
                }
            };

            const requestBody = JSON.stringify({"usuario": username, "contrasena": password});
            console.log('Request Body: ', requestBody);
            xhr.send(requestBody);
        });
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem("auth");
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem("auth");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem("auth")
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    
    getPermissions: ()=> {
        const auth = JSON.parse(localStorage.getItem("auth"));
        return (auth) ? Promise.resolve(auth.role) : Promise.reject();
    },
});
