import { type BaseResponseDTO } from "@/types/dto.types";

export interface LoginRequestDTO {
  email: string;
  password: string;
};

export type LoginResponseDTO = BaseResponseDTO<{
  accessToken: string;
}>;

export interface SignupRequestDTO {
  email: string;
  password: string;
  name: string;
}

export type SignupResponseDTO = BaseResponseDTO<{
  accessToken: string;
}>;

export type RefreshResponseDTO = BaseResponseDTO<{
  accessToken: string;
}>;