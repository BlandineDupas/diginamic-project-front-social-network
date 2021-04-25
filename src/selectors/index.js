import slugify from 'slugify';

export const changeDateFormat = (date) => {
    const newDate = new Date(date);
    const formatedDate = newDate.toLocaleDateString('fr-FR') + ' à ' + newDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return formatedDate;
}

export const slugifyName = (firstname, lastname, id) => {
    return slugify(firstname + ' ' + lastname + ' ' + id, { lower: true, replacement: '_'});
}

export const getIdFromSlug = (slug) => {
    const splittedSlug = slug.split('_');
    return Number(splittedSlug[splittedSlug.length - 1]);
}
