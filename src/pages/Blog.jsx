import { useState, useMemo } from 'react';
import { SearchX, Tag } from 'lucide-react';
import BlogCard, { formatDate } from '../components/BlogCard/BlogCard.jsx';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter.jsx';
import Newsletter from '../components/Newsletter/Newsletter.jsx';
import Card from '../components/Card/Card.jsx';
import posts from '../data/posts.json';

const CATEGORIES = ['All', 'React', 'JavaScript', 'Programming', 'CSS', 'Technology'];
const RECENT_COUNT = 5;
const TAG_COUNT = 10;

/** True when the post matches the search text (title, description, category, tags, author). */
function matchesSearch(post, query) {
  const text = query.trim().toLowerCase();
  if (!text) return true;

  const haystack = [post.title, post.description, post.category, post.author, ...(post.tags || [])]
    .join(' ')
    .toLowerCase();
  return haystack.includes(text);
}

/**
 * Blog
 * Search + category filter work together: a post is shown only when it
 * passes BOTH checks. Results update instantly on every keystroke because
 * the filtered list is simply derived from state during rendering.
 */
export default function Blog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  // Combined filter. useMemo avoids recomputing when unrelated state changes.
  const filteredPosts = useMemo(
    () =>
      posts.filter(
        (post) => (category === 'All' || post.category === category) && matchesSearch(post, query),
      ),
    [category, query],
  );

  // Number of posts per category, shown as badges on the filter buttons.
  const categoryCounts = useMemo(() => {
    const counts = { All: posts.length };
    posts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Newest posts first for the sidebar.
  const recentPosts = useMemo(
    () => [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, RECENT_COUNT),
    [],
  );

  // Count how often each tag appears and keep the most common ones.
  const popularTags = useMemo(() => {
    const tagCounts = {};
    posts.forEach((post) => {
      (post.tags || []).forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, TAG_COUNT)
      .map(([tag]) => tag);
  }, []);

  const handleTagClick = (tag) => {
    setCategory('All');
    setQuery(tag);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setQuery('');
    setCategory('All');
  };

  return (
    <div className="page container">
      <header className="page__head">
        <p className="section__eyebrow">Thoughts &amp; tutorials</p>
        <h1 className="page__title">Blog</h1>
        <p className="page__subtitle">Notes on React, JavaScript, CSS and the things I learn while building projects.</p>
      </header>

      <div className="blog-layout">
        <div className="blog-main">
          <div className="blog-toolbar">
            <SearchBar value={query} onChange={setQuery} placeholder="Search posts, tags or topics..." />
            <CategoryFilter
              categories={CATEGORIES}
              active={category}
              onChange={setCategory}
              counts={categoryCounts}
            />
          </div>

          <p className="blog-results" role="status" aria-live="polite">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>

          {filteredPosts.length > 0 ? (
            <div className="grid grid--blog">
              {filteredPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  category={post.category}
                  author={post.author}
                  date={post.date}
                  description={post.description}
                  image={post.image}
                  readTime={post.readTime}
                  delay={Math.min(index, 6) * 70}
                />
              ))}
            </div>
          ) : (
            <Card className="empty-state" hoverable={false}>
              <SearchX size={44} aria-hidden="true" />
              <h2>No Posts Found</h2>
              <p>Try a different keyword or choose another category.</p>
              <button type="button" className="link-btn" onClick={clearFilters}>
                Clear search and filters
              </button>
            </Card>
          )}
        </div>

        <aside className="blog-sidebar" aria-label="Blog sidebar">
          <Card as="section" hoverable={false} aria-labelledby="recent-title">
            <h2 id="recent-title" className="sidebar-title">
              Recent Posts
            </h2>
            <ul className="recent-list">
              {recentPosts.map((post) => (
                <li key={post.id}>
                  <button type="button" className="recent-item" onClick={() => handleTagClick(post.title)}>
                    <img src={post.image} alt="" loading="lazy" width="64" height="64" />
                    <span>
                      <strong>{post.title}</strong>
                      <small>{formatDate(post.date)}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card as="section" hoverable={false} aria-labelledby="tags-title">
            <h2 id="tags-title" className="sidebar-title">
              Popular Tags
            </h2>
            <ul className="chip-list">
              {popularTags.map((tag) => (
                <li key={tag}>
                  <button type="button" className="chip chip--button" onClick={() => handleTagClick(tag)}>
                    <Tag size={12} aria-hidden="true" /> {tag}
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Newsletter
            title="Newsletter"
            description="Get new posts about web development straight to your inbox."
          />
        </aside>
      </div>
    </div>
  );
}
