const {emptyObj} = global;

export const Push = (navigation, route, params = emptyObj) =>
  navigation.push(route, params);

export const Navigate = (navigation, route, params = emptyObj) =>
  navigation.navigate(route, params);
