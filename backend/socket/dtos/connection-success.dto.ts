import { ReplyDto } from "@/backend/shared/dtos/reply.dto";
import { UserDto } from "@/backend/user/dtos/user.dto";

export type ConnectionSuccessDto = ReplyDto<UserDto>;
