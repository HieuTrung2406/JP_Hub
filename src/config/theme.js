export const appTheme = {
    colors: {
        primary: '#2F80ED',
        primaryHover: '#1D6FE0',
        heading: '#10254B',
        text: '#64748B',
        border: '#DCE5F2',
        background: '#FFFFFF',
        backgroundSoft: '#EFF6FF',
    },

    fonts: {
        body: '"Nunito", "Noto Sans JP", sans-serif',
        japanese: '"Noto Sans JP", sans-serif',
    },

    radius: {
        input: 10,
        card: 16,
    },
};

export const antdTheme = {
    token: {
        colorPrimary: appTheme.colors.primary,
        colorTextHeading: appTheme.colors.heading,
        colorTextSecondary: appTheme.colors.text,
        colorBorder: appTheme.colors.border,
        borderRadius: appTheme.radius.input,
        fontFamily: appTheme.fonts.body,
        controlHeightLG: 52,
    },
};
