const formInput = ({ label, ...otherProps }) => {
  return (
    <div>
      <label>Display name</label>
      <input {...otherProps} />
    </div>
  )
}

export default formInput
