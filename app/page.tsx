import { createClient } from "@/lib/supabase/server"
import { 
  HeroSection, 
  FeaturedArticles, 
  NewsletterSection, 
  LoadingError 
} from "@/components/home"
import PageLayout from "@/components/layout/PageLayout"

export default async function HomePage() {
  console.log("[v0] HomePage: Starting to load data")

  try {
    const supabase = await createClient()
    console.log("[v0] HomePage: Supabase client created successfully")

    const { data: featuredPosts, error: postsError } = await supabase
      .from("posts")
      .select(`
        *,
        categories (
          name,
          slug
        )
      `)
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(6)

    if (postsError) {
      console.error("[v0] HomePage: Error fetching posts:", postsError)
    } else {
      console.log("[v0] HomePage: Posts fetched successfully:", featuredPosts?.length || 0, "posts")
    }

    const { data: categories, error: categoriesError } = await supabase.from("categories").select("*").order("name")

    if (categoriesError) {
      console.error("[v0] HomePage: Error fetching categories:", categoriesError)
    } else {
      console.log("[v0] HomePage: Categories fetched successfully:", categories?.length || 0, "categories")
    }

    return (
      <PageLayout categories={categories}>
        <HeroSection categories={categories} />
        <FeaturedArticles posts={featuredPosts} postsError={postsError} />
        <NewsletterSection />
      </PageLayout>
    )
  } catch (error) {
    console.error("[v0] HomePage: Critical error:", error)
    return <LoadingError />
  }
}
