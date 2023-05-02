// THIS SHIT IS DISGUSTING I GOT THIS OFF OF STACKOVERFLOW

export function msToTime(ms: number) {
    let seconds = (ms / 1000).toFixed(0);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (parseInt(seconds) < 60) return seconds + " seconds";
    else if (parseInt(minutes) < 60) return minutes + " minute(s)";
    else if (parseInt(hours) < 24) return hours + " hours";
    else return days + " Days"
  }