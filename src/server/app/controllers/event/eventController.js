import EventService from "../../services/event/eventService.js";
import EventRepository from "../../repositories/events/eventRepository.js"

const eventRepository = new EventRepository();
const eventService = new EventService(EventRepository);

class EventController {
    async addEvent(req, res) {
        let event = req.body;

        try {
            let newEvent = await eventService.addMember(event);
            res.status(200).json({
                success: true,
                message: 'Evento adicionado com sucesso',
                eventData: newEvent,
            });
        } catch (error) {
            console.error('Erro ao adicionar evento:', error);
            res.status(400).json({
                success: false,
                message: 'erro ao adicionar evento',
                error: error.message
            });
        }
    }

    async getInternalMember(req, res) {
        try {
            let events = await eventService.getAllEvents();
            res.status(200).json({
                success: true,
                message: 'Eventos buscados com sucesso',
                memberData: events,
            });
        } catch (error) {
            console.log(error.message)
            res.status(400).json({
                success: false,
                message: 'erro ao buscar eventos',
                error: error.message
            });
        }
    }
}

export default EventController