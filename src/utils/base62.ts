const charset =  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encodebase62(num : bigint) : string {
    let hashed = "";
    let curr = num;

    while(curr > 0n){
        const remainder = Number(curr % 62n);
        hashed += charset[remainder];
        curr /= 62n;
    }
    return hashed;

}