// A template re-mounts on every navigation (unlike layout), so the CSS
// animation on this wrapper replays each time the route changes.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
