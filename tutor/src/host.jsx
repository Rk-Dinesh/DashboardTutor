
export const API = 'http://13.54.14.73:3000';

export function formatDate1(isoDate) {
    const date = new Date(isoDate);
    const options = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    };

    // Convert the date to the desired format
    const formattedDate = date.toLocaleDateString('en-GB', options);
    const [datePart, timePart] = formattedDate.split(', ');

    return `${datePart.replace(/\//g, '-')} / ${timePart}`;
}