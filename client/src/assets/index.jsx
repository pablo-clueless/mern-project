import { FiBell, FiEye, FiKey, FiSettings } from 'react-icons/fi'
import Spinner from './icons/Spinner'
import Cookie from './images/cookie.svg'
import Default from './images/default.png'

const NAVLINKS = [
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

const THEME_COLORS = [
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

export { Cookie, Default, Spinner, NAVLINKS, THEME_COLORS }