import { MaxLength, MinLength } from 'class-validator';

export default class CreateNewsRequest {
    @MinLength(3, {
      message: 'Title must be at least 3 symbols.',
    })
    @MaxLength(100, {
        message: 'Title must be less than 100 symbols.',
    })
    title: string;


    @MinLength(10, {
        message: 'Short description must be at least 10 symbols.',
    })
    @MaxLength(500, {
        message: 'Short description must be less than 500 symbols.',
    })
    short_description: string;


    @MinLength(500, {
        message: 'Text must be at least 500 symbols.',
    })
    @MaxLength(40000, {
        message: 'Text must be less than 40000 symbols.',
    })
    text: string;
}