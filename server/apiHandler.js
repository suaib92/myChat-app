const axios = require('axios');

const OPENROUTER_API_KEY = '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';

async function getCompletion(messageToSend) {
    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', messageToSend, {
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.choices[0].text;
    } catch (error) {
        throw error.response.data;
    }
}

module.exports = {
    getCompletion
};
