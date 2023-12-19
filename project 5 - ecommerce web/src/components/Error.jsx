export default function Error({ style, message }) {
  return (
    <div style={style} className="error">
        <i className="bi bi-exclamation-octagon-fill"></i>
        <p>{message}</p>
    </div>
  )
}
