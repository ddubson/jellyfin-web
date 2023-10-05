import { describe, test, expect } from 'vitest';
import { getBackdropShape, getPortraitShape, getSquareShape } from './card';

describe('getSquareShape', () => {
    test('without overflow', () => expect(getSquareShape(false)).toEqual('square'));

    test('with overflow', () => expect(getSquareShape(true)).toEqual('overflowSquare'));
});

describe('getBackdropShape', () => {
    test('without overflow', () => expect(getBackdropShape(false)).toEqual('backdrop'));

    test('with overflow', () => expect(getBackdropShape(true)).toEqual('overflowBackdrop'));
});

describe('getPortraitShape', () => {
    test('without overflow', () => expect(getPortraitShape(false)).toEqual('portrait'));

    test('with overflow', () => expect(getPortraitShape(true)).toEqual('overflowPortrait'));
});
