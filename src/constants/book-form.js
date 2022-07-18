export const formConfig = {
  book: {
    type: 'text',
    label: 'Book Name',
    keyboardType: 'default',
    value: '',
    key: 'book',
    isReq: true,
  },
  author: {
    type: 'text',
    label: 'Author Name',
    keyboardType: 'default',
    value: '',
    key: 'author',
    isReq: true,
  },
  publisher: {
    type: 'dropdown',
    label: 'Publisher',
    value: '',
    key: 'publisher',
    data: ['Vishal', 'Nishant', 'Vicky'],
    defaultButtonText: 'Select a publisher',
    isReq: false,
  },

  price: {
    type: 'text',
    label: 'Price',
    keyboardType: 'numeric',
    value: '',
    key: 'price',
    isReq: true,
  },
  email: {
    type: 'text',
    label: 'Email',
    keyboardType: 'email-address',
    value: '',
    key: 'email',
    isReq: true,
  },
  website: {
    type: 'text',
    label: 'Website',
    keyboardType: 'url',
    value: '',
    key: 'website',
    isReq: true,
  },
  display: {
    type: 'checkbox',
    label: 'Do you want to display this Book in library?',
    value: false,
    key: 'display',
    isReq: true,
  },
};

export const formConfigArr = Object.values(formConfig);

export const url = 'https://library-mock-server.herokuapp.com/';

export const renderItem = item => item;

export const getInitialFormValues = () =>
  formConfigArr.reduce(
    (res, {value, key}) => {
      res.values[key] = value;
      return res;
    },
    {
      errors: {},
      values: {},
    },
  );
