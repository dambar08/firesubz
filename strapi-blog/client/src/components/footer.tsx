import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="font-bold text-xl">
            Strapi Blog
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            A modern blog built with Next.js and Strapi CMS
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Navigation</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <Link href="/blog" className="hover:text-primary">
                Blog
              </Link>
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Resources</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="https://nextjs.org" target="_blank" className="hover:text-primary">
                Next.js
              </Link>
              <Link href="https://strapi.io" target="_blank" className="hover:text-primary">
                Strapi
              </Link>
              <Link href="https://ui.shadcn.com" target="_blank" className="hover:text-primary">
                shadcn/ui
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
            <h3 className="font-medium">Subscribe</h3>
            <p className="text-sm text-muted-foreground">Subscribe to our newsletter to get the latest updates.</p>
            <form className="flex gap-2 mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t">
        <p className="text-sm text-center text-muted-foreground">
          © {new Date().getFullYear()} Strapi Blog. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
