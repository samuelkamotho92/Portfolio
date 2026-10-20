import React, { useEffect, useState } from 'react';

import { client } from '../client';
import './CommunityPage.scss';

const lanes = [
  { id: 'all', label: 'All' },
  { id: 'technical', label: 'Technical' },
  { id: 'life', label: 'Life' },
];

const formatDate = (value) => {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const CommunityPage = () => {
  const [lane, setLane] = useState('all');
  const [loaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [appreciated, setAppreciated] = useState({});
  const [commentForm, setCommentForm] = useState({ name: '', message: '' });
  const [commentState, setCommentState] = useState('idle');
  const [connectForm, setConnectForm] = useState({
    name: '',
    email: '',
    topic: 'technical',
    message: '',
  });
  const [connectState, setConnectState] = useState('idle');

  const loadRoom = () => {
    const postQuery = '*[_type == "communityPost" && !(_id in path("drafts.**"))] | order(_createdAt desc) { _id, title, lane, excerpt, body, appreciations, "createdAt": _createdAt }';
    const commentQuery = '*[_type == "communityComment" && !(_id in path("drafts.**"))]{ _id, name, message, "postId": post._ref, _createdAt } | order(_createdAt asc)';

    client.fetch(postQuery).then((data) => {
      setPosts(data);
      setActiveId((current) => current || (data[0] && data[0]._id));
      const marks = {};
      data.forEach((post) => {
        if (window.localStorage.getItem(`appreciate-${post._id}`)) {
          marks[post._id] = true;
        }
      });
      setAppreciated(marks);
      setLoaded(true);
    });

    client.fetch(commentQuery).then(setComments);
  };

  useEffect(() => {
    document.title = 'Community · Samuel Kamotho';
    window.scrollTo(0, 0);
    loadRoom();
  }, []);

  const visiblePosts = posts.filter((post) => lane === 'all' || post.lane === lane);
  const active = visiblePosts.find((post) => post._id === activeId) || visiblePosts[0];
  const thread = comments.filter((item) => active && item.postId === active._id);

  const openPost = (id) => {
    setActiveId(id);
    setCommentState('idle');
  };

  const chooseLane = (next) => {
    setLane(next);
    setCommentState('idle');
    const nextPosts = posts.filter((post) => next === 'all' || post.lane === next);
    if (nextPosts[0]) setActiveId(nextPosts[0]._id);
  };

  const appreciate = (id) => {
    if (appreciated[id]) return;

    client
      .patch(id)
      .setIfMissing({ appreciations: 0 })
      .inc({ appreciations: 1 })
      .commit()
      .then((updated) => {
        window.localStorage.setItem(`appreciate-${id}`, '1');
        setAppreciated((prev) => ({ ...prev, [id]: true }));
        setPosts((prev) => prev.map((post) => (
          post._id === id ? { ...post, appreciations: updated.appreciations } : post
        )));
      });
  };

  const submitComment = (event) => {
    event.preventDefault();
    if (!active || !commentForm.name.trim() || !commentForm.message.trim()) return;

    setCommentState('sending');
    client.create({
      _type: 'communityComment',
      name: commentForm.name.trim(),
      message: commentForm.message.trim(),
      post: { _type: 'reference', _ref: active._id },
    }).then((doc) => {
      setComments((prev) => [...prev, {
        _id: doc._id,
        name: doc.name,
        message: doc.message,
        postId: active._id,
      }]);
      setCommentForm({ name: '', message: '' });
      setCommentState('sent');
    }).catch(() => setCommentState('error'));
  };

  const submitConnect = (event) => {
    event.preventDefault();
    if (!connectForm.name.trim() || !connectForm.email.trim() || !connectForm.message.trim()) return;

    const topicLabel = connectForm.topic === 'life' ? 'Life' : 'Technical';
    setConnectState('sending');
    client.create({
      _type: 'contact',
      name: connectForm.name.trim(),
      email: connectForm.email.trim(),
      message: `[${topicLabel}] ${connectForm.message.trim()}`,
    }).then(() => {
      setConnectForm({
        name: '', email: '', topic: connectForm.topic, message: '',
      });
      setConnectState('sent');
    }).catch(() => setConnectState('error'));
  };

  return (
    <div className="room">
      <header className="room-bar">
        <a href="/">Samuel Kamotho</a>
        <nav>
          <a href="/#work">Work</a>
          <a href="/#contact">Contact</a>
        </nav>
      </header>
      <header className="room-hero">
        <p className="room-kicker">Community</p>
        <h1>A room for the work, and for the life around it.</h1>
        <p className="room-lead">
          Technical notes from the build, and LivedLines for experience,
          Scripture, and lessons that are still being lived. Read a post,
          leave a reply, or write directly.
        </p>
        <div className="room-lanes" role="tablist" aria-label="Choose a lane">
          {lanes.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={lane === item.id}
              className={lane === item.id ? 'is-on' : ''}
              onClick={() => chooseLane(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <a className="room-back" href="/">Back to the portfolio</a>
      </header>

      <main className="room-layout">
        <aside className="room-list">
          {visiblePosts.map((post) => (
            <button
              key={post._id}
              type="button"
              className={active && active._id === post._id ? 'is-open' : ''}
              onClick={() => openPost(post._id)}
            >
              <span>{post.lane === 'life' ? 'Life' : 'Technical'}</span>
              <strong>{post.title}</strong>
              <em>{post.excerpt}</em>
            </button>
          ))}
          {loaded && visiblePosts.length === 0 && <p className="room-empty">No posts in this lane yet.</p>}
        </aside>

        {active && (
          <article className="room-post">
            <p className="room-post-meta">
              <span>{active.lane === 'life' ? 'LivedLines' : 'Technical'}</span>
              <time dateTime={active.createdAt}>{formatDate(active.createdAt)}</time>
            </p>
            <h2>{active.title}</h2>
            {active.body.split('\n').filter((line) => line.trim()).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <button
              type="button"
              className={`room-appreciate${appreciated[active._id] ? ' is-marked' : ''}`}
              onClick={() => appreciate(active._id)}
              disabled={Boolean(appreciated[active._id])}
            >
              {appreciated[active._id] ? 'Appreciated' : 'Appreciate'}
              <span>{active.appreciations || 0}</span>
            </button>

            <section className="room-thread">
              <h3>{thread.length === 0 ? 'Start the thread' : `${thread.length} ${thread.length === 1 ? 'reply' : 'replies'}`}</h3>
              {thread.map((item) => (
                <blockquote key={item._id}>
                  <cite>{item.name}</cite>
                  <p>{item.message}</p>
                </blockquote>
              ))}
              <form onSubmit={submitComment}>
                <label htmlFor="reply-name">
                  Name
                  <input
                    id="reply-name"
                    value={commentForm.name}
                    onChange={(event) => setCommentForm({ ...commentForm, name: event.target.value })}
                    required
                  />
                </label>
                <label htmlFor="reply-message">
                  Reply
                  <textarea
                    id="reply-message"
                    value={commentForm.message}
                    onChange={(event) => setCommentForm({ ...commentForm, message: event.target.value })}
                    required
                  />
                </label>
                <button type="submit" disabled={commentState === 'sending'}>
                  {commentState === 'sending' ? 'Sending…' : 'Leave a reply'}
                </button>
                {commentState === 'sent' && <p className="room-note">Your reply is in the thread.</p>}
                {commentState === 'error' && <p className="room-note">The reply did not send. Try again in a moment.</p>}
              </form>
            </section>
          </article>
        )}
      </main>

      <section className="room-connect" id="connect">
        <div>
          <p className="room-kicker">Connect</p>
          <h2>Write about the technical work, or about life.</h2>
          <p>
            This comes straight to me. Say which lane you are writing from,
            and what you want to talk through.
          </p>
        </div>
        {connectState === 'sent' ? (
          <p className="room-thanks">Received. I will read it and write back.</p>
        ) : (
          <form onSubmit={submitConnect}>
            <div className="room-topics">
              {['technical', 'life'].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  className={connectForm.topic === topic ? 'is-on' : ''}
                  onClick={() => setConnectForm({ ...connectForm, topic })}
                >
                  {topic === 'life' ? 'Life' : 'Technical'}
                </button>
              ))}
            </div>
            <label htmlFor="connect-name">
              Name
              <input
                id="connect-name"
                value={connectForm.name}
                onChange={(event) => setConnectForm({ ...connectForm, name: event.target.value })}
                required
              />
            </label>
            <label htmlFor="connect-email">
              Email
              <input
                id="connect-email"
                type="email"
                value={connectForm.email}
                onChange={(event) => setConnectForm({ ...connectForm, email: event.target.value })}
                required
              />
            </label>
            <label htmlFor="connect-message">
              Message
              <textarea
                id="connect-message"
                value={connectForm.message}
                onChange={(event) => setConnectForm({ ...connectForm, message: event.target.value })}
                required
              />
            </label>
            <button type="submit" disabled={connectState === 'sending'}>
              {connectState === 'sending' ? 'Sending…' : 'Send'}
            </button>
            {connectState === 'error' && <p className="room-note">That did not send. Try again in a moment.</p>}
          </form>
        )}
      </section>
    </div>
  );
};

export default CommunityPage;
