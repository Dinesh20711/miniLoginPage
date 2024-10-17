import './index.css'

const NotFound = () => {
  return (
    <div className="not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"
        alt="not found"
        className='img-section'
      />
      <h1 className="heading-not">Page Not Found</h1>
      <p className="description">We cannot Found the page</p>
    </div>
  )
}

export default NotFound
