import { Language } from 'pokemon';
import { useMemo } from 'react';

export const useLanguages = () =>
    useMemo(
        () =>
            ({
                en: 'English',
                ja: '日本語',
                'zh-Hant': '繁體中文',
            } as { [key in Language]: string }),
        []
    );
