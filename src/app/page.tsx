import HomePageContent from './HomePageContent';
import { getHomePosts } from './home-data';

export const revalidate = 900;

export default async function Page() {
  const posts = await getHomePosts();

  return <HomePageContent posts={posts} />;
}
