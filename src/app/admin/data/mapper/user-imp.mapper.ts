import { Mapper } from "src/app/shared/utils/mapper";
import { UserModel } from "../../domain/model/user.model";
import { UserResponseDto } from "../remote/user-response.dto";

export class UserImplementationMapper extends Mapper<UserResponseDto, UserModel> {

    mapTo(param: UserResponseDto): UserModel {
        return {
            id: param.data._id,
            fullName: param.data.name,
            email: param.data.email,
            role: param.data.role,
            organizationName: param.data.organizationName,
            title: param.data.title,
            department: param.data.department
        }
    }

}