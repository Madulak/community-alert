import date from 'date-and-time';

export const ago = (dates) => {
        
    if (Math.round(date.subtract(new Date(), new Date(dates)).toSeconds()) > 0 && Math.round(date.subtract(new Date(), new Date(dates)).toSeconds()) < 60)  {
        return 'Moment ago'
    } else if  (Math.round(date.subtract(new Date(), new Date(dates)).toMinutes()) > 0 && Math.round(date.subtract(new Date(), new Date(dates)).toMinutes()) < 60 ) {
        return Math.round(date.subtract(new Date(), new Date(dates)).toMinutes()) + ' Minutes Ago'
    } else if (Math.round(date.subtract(new Date(), new Date(dates)).toHours()) > 0 && Math.round(date.subtract(new Date(), new Date(dates)).toHours()) < 24) {
        return Math.round(date.subtract(new Date(), new Date(dates)).toHours()) + ' Hours Ago'
    } else if (Math.round(date.subtract(new Date(), new Date(dates)).toDays()) > 0 && Math.round(date.subtract(new Date(), new Date(dates)).toDays()) < 31) {
        return Math.round(date.subtract(new Date(), new Date(dates)).toDays()) + ' Days Ago'
    }
    
    return  'Moment ago'
    // Math.round(date.subtract(new Date(), new Date(ig.createdAt)).toDays())
}

export const color = {
    primary: '#192f6a',
    secondary: '#33a8ff',
    red: '#f86363',
    green: '#33ff55'
}

export const category = [
    {
        name: 'Missing Person/People',
    },
    {
        name: 'Stolen Cars',
    },
    {
        name: 'Burglary',
    },
    {
        name: 'Missing Person/People',
    },
    {
        name: 'Missing Person/People',
    },
    {
        name: 'Missing Person/People',
    },
]