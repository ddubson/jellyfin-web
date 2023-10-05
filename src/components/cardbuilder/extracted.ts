// TODO(ddubson): filename

/**
 * Determines if the item is live TV.
 * @param {string} itemType - Item type to use for the check.
 * @returns {boolean} Flag showing if the item is live TV.
 */
export const isUsingLiveTvNaming = (itemType: string): boolean => itemType === 'Program' || itemType === 'Timer' || itemType === 'Recording';

/**
 * Checks if the window is resizable.
 * @param {number} windowWidth - Width of the device's screen.
 * @returns {boolean} - Result of the check.
 */
export const isResizable = (windowWidth: number): boolean => {
    const screen = window.screen;
    if (screen) {
        const screenWidth = screen.availWidth;

        if ((screenWidth - windowWidth) > 20) {
            return true;
        }
    }

    return false;
};

export const resolveMixedShapeByAspectRatio = (primaryImageAspectRatio: number | null | undefined) => {
    if (primaryImageAspectRatio === undefined || primaryImageAspectRatio === null) {
        return 'mixedSquare';
    }

    if (primaryImageAspectRatio >= 1.33) {
        return 'mixedBackdrop';
    } else if (primaryImageAspectRatio > 0.71) {
        return 'mixedSquare';
    } else {
        return 'mixedPortrait';
    }
};

type ClassNameOpts = {
    shape?: string,
    cardCssClass?: string,
    cardClass?: string,
    tagName?: string,
    itemType: string,
    childCount?: number,
    showChildCountIndicator: boolean,
    isTV: boolean,
    enableFocusTransform: boolean,
    isDesktop: boolean
};

export const resolveCardCssClassNames = (opts: ClassNameOpts): string => {
    const classNames = ['card'];

    if (opts.shape) {
        classNames.push(`${opts.shape}Card`);
    }
    if (opts.cardCssClass) {
        classNames.push(opts.cardCssClass);
    }

    if (opts.cardClass) {
        classNames.push(opts.cardClass);
    }

    if (opts.isDesktop) {
        classNames.push('card-hoverable');
    }

    if (opts.isTV) {
        classNames.push('show-focus');

        if (opts.enableFocusTransform) {
            classNames.push('show-animation');
        }
    }

    if (opts.showChildCountIndicator && opts.childCount) {
        classNames.push('groupedCard');
    }

    const musicItemTypes = ['MusicAlbum', 'MusicArtist', 'Audio'];
    if (!musicItemTypes.includes(opts.itemType)) {
        classNames.push('card-withuserdata');
    }

    if (opts.tagName === 'button') {
        classNames.push('itemAction');
    }

    return classNames.join(' ');
};
