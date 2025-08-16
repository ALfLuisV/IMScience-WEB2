import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';
import express from 'express';
import serviceAccount from '../../config/service-account-key-template.json' assert { type: "json" }
import cookieParser from 'cookie-parser';
import AuthController from '../controllers/auth/authController.js';
import UserService from '../services/user/uservService.js';
import UserRepository from '../repositories/user/userRepository.js';
import crypto from 'crypto';



const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const PROJECT_ID = "imscience-1c1f2";
const authController = new AuthController();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: PROJECT_ID
  });
}


const app = express();
app.use(cookieParser());

async function checkAuth(req, res, next) {
  

  const { sessionCookie, rememberMeCookie } = req.cookies || '';

  console.log(req.cookies);

  if (!sessionCookie || sessionCookie === '' || Object.keys(sessionCookie).length === 0) {

    console.log("cookie de sessão inexistente");

    if (!rememberMeCookie) return res.status(401).send('Unauthorized: No session cookie provided.');

    let rememberMeHash = rememberMeCookie.hashtoken;
    let rememberCookie = await userService.getRememberMeTokenByHash(rememberMeHash);

    if (!rememberCookie) return res.status(401).send('Unauthorized: No session cookie provided.');
    console.log(rememberCookie);

    let newSessionCookie = await authController.createHttpCookie(rememberCookie[0].uid, true);

    res.cookie('sessionCookie', newSessionCookie, {
      maxAge: 30 * 60 * 1000, 
      httpOnly: true, // Segurança: não acessível via JavaScript
      secure: true, // true em produção com HTTPS
      sameSite: 'None'
    });

    userService.deleteRememberMeToken(rememberMeHash, rememberCookie[0].uid);

    let rememberMeToken = crypto.randomBytes(32).toString('hex');
    let rememberMetTokenHash = crypto.createHash('sha256').update(rememberMeToken).digest('hex');

    try {

      let tokenHash = await userService.setRememberMeToken(rememberCookie[0].uid, rememberMetTokenHash);
      res.cookie('rememberMeCookie', tokenHash, {
        maxAge: tokenHash.expirationdate,
        httpOnly: true, // Segurança: não acessível via JavaScript
        secure: true, // true em produção com HTTPS
        sameSite: 'None'
      });

    } catch (error) {
      console.error('Erro ao criar token:', error);
      res.status(400).json({
        success: false,
        message: 'Falha na busca',
        error: error.message
      });
    }

    const decodedClaims = await admin.auth().verifySessionCookie(newSessionCookie, true);
    req.user = decodedClaims;
    return next();
  }

  try {
    // 2. Verifica o cookie de sessão usando o Admin SDK.
    // O segundo parâmetro `true` força a verificação de revogação do token.
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);

    // 3. O cookie é válido! Anexa os dados do usuário na requisição.
    // O objeto decodedClaims contém uid, email, etc.
    req.user = decodedClaims;
    // 4. Passa para a próxima função (o controller da sua rota)
    next();
  } catch (error) {
    // O cookie é inválido (expirado, revogado, malformado, etc.)
    console.error('Error verifying session cookie:', error);
    return res.status(403).send('Forbidden: Invalid session cookie.');
  }
}


export { checkAuth };


