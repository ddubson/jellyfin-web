import { describe, expect, test } from 'vitest';
import { isResizable, isUsingLiveTvNaming, resolveCardCssClassNames, resolveMixedShapeByAspectRatio } from './extracted';

test('isUsingLiveTvNaming', () => {
    expect(isUsingLiveTvNaming('Program')).toEqual(true);
    expect(isUsingLiveTvNaming('Timer')).toEqual(true);
    expect(isUsingLiveTvNaming('Recording')).toEqual(true);
});

describe('isResizable', () => {
    test('is resizable if difference between screen width and window width is greater than 20px', () => {
        Object.defineProperty(window, 'screen', {
            value: {
                availWidth: 2048
            }
        });
        expect(isResizable(1024)).toEqual(true);
    });

    test('is not resizable if difference between screen width and window width is less than or equal to 20px', () => {
        Object.defineProperty(window, 'screen', {
            value: {
                availWidth: 1044
            }
        });
        expect(isResizable(1024)).toEqual(false);
    });

    test('is not resizable if screen width is not provided', () => {
        Object.defineProperty(window, 'screen', {
            value: undefined
        });
        expect(isResizable(1024)).toEqual(false);
    });
});

describe('resolveMixedShapeByAspectRatio', () => {
    test('primary aspect ratio is >= 1.33', () => {
        expect(resolveMixedShapeByAspectRatio(1.33)).toEqual('mixedBackdrop');
        expect(resolveMixedShapeByAspectRatio(1.34)).toEqual('mixedBackdrop');
    });

    test('primary aspect ratio is > 0.71', () => {
        expect(resolveMixedShapeByAspectRatio(0.72)).toEqual('mixedSquare');
        expect(resolveMixedShapeByAspectRatio(0.73)).toEqual('mixedSquare');
        expect(resolveMixedShapeByAspectRatio(1.32)).toEqual('mixedSquare');
    });

    test('primary aspect ratio is <= 0.71', () => {
        expect(resolveMixedShapeByAspectRatio(0.71)).toEqual('mixedPortrait');
        expect(resolveMixedShapeByAspectRatio(0.70)).toEqual('mixedPortrait');
        expect(resolveMixedShapeByAspectRatio(0.01)).toEqual('mixedPortrait');
    });

    test('primary aspect ratio is not provided', () => {
        expect(resolveMixedShapeByAspectRatio(undefined)).toEqual('mixedSquare');
        expect(resolveMixedShapeByAspectRatio(null)).toEqual('mixedSquare');
    });
});

describe('resolveCardCssClassNames', () => {
    test('default', () => {
        expect(resolveCardCssClassNames({
            itemType: 'non-music',
            showChildCountIndicator: false,
            isTV: false,
            enableFocusTransform: false,
            isDesktop: false })
        ).toEqual('card card-withuserdata');
    });

    test('card CSS classes', () => {
        expect(resolveCardCssClassNames({
            cardCssClass: 'custom-class',
            itemType: 'non-music',
            showChildCountIndicator: false,
            isTV: false,
            enableFocusTransform: false,
            isDesktop: false })
        ).toEqual('card custom-class card-withuserdata');
    });

    test('card classes', () => {
        expect(resolveCardCssClassNames({
            cardClass: 'custom-card',
            itemType: 'non-music',
            showChildCountIndicator: false,
            isTV: false,
            enableFocusTransform: false,
            isDesktop: false })
        ).toEqual('card custom-card card-withuserdata');
    });

    test('shape', () => {
        expect(resolveCardCssClassNames({
            shape: 'portrait',
            itemType: 'non-music',
            showChildCountIndicator: false,
            isTV: false,
            enableFocusTransform: false,
            isDesktop: false })
        ).toEqual('card portraitCard card-withuserdata');
    });

    test('desktop', () => {
        expect(resolveCardCssClassNames({
            itemType: 'non-music',
            showChildCountIndicator: false,
            isTV: false,
            enableFocusTransform: false,
            isDesktop: true })
        ).toEqual('card card-hoverable card-withuserdata');
    });

    test('tv', () => {
        expect(resolveCardCssClassNames({
            itemType: 'non-music',
            showChildCountIndicator: false,
            isTV: true,
            enableFocusTransform: false,
            isDesktop: false })
        ).toEqual('card show-focus card-withuserdata');
    });

    test('tv with focus transform', () => {
        expect(resolveCardCssClassNames({
            itemType: 'non-music',
            showChildCountIndicator: false,
            isTV: true,
            enableFocusTransform: true,
            isDesktop: false })
        ).toEqual('card show-focus show-animation card-withuserdata');
    });

    test('music item type', () => {
        expect(resolveCardCssClassNames({
            itemType: 'MusicAlbum',
            showChildCountIndicator: false,
            isTV: false,
            enableFocusTransform: false,
            isDesktop: false })
        ).toEqual('card');

        expect(resolveCardCssClassNames({
            itemType: 'MusicArtist',
            showChildCountIndicator: false,
            isTV: false,
            enableFocusTransform: false,
            isDesktop: false })
        ).toEqual('card');

        expect(resolveCardCssClassNames({
            itemType: 'Audio',
            showChildCountIndicator: false,
            isTV: false,
            enableFocusTransform: false,
            isDesktop: false })
        ).toEqual('card');
    });

    test('child count indicator', () => {
        expect(resolveCardCssClassNames({
            itemType: 'non-music',
            showChildCountIndicator: true,
            childCount: 5,
            isTV: false,
            enableFocusTransform: false,
            isDesktop: false })
        ).toEqual('card groupedCard card-withuserdata');
    });

    test('button tag name', () => {
        expect(resolveCardCssClassNames({
            tagName: 'button',
            itemType: 'non-music',
            showChildCountIndicator: false,
            isTV: false,
            enableFocusTransform: false,
            isDesktop: false })
        ).toEqual('card card-withuserdata itemAction');
    });

    test('all', () => {
        expect(resolveCardCssClassNames({
            shape: 'portrait',
            cardCssClass: 'card-css',
            cardClass: 'card',
            itemType: 'non-music',
            showChildCountIndicator: true,
            childCount: 5,
            tagName: 'button',
            isTV: true,
            enableFocusTransform: true,
            isDesktop: true })
        ).toEqual('card portraitCard card-css card card-hoverable show-focus show-animation groupedCard card-withuserdata itemAction');
    });
});
