import { ApiProperty } from "@nestjs/swagger";
import { ResponsePayloadStatus } from "@shared/models/api/response-payload-status.model";

/**
 * Base model for API responses
 */
export class ResponsePayload<T> {
  @ApiProperty({
    enum: ResponsePayloadStatus,
  })
  status: ResponsePayloadStatus;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  message: string | null;

  @ApiProperty()
  data: T;
}
