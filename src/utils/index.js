
export function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

export function isAndroid() {
  return /Android/i.test(navigator.userAgent)
}

export function isIPhone() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export function isIE() {
  return /Edge|MSIE|trident/i.test(navigator.userAgent)
}

export function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent.toLowerCase())
}

export function logStack() {
  const { stack } = new Error()
  console.warn('PRINTING CALL STACK')
  console.warn(stack)
}
