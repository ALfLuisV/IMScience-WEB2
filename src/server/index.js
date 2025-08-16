import Api from './app/api/api.js'
import AuthController from './app/controllers/auth/authController.js'
import UserController from './app/controllers/user/userController.js'
import MemberController from './app/controllers/member/memberController.js';

function main() {
    const api = Api.build();
    
    // Configuração da API
    const HOST = 'localhost';
    const PORT = 7777;

    const authController = new AuthController();
    const userController = new UserController();
    const memberController = new MemberController();

    //*****************************LOGIN******************************************* */
    api.addPostRoute('/login', authController.authenticate.bind(authController), false);
    api.addGetRoute('/user/getUserInfo', userController.getUserData.bind(userController));
    api.addGetRoute('/user/checkLogin', userController.checkLogin.bind(userController));

    //*********************************CRUD MEMBROS**************************** */
    api.addPostRoute('/members/addMember', memberController.addMember.bind(memberController), true);
    api.addGetRoute('/members/getAllInternal', memberController.getInternalMember.bind(memberController));

    // Iniciar o servidor após configurar todas as rotas
    api.start(PORT, HOST);



    console.log(`API configurada para: http://${HOST}:${PORT}`);
    console.log(`Endpoint de login: http://${HOST}:${PORT}/login`);
}

main();