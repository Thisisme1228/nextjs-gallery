import { Alert } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      <Alert>
        <p>
          This is a project of NextJS, including:
        </p>
        <ul>
          <li>static and dynamic server-side rendering</li>
          <li>incremental static regeneration</li>
          <li>client-side rendering</li>
          <li>route handlers (API endpoints)</li>
          <li>meta-data API</li>
          <li>and more</li>
        </ul>
        <p className='mb-0'>
          Every page uses a different approach to <strong>fetching and caching data</strong>. Click the links in the nav bar to try them out.
        </p>
      </Alert>
    </div>
  );
}
