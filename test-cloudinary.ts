async function test() {
  if (process.env.CLOUDINARY_URL) {
    delete process.env.CLOUDINARY_URL;
  }

  const cloudinaryModule = await import('cloudinary');
  const cloudinary = cloudinaryModule.v2;

  cloudinary.config({ 
    cloud_name: 'dnk4d52tv', 
    api_key: '359541287523991', 
    api_secret: 'orYVrJ3rcivcYzdYbWlIvjCBb30',
    secure: true
  });

  try {
    const result = await cloudinary.uploader.upload('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', {
      folder: 'test'
    });
    console.log('Success:', result.secure_url);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
