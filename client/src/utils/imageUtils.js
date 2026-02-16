/**
 * Validates an uploaded image file for type and size.
 * @param {File} file
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateFile(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validTypes = ['image/jpeg', 'image/png'];

    if (!validTypes.includes(file.type)) {
        return { valid: false, error: 'Invalid file type. Please upload JPG or PNG images.' };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'File is too large. Maximum size is 10MB.' };
    }

    return { valid: true };
}

/**
 * Reads and resizes an image file to 512×512 JPEG.
 * @param {File} file
 * @returns {Promise<{ base64: string, resizedFile: File }>}
 */
export function processImageFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = 512;
                canvas.height = 512;
                ctx.drawImage(img, 0, 0, 512, 512);

                const base64 = canvas.toDataURL('image/jpeg', 0.9);

                canvas.toBlob((blob) => {
                    if (blob) {
                        const resizedFile = new File(
                            [blob],
                            file.name.replace(/\.[^/.]+$/, '.jpg'),
                            { type: 'image/jpeg', lastModified: Date.now() }
                        );
                        resolve({ base64, resizedFile });
                    } else {
                        reject(new Error('Failed to create image blob.'));
                    }
                }, 'image/jpeg', 0.9);
            };

            img.onerror = () => {
                reject(new Error('Error loading image. Please try another file.'));
            };

            img.src = event.target.result;
        };

        reader.onerror = () => {
            reject(new Error('Error reading file. Please try again.'));
        };

        reader.readAsDataURL(file);
    });
}
