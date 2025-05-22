"use client"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // In a real implementation, you would use a markdown library like react-markdown
  // This is a simple implementation that converts line breaks to <br> tags
  const formattedContent = content
    .split("\n")
    .map((line, i) => {
      // Handle headings
      if (line.startsWith("# ")) {
        return (
          <h1 key={i} className="text-3xl font-bold my-4">
            {line.substring(2)}
          </h1>
        )
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-bold my-3">
            {line.substring(3)}
          </h2>
        )
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={i} className="text-xl font-bold my-2">
            {line.substring(4)}
          </h3>
        )
      }

      // Handle code blocks
      if (line.startsWith("```") && !line.endsWith("```")) {
        return null // Start of code block, handled below
      }

      // Handle empty lines
      if (line.trim() === "") {
        return <br key={i} />
      }

      // Default paragraph
      return (
        <p key={i} className="my-2">
          {line}
        </p>
      )
    })
    .filter(Boolean)

  // Handle code blocks
  const codeBlockRegex = /```([\s\S]*?)```/g
  const contentWithCodeBlocks = content.replace(codeBlockRegex, (match, code) => {
    return `<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code>${code.trim()}</code></pre>`
  })

  return (
    <div>
      {formattedContent}
      {content.includes("```") && <div dangerouslySetInnerHTML={{ __html: contentWithCodeBlocks }} />}
    </div>
  )
}
