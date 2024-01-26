import { Injectable, inject } from "@angular/core";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private readonly userKey = 'currentUser';
    isLogged: Boolean = false;
    userService: UserService = inject(UserService);

    login(username: string, password: string){
        let user = this.userService.users.find((u) => u.username === username 
                                                    && u.password === password);
        if(user === undefined)
            this.isLogged = false;
        else
            localStorage.setItem(this.userKey, JSON.stringify(user));
            this.isLogged = true;
        return user;
    }

    logout(){
        localStorage.removeItem(this.userKey);
        this.isLogged = false;
    }

    IsAuthenticated(){
        return this.isLogged;
    }
}