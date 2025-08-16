export class User {
    constructor(id, name, email, role,) {
        this.idFirebase = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    create(id, name, email, role) {
        return new User(id, name, email, role);
    }

    changeCredentials(name, email){
       this.email = email;
       this.name = name; 
    }

    changeRole(newRole){
        this.role = newRole;
    }

    getIdFirebase() {
        return this.idFirebase;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return this.role;
    }
}