import fs from 'fs';

class EventService{
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }

    async addEvent(event) {
        if(!event || !event.name || !event.location || !event.location){
            console.log("erro ao cadastrar evento: Dados inconsistentes...", member);
            return;
        }
        try {
            let newEvent = await this.eventRepository.addEvent(event);
            return newEvent;
        } catch (error) {
            console.log("erro ao cadastrar membro" + error);
        }
    }

    async getAllEvents() {
        try {
            let Events = await this.eventRepository.getEvents();

            return Events;
        } catch (e) {
            throw new Error(`Erro ao buscar membros internos: ${e.message}`);
        }
    }
}

export default EventService;