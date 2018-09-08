import Home from '../routes/Home'

const hashes = {
    paths: [
        {
            path: '/home',
            name: 'Home',
            icon: 'home',
            component: Home
        },
    ],
    redirect: {path: '/', to: '/home', name: 'Home'}
}

export default hashes
