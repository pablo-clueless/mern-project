import { FiBell, FiEye, FiKey, FiSettings, FiUser } from 'react-icons/fi'

export { default as Spinner } from './icons/Spinner'

export const NAVLINKS = [
    {
        title: 'Settings',
        links: [
            {
                name: 'Account',
                link: '/settings#account',
                icon: <FiSettings />
            },
            {
                name: 'Appearance',
                link: '/settings#appearance',
                icon: <FiEye />
            },
            {
                name: 'Notifications',
                link: '/settings#notifications',
                icon: <FiBell />
            },
            {
                name: 'Security',
                link: '/settings#security',
                icon: <FiKey />
            },
        ]
    },
]

export const THEME_COLORS = [
    {
        name: 'Red',
        color: '#'
    },
    {
        name: 'Blue',
        color: '#'
    },
    {
        name: 'Purple',
        color: '#'
    },
    {
        name: 'Orange',
        color: '#'
    },
    {
        name: 'Brown',
        color: '#'
    },
]