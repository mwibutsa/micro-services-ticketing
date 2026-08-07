import { Subjects } from "./subjects";
import { Publisher } from "./base-publisher";
import type { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
