// app/posts/page.tsx
import Link from "next/link";

// WordPress REST API URL
const API_URL = process.env.NEXT_PUBLIC_WP_API_URL || "http://localhost:8000/wp-json/wp/v2";

export default async function PostsPage() {
    // WordPress에서 게시글 목록 가져오기
    const res = await fetch(`${API_URL}/posts?_fields=id,slug,title,excerpt`, {
        next: { revalidate: 60 }, // ISR (1분마다 갱신)
    });
    const posts = await res.json();

    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">블로그 글 목록</h1>
            <ul className="space-y-4">
                {posts.map((post: any) => (
                    <li key={post.id} className="border-b pb-4">
                        <Link href={`/post/${post.slug}`}>
                            <h2
                                className="text-xl font-semibold hover:underline"
                                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                            />
                        </Link>
                        <div
                            className="text-gray-600 text-sm mt-2"
                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                        />
                    </li>
                ))}
            </ul>
        </main>
    );
}
