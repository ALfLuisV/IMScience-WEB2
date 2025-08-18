import auth from '../../Auth/firebaseConfig.js';
import admin from 'firebase-admin';
import crypto from 'crypto';
import UserController from '../user/userController.js'
import serviceAccount from '../../../config/service-account-key-template.json' with { type: "json" };

const userController = new UserController();
const PROJECT_ID = "imscience-1c1f2";


class AuthController {

    async authenticate(req, res) {
        const { token, rememberMe } = req.body;

        try {
            // Verifica o token ID
            let verification = await auth.verifyIdToken(token);
            console.log('Token verificado com sucesso:', verification.uid);

            // Cria o cookie de sessão
            let sessionCookie = await this.createHttpCookie(token);
            console.log('Cookie de sessão criado com sucesso');

            // Define o cookie no cabeçalho da resposta
            res.cookie('sessionCookie', sessionCookie, {
                maxAge: 0.5 * 60 * 1000, // 15 minutos
                httpOnly: true, // Segurança: não acessível via JavaScript
                secure: true, // true em produção com HTTPS
                sameSite: 'None'
            });

            let tokenHash = null;

            if (rememberMe) {
                let rememberMeToken = crypto.randomBytes(32).toString('hex');
                let rememberMetTokenHash = crypto.createHash('sha256').update(rememberMeToken).digest('hex');
                try {
                    tokenHash = await userController.setRememberMeToken(verification.uid, rememberMetTokenHash);
                    if (tokenHash) {
                        res.cookie('rememberMeCookie', tokenHash, {
                            maxAge: tokenHash.expirationdate,
                            httpOnly: true, // Segurança: não acessível via JavaScript
                            secure: true, // true em produção com HTTPS
                            sameSite: 'None'
                        });
                    }
                } catch (error) {
                    console.error('Erro ao criar token:', error);
                    res.status(400).json({
                        success: false,
                        message: 'Falha na busca',
                        error: error.message
                    });
                }
            }

            // Retorna sucesso
            res.status(200).json({
                success: true,
                message: 'Autenticação realizada com sucesso',
                uid: verification.uid,
                email: verification.email,
                name: verification.name || verification.display_name,
                token: tokenHash
            });

        } catch (e) {
            console.error('Erro na autenticação:', e);
            res.status(401).json({
                success: false,
                message: 'Falha na autenticação',
                error: e.message
            });
        }
    }


    async createHttpCookie(token, uidToken = false) {
        let expirationTime = 30 * 60 * 1000;

        try {
            if (uidToken) { //é um cookie utilizado em estrategia de remember me

                if (!admin.apps.length) {
                    admin.initializeApp({
                        credential: admin.credential.cert(serviceAccount),
                        projectId: PROJECT_ID
                    });
                }

                const customToken = await admin.auth().createCustomToken(token);

                const apiKey = process.env.FIREBASE_WEB_API_KEY // Sua chave de API da Web do Firebase
                console.log(apiKey)
                const firebaseAuthUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`;

                const response = await fetch(firebaseAuthUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: customToken,
                        returnSecureToken: true
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error('Failed to exchange custom token for ID token: ' + data.error.message);
                }

                const idToken = data.idToken


                let firebaseSessionCookie = await admin.auth().createSessionCookie(idToken, {
                    expiresIn: expirationTime
                });
                return firebaseSessionCookie;
            }

            let firebaseSessionCookie = await auth.createSessionCookie(token, {
                expiresIn: expirationTime
            });
            return firebaseSessionCookie;
        } catch (error) {
            console.error('Erro ao criar cookie de sessão:', error);
            throw error;
        }
    }
}


export default AuthController;