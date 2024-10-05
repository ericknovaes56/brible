const api = "https://bardai-o8nd.onrender.com/bardapi"

const requestAi = async (prompt) => {
    const respose = await fetch(api, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({prompt:prompt}),
    })

    const data = await respose.json()
    

    if (data.text.split(' ').includes("Error")) {
        console.log('error')
        return {
            data: null,
            code: 429
        }
    }


    return {
        data: data,
        code:200
    }

}


export default requestAi