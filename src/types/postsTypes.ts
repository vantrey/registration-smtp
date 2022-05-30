import {IBlogger} from './bloggersTypes';

export interface IPost {
    id: number,
    title: string,
    shortDescription: string,
    content: string,
    bloggerId: IBlogger['id']
}