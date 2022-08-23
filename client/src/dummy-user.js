import avatar from './assets/images/avatar.jpg'
import banner from './assets/images/banner.png'
import post_image from './assets/images/post-image.jpg'

export const DUMMY_USER = {
    fullName: 'Samson Okunola',
    username: 'pablo_clueless',
    email: 'okunolaosamson@gmail.com',
    image: avatar,
    banner: banner,
    bio: 'web & mobile developer, web3, technical writing',
    role: 'Frontend Developer',
    company: 'Zummit Africa',
    location: 'Lagos, Nigera',
    url: 'https://okunolasamson.dev',
    github: 'https://github.com/pablo-clueless',
    linkedin: 'https://linkedin.com/in/samson-okunola',
    twitter: 'https://twitter.com/pablo_clueless',
    posts: [],
    following: [],
    followers: []
}

export const DUMMY_POSTS = [
    {
        id: '0001',
        body: `Today is my little girl's birthday, and we went for a photoshoot. She's looking very beautiful.`,
        createdBy: DUMMY_USER.username,
        creatorImage: avatar,
        createdOn: new Date().toUTCString(),
        image: post_image,
        likes: 240,
        shares: 50,
        comments: []
    },
    {
        id: '0002',
        body: `Today is my little girl's birthday, and we went for a photoshoot. She's looking very beautiful.`,
        createdBy: DUMMY_USER.username,
        creatorImage: avatar,
        createdOn: new Date().toUTCString(),
        image: post_image,
        likes: 240,
        shares: 50,
        comments: []
    },
    {
        id: '0003',
        body: `Today is my little girl's birthday, and we went for a photoshoot. She's looking very beautiful.`,
        createdBy: DUMMY_USER.username,
        creatorImage: avatar,
        createdOn: new Date().toUTCString(),
        image: post_image,
        likes: 240,
        shares: 50,
        comments: []
    }
]