import { ApiProperty } from "@nestjs/swagger";

export class CustomerUpdateInfoDtoFlow {
  @ApiProperty({type: String})
  email: string;
  @ApiProperty({type: String})
  firstname: string;
  @ApiProperty({type: String})
  lastname: string;
  @ApiProperty({type: Number})
  website_id: number = 1;
  @ApiProperty({type: String})
  dob: string;
  @ApiProperty({type: Boolean})
  is_subscribed: boolean;
}
