import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-bold tracking-tight", {
  variants: {
    size: {
      h1: "text-4xl md:text-5xl lg:text-6xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-2xl md:text-3xl",
    },
  },
  defaultVariants: {
    size: "h1",
  },
});

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const H1 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <h1
        className={cn(headingVariants({ size: "h1" }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
H1.displayName = "H1";

const H2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <h2
        className={cn(headingVariants({ size: "h2" }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
H2.displayName = "H2";

const H3 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <h3
        className={cn(headingVariants({ size: "h3" }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
H3.displayName = "H3";

const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
    ref={ref}
    {...props}
  />
));
Paragraph.displayName = "Paragraph";
export { H1, H2, H3, Paragraph };
