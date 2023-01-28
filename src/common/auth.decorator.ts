import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Role } from "./role.enum";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "./roles.guard";

export function Auth(role: Role) {
    return applyDecorators(
        Roles(role),
        UseGuards(JwtAuthGuard, RolesGuard)
    )
}