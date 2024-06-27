import moment from 'moment-timezone';
import environments from '../../config/environments/environments.js';

export const dateSet = () => {
    const date = moment().tz(environments.timeZone).format('YYYY-MM-DD HH:mm:ss');
    return date;
};