const testConsole = (res) => {
    console.log(res);
}

testConsole('안녕');

//콜백함수
function collback(res,ab){
    setTimeout(()=>{
        const result = res*10;
        ab(result);
    },1000)
}
//콜백지옥
collback(2,(res) => {
    console.log(res);
    collback(res,(res) =>{
        console.log(res);
        collback(res,(res) =>{
            console.log(res);
            collback(res,(res) =>{
                console.log(res);
            })
        })
    })
});

let arr = ['안녕','나는','퇴근','하고','싶다'];
arr.sort();
console.log(arr);

function taskA(a,b){
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            const res = a+b;
            resolve(res);
        },3000);
    });
}
function taskB(a){
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            const res = a*2;
            resolve(res);
        },1000);
    });
}
function taskC(a){
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            const res = a*-1;
            resolve(res);
        },2000);
    });
}

taskA(5,1).then((a_res)=>{
    console.log(a_res);
    return taskB(a_res);
}).then((b_res)=>{
    console.log(b_res);
    return taskC(b_res);
}).then((c_res)=>{
    console.log(c_res);
})

// taskA(2,3,(res)=>{
//     console.log(res);
//     taskB(res,(res)=>{
//         console.log(res);
//         taskC(res,(res)=>{
//             console.log(res);
//         })
//     })
// });
