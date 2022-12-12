export interface IAuthResponseDto{

    isSuccessful: boolean;
    errors: string[];
    token: string;
}