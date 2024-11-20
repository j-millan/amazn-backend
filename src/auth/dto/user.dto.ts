import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  @ApiProperty({ name: 'id', description: 'The user id', type: String })
  id: string;

  @Expose()
  @ApiProperty({
    name: 'name',
    description: 'The user first and last name',
    type: String,
  })
  name: string;

  @Expose()
  @ApiProperty({
    name: 'email',
    description: 'The user email.',
    type: String,
    required: false,
  })
  email?: string;

  @Expose()
  @ApiProperty({
    name: 'phoneNumber',
    description: 'The user phone number',
    type: String,
    required: false,
  })
  phoneNumber?: string;

  @Expose()
  @ApiProperty({
    name: 'username',
    description: 'The user username',
    type: String,
    required: false,
  })
  username?: string;
}
