import moment from 'moment';
import { SafeAny } from '../http/http.service';

export const formatToSeconds = (second: number): SafeAny => {
  return second ? moment(second * 1000).format('YYYY-MM-DD HH:mm:ss') : 'ss';
}


