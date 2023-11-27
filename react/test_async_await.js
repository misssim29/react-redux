function delay(ms){
    return new Promise((resolve) =>{
        setTimeout(resolve,ms);
    });
}
async function helloAsync(){
    await delay(3000); // await의 역할 : 비동기->동기식으로 변경 한마디로 이거 먼저 순서대로 실행하고 넘겨라;
    await console.log('잠깐');
    await delay(2000);
    return "hello async";
}
async function main(){
    const res = await helloAsync();
    console.log(res);
}
main();

