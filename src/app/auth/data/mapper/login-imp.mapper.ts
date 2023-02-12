import { Mapper } from "src/app/shared/utils/mapper";
import { LoginModel } from "../../domain/model/login.model";
import { LoginResponseDto } from "../remote/login-response.dto";

export class LoginImplementationMapper extends Mapper<LoginResponseDto, LoginModel> {

    mapTo(param: LoginResponseDto): LoginModel {
        return {
            name: param.data.name,
            email: param.data.email,
            role: param.data.role,
            token: param.access_token,
            expiresIn: param.expiresIn,
        }
    }

}