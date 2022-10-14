module.exports = {
    content: ['./pages/**/*.tsx', './components/**/*.tsx'],
    theme: {
        extend: {
            colors: {
                brown: {
                    200: '#b5651b',
                    400: '#7d3a0a',
                },
                black: {
                    200: '#000000aa',
                    400: '#00000055',
                },
            },
        },
    },
    plugins: [],
    safelist: [
        'bg-red-200',
        'bg-blue-200',
        'bg-green-200',
        'bg-white-200',
        'bg-pink-200',
        'bg-purple-200',
        'bg-red-200',
        'bg-yellow-200',
        'bg-gray-200',
        'bg-black-200',
        'bg-brown-200',
        'bg-red-400',
        'bg-blue-400',
        'bg-green-400',
        'bg-white-400',
        'bg-pink-400',
        'bg-purple-400',
        'bg-red-400',
        'bg-yellow-400',
        'bg-gray-400',
        'bg-black-400',
        'bg-brown-400',
    ],
};
