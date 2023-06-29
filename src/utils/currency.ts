export const format = (value: number) => {
    const formatter = new Intl.NumberFormat('es-UY',{
        style: 'currency',
        currency: 'UYU',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        
    })
    return formatter.format(value);
}