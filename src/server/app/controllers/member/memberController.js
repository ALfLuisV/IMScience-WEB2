import MemberService from "../../services/member/memberService.js";
import MemberRepository from "../../repositories/members/memberRepository.js";

const memberRepository = new MemberRepository();
const memberService = new MemberService(memberRepository);


class MemberController {
    async addMember(req, res) {
        let member = req.body;

        if (req.body.type === 'internal') {
            try {
                member.profile_pic = req.body.savedImageName
                let newMember = await memberService.addMember(member);
                res.status(200).json({
                    success: true,
                    message: 'Membro adicionado com sucesso',
                    memberData: newMember,
                });
            } catch (error) {
                console.error('Erro ao adicionar membro:', error);
                res.status(400).json({
                    success: false,
                    message: 'erro ao adicionar membro',
                    error: error.message
                });
            }
        } else {
            try {
                let newMember = await memberService.addExternalMember(member);
                res.status(200).json({
                    success: true,
                    message: 'Membro externo adicionado com sucesso',
                    memberData: newMember,
                });
            } catch (error) {
                console.error('Erro ao adicionar membro:', error);
                res.status(400).json({
                    success: false,
                    message: 'erro ao adicionar membro',
                    error: error.message
                });
            }
        }
    }

    async getInternalMember(req, res) {
        try {
            let members = await memberService.getAllInternalMembers();
            res.status(200).json({
                success: true,
                message: 'Membro internos buscados com sucesso',
                memberData: members,
            });
        } catch (error) {
            console.log(error.message)
            res.status(400).json({
                success: false,
                message: 'erro ao buscar membros',
                error: error.message
            });
        }
    }

}

export default MemberController;