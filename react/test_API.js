async function getDate(){
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/1/comments");
    let jsonResponse = await response.json();
    console.log(jsonResponse);
}
getDate();