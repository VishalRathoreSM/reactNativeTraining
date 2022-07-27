export const QrGeneratorApi =
  'https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=';

export const startCase = text => {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const getRandomInRange = (from, to, fixed) =>
  (Math.random() * (to - from) + from).toFixed(fixed) * 1;

export const getQrCodeUrl = data => QrGeneratorApi + JSON.stringify(data);
