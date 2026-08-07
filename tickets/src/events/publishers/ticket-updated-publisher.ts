import { Subjects, Publisher } from "@mwibutsa/common";
import type { TicketUpdatedEvent } from "@mwibutsa/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
