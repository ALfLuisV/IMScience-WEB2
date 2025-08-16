import { PrismaClient } from '../../../generated/prisma/index.js'

const prisma = new PrismaClient()

class MemberRepository {

    async addMember(member) {
        try {
            const newMember = await prisma.members.create({
                data: {
                    name: member.name,
                    position: member.position,
                    description: member.description,
                    profile_pic: member.profile_pic
                },
            })

            return newMember;
        } catch (error) {
            console.log("Erro ao cadastrar usuário" + error);
        }
    }

    async addExternalMember(member) {
        console.log(member)
        try {
            const newMember = await prisma.external_members.create({
                data: {
                    name: member.name,
                    cpf: member.cpf,
                    country: member.country,
                    institution: member.institution,
                    description: member.description,
                },
            })

            return newMember;
        } catch (error) {
            console.log("Erro ao cadastrar usuário" + error);
        }
    }

    async getInternal(){
        try{
            const membersList = await prisma.members.findMany();
            return membersList;
        } catch (e){
            throw new Error(`Erro ao buscar membros internos: ${e.message}`);
        }
    }
}


export default MemberRepository;