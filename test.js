function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

const today = convertTZ(new Date(), "Asia/Singapore");
const todayDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(today);

console.log(todayDay)
