import './NewsCard.css'

export default function NewsCard({ title, date, excerpt, imageUrl, category, onOpen }) {
  const formattedDate = new Date(date).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="news-card">
      <div className="news-card-img-wrap">
        <img src={imageUrl} alt={title} className="news-card-img" loading="lazy" />
        <span className="news-card-category">{category}</span>
      </div>
      <div className="news-card-body">
        <p className="news-card-date">{formattedDate}</p>
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-excerpt">{excerpt}</p>
        <button className="news-card-btn" onClick={onOpen}>Читати далі</button>
      </div>
    </article>
  )
}
