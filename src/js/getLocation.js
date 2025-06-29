export default function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((location) => {
            const { latitude, longitude } = location.coords;
            resolve({ latitude, longitude })
        },
            (error) => {
                reject(error)
                
            }
        );
    });
}