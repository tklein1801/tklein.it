import { Link } from '@/components';

export default function NotFound() {
  return (
    <section>
      <div>
        <h1>Not Found</h1>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </div>
    </section>
  );
}
