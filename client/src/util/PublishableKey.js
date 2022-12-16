import api from "../asset/api";

const getPublishableKey = async () => {
  const data = await api
    .get('/stripe/get-publishable-key')
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error.response.data);
    });
  return await data
};

export default getPublishableKey;