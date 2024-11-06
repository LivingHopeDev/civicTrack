export const getPublicIdFromUrl = (url: string) => {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    const publicIdWithExtension = lastPart.split('.')[0];
    return publicIdWithExtension ? publicIdWithExtension : null;
}

