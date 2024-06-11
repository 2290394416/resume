export function postApi() {
  // promise
  // 状态机   pending  -> resolve   pending -> rejected
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: 'xxxx',
        success: true,
        code: 2001
      })
    }, 1000)
  })
}