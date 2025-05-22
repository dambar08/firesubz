export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Welcome to our Strapi Blog, a modern content platform built with Next.js and Strapi CMS. Our mission is to
          provide valuable content about web development, content management systems, and the latest technologies in the
          digital space.
        </p>

        <h2>Our Story</h2>
        <p>
          Founded in 2023, our blog started as a simple project to demonstrate the power of headless CMS architecture.
          Since then, it has grown into a comprehensive resource for developers and content creators alike.
        </p>

        <h2>Our Team</h2>
        <p>
          Our team consists of passionate developers, designers, and content creators who are dedicated to sharing their
          knowledge and expertise with the community.
        </p>

        <h2>Our Technology Stack</h2>
        <p>We use the following technologies to power our blog:</p>
        <ul>
          <li>
            <strong>Strapi</strong>: A flexible, open-source headless CMS that gives developers the freedom to choose
            their favorite tools and frameworks.
          </li>
          <li>
            <strong>Next.js</strong>: A React framework that enables server-side rendering and generating static
            websites for React based web applications.
          </li>
          <li>
            <strong>Tailwind CSS</strong>: A utility-first CSS framework for rapidly building custom user interfaces.
          </li>
          <li>
            <strong>shadcn/ui</strong>: A collection of reusable components built with Radix UI and Tailwind CSS.
          </li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          Have questions or suggestions? Feel free to reach out to us through our contact page or via email at
          <a href="mailto:info@strapiblog.com"> info@strapiblog.com</a>.
        </p>
      </div>
    </div>
  )
}
