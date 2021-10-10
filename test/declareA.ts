import { BNameSpace } from './declareB';

export namespace FairyMountain {
    export interface Cat {
        /** A's prop */
        a: number;
        type: AnimalType.Cat;
    }

    export interface Dog {
        d: BNameSpace.Cat;
    }
}

export interface Snake {
    s: number;
}

export interface Pig {
    p: string;
}

export type SSnake = Snake;

export enum AnimalType {
    /**
     * dog
     * @min 10
     */
    Dog = '1',
    Cat = 2
}
