function Button(count, setCount) {
 // console.log("Props: ", props);
  return (
    <button
      onClick={() => setCount(count + 1)}
    >
      {count}
    </button>
  )
}

export default Button