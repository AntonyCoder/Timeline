export default function getLocation(){
    navigator.geolocation.getCurrentPosition((e) => {
        const { latitude, longitude } = e.coords
        
    });
}