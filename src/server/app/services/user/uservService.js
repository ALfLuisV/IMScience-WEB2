import { User } from "../../entities/user.js";


//utilizado para implementaão das regras de negócio da aplicação
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getUserData(userUid) {
        console.log("chegou no service")
        try {
            let userData = await this.userRepository.findByfirebaseId(userUid);
            return userData;
        } catch (error) {
            console.lo("erro ao buscar usuario" + error);
        }
    }

    async setRememberMeToken(uid, hash){
        try {
            let hashToken = await this.userRepository.setRememberMeToken(uid, hash);
            return hashToken
        } catch (error) {
           console.log("erro ao setar hash no bd (service)" + error); 
        }
    }

    async getRememberMeTokenByHash(hash) {
        try {
            let rememberMeCookie = await this.userRepository.getRememberMeTokenByHash(hash);
            return rememberMeCookie;
        } catch (error) {
            console.log("Erro ao obter cookie" + error);
        }
    }
    
    async deleteRememberMeToken(hash, uid) {
        try {
            const deleteUser = await this.userRepository.deleteRememberMeToken(hash, uid);
        } catch (error) {
            console.log("Erro ao excluir hash" + error);
        }
    }
}



export default UserService;


