import moment from 'moment'

// formating date with moment

export const dateFormat = (date) =>{
    return moment(date).format('MM/DD/YYYY')
}