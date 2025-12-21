export default function radixSort (arr, order=true) {
    const n =  maximum(arr);
    let exp = 1;
    while (Math.floor(n / exp) > 0) {
        order ? arr = countSortAsc(arr, exp) : arr = countSortDesc(arr, exp);
        exp *= 10;
    }
    return arr;
}

const maximum = (arr) => {
    let max = arr[0].rows * arr[0].columns;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].rows * arr[i].columns > max) {
            max = arr[i].rows * arr[i].columns;
        }
    }
    return max;
};

const countSortAsc = (arr, exp) => {
    const n = arr.length;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);
    
    for (let i = 0; i < n; i++) {
        const index = Math.floor(arr[i].rows * arr[i].columns / exp) % 10;
        count[index]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    for (let i = n - 1; i >= 0; i--) {
        const index = Math.floor(arr[i].rows * arr[i].columns / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
    }
    return output;
};

const countSortDesc = (arr, exp) => {
    const n = arr.length;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);
    
    for (let i = 0; i < n; i++) {
        const index = Math.floor(arr[i].rows * arr[i].columns / exp) % 10;
        count[index]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    for (let i = n - 1; i >= 0; i--) {
        const index = Math.floor(arr[i].rows * arr[i].columns / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
    }
    
    return output.reverse();
};
