import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export default class BaseNewsRequestParameters {
    @MinLength(3, {
      message: 'Title must be at least 3 symbols.',
    })
    @MaxLength(100, {
        message: 'Title must be less than 100 symbols.',
    })
    @IsString({ message: 'Title must be a string.' })
    @IsNotEmpty({ message: 'Title is required.' })
    title: string;


    @MinLength(5, {
        message: 'Short description must be at least 5 symbols.',
    })
    @MaxLength(400, {
        message: 'Short description must be less than 400 symbols.',
    })
    @IsString({ message: 'Short description must be a string.' })
    @IsNotEmpty({ message: 'Short description is required.' })
    short_description: string;


    @MinLength(500, {
        message: 'Text must be at least 500 symbols.',
    })
    @MaxLength(40000, {
        message: 'Text must be less than 40000 symbols.',
    })
    @IsString({ message: 'Text must be a string.' })
    @IsNotEmpty({ message: 'Text is required.' })
    text: string;
}