export function debounce(func, timeout = 350){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export function roundNumber(x){
    return Math.round(x/0.5)*0.5
}
