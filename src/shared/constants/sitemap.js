export const LIMIT = 1000;

export const generatePages = (total) =>  {
    const pages = Math.ceil(total / LIMIT);
    return Array.from({ length: pages }, (_, i) => ({ id: i }))
}