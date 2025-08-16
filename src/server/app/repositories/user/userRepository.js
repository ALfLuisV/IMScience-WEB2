import { User } from "../../entities/user.js";
import { PrismaClient } from '../../../generated/prisma/index.js'

const prisma = new PrismaClient()

// utilizado para realizar operações junto ao banco de dados
class UserRepository {

    async findByfirebaseId(userUid) {
        console.log("chegou no repository")
        try {
            const user = await prisma.users.findUnique({
                where: {
                    uid: userUid,
                },
            })

            return user;
        } catch (error) {
            console.log("Erro ao buscar dados do usuário" + error);
        }
    }

    async setRememberMeToken(userUid, tokenHash) {
        try {
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 200);

            const hashToken = await prisma.remembermetoken.create({
                data: {
                    uid: userUid,
                    hashtoken: tokenHash,
                    expirationdate: expiresAt
                }
            })

            return hashToken;
        } catch (e) {
            console.log("Erro ao setar hash no banco" + e);
        }
    }

    async getRememberMeTokenByHash(hash) {
        try {
            let rememberMeCookie = await prisma.remembermetoken.findMany({
                where: {
                    hashtoken: hash,
                },
            });

            return rememberMeCookie;
        } catch (error) {
            console.log("Erro ao obter cookie" + error);
        }
    }

    async deleteRememberMeToken(hash, uid) {
        try {
            const deleteUser = await prisma.remembermetoken.delete({
                where: {
                    uid: uid,
                    hashtoken: hash,
                },
            })
        } catch (error) {
            console.log("Erro ao excluir hash" + error);
        }
    }
};

export default UserRepository;