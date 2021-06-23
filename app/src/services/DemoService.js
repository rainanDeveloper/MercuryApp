const axios = require('axios')


export async function getDemoApi() {

    try{
        const response = await axios.get('/api/hello');
        return await response.data;
    }catch(error) {
        return {
            error
        };
    }
    
}