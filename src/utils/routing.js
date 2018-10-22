import isEmpty from 'ramda/src/isEmpty';
export const homeRoute = (year = '', month= '') => {
  return `/home/${isEmpty(year) ? "" : `${year}/`}${isEmpty(month) ? "" : `${month}`}`;
}

export const chartRoute = (year = '', month= '') => {
  return `/chart/${isEmpty(year) ? "" : `${year}/`}${isEmpty(month) ? "" : `${month}`}`;
};

export const editExpenseRoute = ({year, month, day, details}) => {
  return `/edit/${year}/${month}/${day}/?details=${JSON.stringify(details)}`;
};

export const addExpenseRoute = () => {
  return `/add`;
};