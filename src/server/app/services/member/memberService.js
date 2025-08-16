import fs from 'fs';
const path = 'src/server/images/profileImages';

class MemberService {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }

    async addMember(member) {
        if (!member || !member.name || !member.position) {
            console.log("erro ao cadastrar membro: Dados inconsistentes...", member);
            return;
        }

        try {
            let newMember = await this.memberRepository.addMember(member);
            return newMember;
        } catch (error) {
            console.log("erro ao cadastrar membro" + error);
        }
    }

    async addExternalMember(member) {

        if (!member || !member.name || !member.country || !member.institution) {
            console.log("erro ao cadastrar membro: Dados inconsistentes", member);
            return;
        }

        const reg = /^-?\d*(\.?\d*)?$/;

        if (member.cpf && !reg.test(member.cpf) && member.cpf.length != 11) {
            console.log("cpf inválido");
        }

        try {
            let newMember = await this.memberRepository.addExternalMember(member);
            return newMember;
        } catch (error) {
            console.log("erro ao cadastrar membro externo" + error);
        }
    }


    async getAllInternalMembers() {
        try {
            let InternalMembers = await this.memberRepository.getInternal();

            await Promise.all(
                InternalMembers.map(async (mem) => {
                    try {
                        // mem.profile_pic = await fs.promises.readFile(path + `/${mem.profile_pic}`);
                        mem.profile_pic = path + `/${mem.profile_pic}`;
                    } catch (err) {
                        console.error('Erro ao ler o arquivo:', err);
                        mem.profile_pic = null;
                    }
                })
            );
            return InternalMembers;
        } catch (e) {
            throw new Error(`Erro ao buscar membros internos: ${e.message}`);
        }
    }

}


export default MemberService;