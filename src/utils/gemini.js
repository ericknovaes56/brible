const requestAi = async (prompt) => {
    // URL do Google API ajustada conforme o seu exemplo original
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyASoS57BccQgRtDxU3h5Lo-X8oh_ZRO588`;

    try {
        // Realizando a requisição usando fetch
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();

        const text = data.candidates[0].content.parts[0].text;

        return {
            data: text,
            code: 200
        };
    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        return {
            data: null,
            code: 500
        };
    }
};

export default requestAi;