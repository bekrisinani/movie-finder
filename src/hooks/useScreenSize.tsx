import { useEffect, useState } from 'react';
import { useWindowSize } from './useWindowSize';
import mediaQueries from '../assets/mediaQueries.scss';

export enum Platforms {
    PHONE = 'PHONE',
    TABLET = 'TABLET',
    DESKTOP = 'DESKTOP',
    LARGE_DESKTOP = 'LARGE_DESKTOP',
}

export function useScreenSize(): { platform: string; isMobile: boolean } {
    const size = useWindowSize();
    const [screenSize, setScreenSize] = useState({
        platform: 'No media query matched',
        isMobile: false,
    });
    useEffect(() => {
        const mediaMatchers = buildMediaMatchers();
        let newScreenSize = {
            platform: 'No media query matched',
            isMobile: false,
        };
        if (mediaMatchers.phoneMatch.matches || mediaMatchers.iPhoneMatch.matches) {
            newScreenSize = {
                platform: Platforms.PHONE,
                isMobile: true,
            };
        } else if (mediaMatchers.tabletMatch.matches) {
            newScreenSize = {
                platform: Platforms.TABLET,
                isMobile: true,
            };
        } else if (mediaMatchers.desktopMatch.matches) {
            newScreenSize = {
                platform: Platforms.DESKTOP,
                isMobile: false,
            };
        } else if (mediaMatchers.largeDesktopMatch.matches) {
            newScreenSize = {
                platform: Platforms.LARGE_DESKTOP,
                isMobile: false,
            };
        }
        setScreenSize({ ...newScreenSize });
    }, [size]);
    return screenSize;
}

function buildMediaMatchers() {
    const phoneMatch = window.matchMedia(
        buildMediaQueryString({
            max: mediaQueries.phoneMaxWidth,
        })
    );
    const iPhoneMatch = window.matchMedia(
        buildMediaQueryString({
            max: mediaQueries.iPhoneMaxWidth,
            pixelRatio: mediaQueries.iPhoneMaxPixelDensity,
        })
    );
    const tabletMatch = window.matchMedia(
        buildMediaQueryString({
            min: mediaQueries.tabletMinWidth,
            max: mediaQueries.tabletMaxWidth,
        })
    );
    const desktopMatch = window.matchMedia(
        buildMediaQueryString({
            min: mediaQueries.desktopMinWidth,
            max: mediaQueries.desktopMaxWidth,
        })
    );
    const largeDesktopMatch = window.matchMedia(
        buildMediaQueryString({
            min: mediaQueries.largeDesktopMinWidth,
        })
    );
    return {
        phoneMatch,
        iPhoneMatch,
        tabletMatch,
        desktopMatch,
        largeDesktopMatch,
    };
}

const buildMediaQueryString : ({min, max, pixelRatio}: { min?: any; max?: any; pixelRatio?: any }) => string = ({ min = null, max = null, pixelRatio = null }) => {
    if (!min && !max) {
        throw new Error('You must pass at least a min or a max');
    }
    let parts = ['screen'];
    if (min) {
        parts = [...parts, `(min-width: ${min})`];
    }
    if (max) {
        parts = [...parts, `(max-width: ${max})`];
    }
    if (pixelRatio) {
        parts = [...parts, `(-webkit-device-pixel-ratio: ${pixelRatio})`];
    }
    return parts.join(' and ');
}
