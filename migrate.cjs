const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dnk4d52tv',
    api_key: '359541287523991',
    api_secret: 'orYVrJ3rcivcYzdYbWlIvjCBb30'
});

const urls = [
    "https://i.postimg.cc/k40bM187/logo-komnas-pplh.png",
    "https://i.postimg.cc/wMJhYKCd/647150881-122114675943215177-5360993793631409425-n.jpg",
    "https://i.postimg.cc/RCn1HfNR/648529409-122114675001215177-6631640995499234967-n.jpg",
    "https://i.postimg.cc/0jG37113/648552258-122114676543215177-1647481186714909832-n.jpg"
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
