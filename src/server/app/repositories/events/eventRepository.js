import { PrismaClient } from '../../../generated/prisma/index.js'

const prisma = new PrismaClient()

class EventRepository {

    async addEvent(event){
        try{
            const newEvent = await prisma.events.create({
                data: {
                    name: event.name,
                    event_date: event.event_date,
                    location: event.location,
                    mode: event.mode,
                    type: event.type,
                    audiencia: event.audiencia,

                }
            })
            return newEvent
        } catch (error){
            console.log("Erro ao cadastrar evento " + error);
        }
    }

    async getEvent(){
        try{
            const eventsList = await prisma.events.findMany();
            return eventsList;
        } catch (e){
            throw new Error(`Erro ao buscar eventos internos: ${e.message}`);
        }
    }
}

export default EventRepository;