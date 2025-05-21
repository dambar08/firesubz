import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-bold tracking-tight", {
  variants: {
    size: {
      h1: "text-4xl md:text-5xl lg:text-6xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-2xl md:text-3xl",
      h4: "text-xl md:text-2xl",
      h5: "text-lg md:text-xl",
      h6: "text-base md:text-lg",
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

const H4 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <h4
        className={cn(headingVariants({ size: "h4" }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
H4.displayName = "H4";

const H5 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <h5
        className={cn(headingVariants({ size: "h5" }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
H5.displayName = "H5";

const H6 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <h6
        className={cn(headingVariants({ size: "h6" }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
H6.displayName = "H6";


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
export { H1, H2, H3, H4, H5, H6, Paragraph };
