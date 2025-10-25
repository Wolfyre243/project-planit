import { type BaseResponseDTO } from "@/types/dto.types";

export interface LoginRequestDTO {
  email: string;
  password: string;
};

export type LoginResponseDTO = BaseResponseDTO<{
  accessToken: string;
}>;

export interface RegisterRequestDTO {
  email: string;
  password: string;
  name: string;
}

export type RegisterResponseDTO = BaseResponseDTO<{
  accessToken: string;
}>;

export type RefreshResponseDTO = BaseResponseDTO<{
  accessToken: string;
}>;