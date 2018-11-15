

const fetchData = {
    postData: async function (url, data){
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            let responseJson = await response.json();
            if (responseJson.code === 200) {
                return responseJson.data;
            }
        } catch (error) {
            console.error(error);
        }
    },
    getData: async function (url) {
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    },
};

export default fetchData;