import { Mapper } from "src/app/shared/utils/mapper";
import { UserModel } from "../../domain/model/user.model";
import { UserDto } from "../remote/user.dto";
import { UsersResponseDto } from "../remote/users-response.dto";

export class UsersImplementationMapper extends Mapper<UsersResponseDto, UserModel[]> {

    convert(param: UserDto): UserModel {
        return {
            id: param._id,
            fullName: param.name,
            email: param.email,
            role: param.role,
            organizationName: param.organizationName,
            title: param.title,
            department: param.department
        }
    }

    mapTo(param: UsersResponseDto): UserModel[] {
        return param.data.map(this.convert);
    }

}