import axios from "axios";
const generateReport = async (query: string) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/generate-report`,
            { query },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    
        if (response.status !== 200) {
            throw new Error('Failed to generate report');
        }
    
        const data = await response.data;
        return data;
    } catch (error) {
        console.log('Error generating report:', error);
        throw error;
    }
}

export {
    generateReport,
}

