export default function errorCatch(response: any, isError: boolean) {
    if (isError) {
        return { success: false, response: 'Sin conexion con el back' }
    }
    switch (response.statusCode) {
        case 413:
            return { success: false, response: response }
            break;
        case 500:
            return { success: false, response: response }
            break;
        default:
            return { success: true, response: response }
            break;
    }
}