import { useState } from 'react'
import { news } from '../data/news'
import NewsCard from '../components/news/NewsCard'
import NewsModal from '../components/news/NewsModal'
import './NewsPage.css'

export default function NewsPage() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="news-page">
      <div className="news-header">
        <h2 className="news-page-title">Новини SkyMall</h2>
        <p className="news-page-subtitle">Останні події та акції</p>
      </div>
      <div className="news-grid">
        {news.map(item => (
          <NewsCard key={item.id} {...item} onOpen={() => setSelected(item)} />
        ))}
      </div>

      {selected && (
        <NewsModal item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
