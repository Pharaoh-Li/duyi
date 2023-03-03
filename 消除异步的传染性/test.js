function getUser() {
  return fetch(
    'https://my-json-server.typicode.com/typicode/demo/profile'
  )
}

function m1() {
  return getUser()
}

function m2() {
  return m1()
}

function m3() {
  return m2()
}
let n = 0
function main() {
  const user = m3()
  console.log(n, user);
}

function run(func) {
  let cache = []
  let i = 0
  const _originalFetch = window.fetch
  window.fetch = (...args) => {
    if (cache[i]) {
      // 交付缓存结果
      if (cache[i].status === 'fulfilled') {
        return cache[i].data
      } else if (cache[i].status === 'rejected') {
        throw cache[i].err
      }
    }
    const result = {
      status: 'pending',
      data: null,
      err: null,
    }
    cache[i++] = result
    // 发送请求
    if (i === 2) return undefined
    const pro = _originalFetch(...args)
      .then(resp => resp.json())
      .then(
        (resp) => {
          result.status = 'fulfilled'
          result.data = resp
        },
        (err) => {
          result.status = 'rejected'
          result.err = err
        }
      )
    //  报错
    throw pro
  }
  try {
    func()
  } catch (err) {

    if (err instanceof Promise) {
      n++
      const reRun = () => {
        i = 0
        func()
      }
      err.then(reRun, reRun)
    }
  }
  func()
}

run(main)



