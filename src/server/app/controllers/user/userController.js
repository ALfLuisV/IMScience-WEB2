import UserService from '../../services/user/uservService.js';
import UserRepository from '../../repositories/user/userRepository.js';


const userRepository = new UserRepository();
const userService = new UserService(userRepository);

class UserController {
    async getUserData(req, res) {
        console.log("chegou no controller")
        let userUid = req.user.uid;
        try {
            let userData = await userService.getUserData(userUid)

            res.status(200).json({
                success: true,
                message: 'Busca realizada com sucesso',
                userData: userData,
            });
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            res.status(400).json({
                success: false,
                message: 'Falha na busca',
                error: error.message
            });
        }
    }


    async setRememberMeToken(uid, tokenHash) {
        try {
            let token = await userService.setRememberMeToken(uid, tokenHash);
            return token;
        } catch (error) {
            console.log("Erro ao gerar token hash" + error);
        }
    }

    async getRememberMeTokenByHash(hash) {
        try {
            let rememberMeCookie = await userService.getRememberMeTokenByHash(hash);
            return rememberMeCookie;
        } catch (error) {
            console.log("Erro ao obter cookie" + error);
        }
    }

    async checkLogin(req, res){
        res.status(200).json({
        success: false,
        message: 'Logado',
      });
    }
    
}

export default UserController;