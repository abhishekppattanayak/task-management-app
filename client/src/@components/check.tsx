export function Checked () {
  return (
    <svg width="100%" height="100%" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <rect x="256" y="256" width="50%" height="50%" className="fill-white dark:fill-black"  />
      <path className="fill-black dark:fill-white" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"/>
    </svg>
  )
}

export function Unchecked () {
  return (
    <svg width="100%" height="100%" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <circle cx="512" cy="512" r="416" className="fill-none stroke-black dark:stroke-white" strokeWidth="64"/>
    </svg>
  )
}