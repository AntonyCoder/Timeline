export default function validateLocation(value) {
    const regex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;

    if (!regex.test(value)) {
        alert('Введите координаты в формате: широта, долгота');
        return null;
    }

    const [latStr, lngStr] = value.split(',').map(s => s.trim());
    const latitude = parseFloat(latStr);
    const longitude = parseFloat(lngStr);

    const isValidLat = latitude >= -90 && latitude <= 90;
    const isValidLng = longitude >= -180 && longitude <= 180;

    if (!isValidLat || !isValidLng) {
        alert('Широта должна быть от -90 до 90, долгота — от -180 до 180');
        return null;
    }

    return {latitude, longitude};
}