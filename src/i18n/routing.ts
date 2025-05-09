import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import {fallbackLng, locales} from '../i18n/settings';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: locales,

    // Used when no locale matches
    defaultLocale: fallbackLng,
    localePrefix: 'as-needed',
    localeDetection: false,
    alternateLinks: false
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);