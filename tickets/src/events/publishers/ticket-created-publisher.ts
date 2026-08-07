import { Subjects, Publisher } from "@mwibutsa/common";
import type { TicketCreatedEvent } from "@mwibutsa/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
