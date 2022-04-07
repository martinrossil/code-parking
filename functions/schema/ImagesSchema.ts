import { ImageSchema } from './ImageSchema';

export type ImagesSchema = {
    id: number,
    backdrops: Array<ImageSchema>,
    posters: Array<ImageSchema>
}
