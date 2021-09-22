// hook for loading data
const useLoadData = (url) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        return data;
      })
      .catch((err) => {
        throw Error(err);
      });
  };
  
  module.exports = useLoadData;
  