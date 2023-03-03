async function getUser() {
  return await fetch(
    'https://my-json-server.typicode.com/typicode/demo/profile'
  ).then(res => res.json())
}

async function m1() {
  return await getUser()
}

async function m2() {
  return await m1()
}

async function m3() {
  return await m2()
}

m3().then(res => {
  console.log(res);
})

