const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dnk4d52tv',
    api_key: '359541287523991',
    api_secret: 'orYVrJ3rcivcYzdYbWlIvjCBb30'
});

const urls = [
    "https://i.postimg.cc/wMJhYKCd/647150881-122114675943215177-5360993793631409425-n.jpg",
    "https://i.postimg.cc/RCn1HfNR/648529409-122114675001215177-6631640995499234967-n.jpg",
    "https://i.postimg.cc/5yvwWchd/648529412-122114675979215177-2337113495329901794-n.jpg",
    "https://i.postimg.cc/nr7vf8yJ/648722656-122114675859215177-1917562212020656991-n.jpg",
    "https://i.postimg.cc/BZ15KDXH/648763645-122114675403215177-5301379909082126899-n.jpg",
    "https://i.postimg.cc/L4Zk1fnj/648809042-122114675889215177-8151982047925485108-n.jpg",
    "https://i.postimg.cc/2yv4NpsN/649109736-122114675823215177-4299429677004223139-n.jpg"
];

async function run() {
    for (const url of urls) {
        try {
            const res = await cloudinary.uploader.upload(url, { folder: 'komnas_migrated' });
            console.log(url, '=>', res.secure_url);
        } catch (e) {
            console.error('Failed:', url, e.message);
        }
    }
}
run();
