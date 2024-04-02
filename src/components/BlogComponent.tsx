import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import LinkItem from "src/components/LinkItem";

const BlogComponent = ({
  title,
  subtitle,
  posts,
  className,
}: {
  title: string;
  subtitle: string;
  posts: any;
  className?: string;
}) => {
  const { pathname } = useRouter();
  return (
    <div
      className={clsx(
        "flex flex-col relative mt-4 pl-2 md:mt-8 md:pl-0",
        className
      )}
    >
      <div className="w-px h-full border-r border-dashed border-gray-400 absolute ml-[-1.6rem] md:ml-[-2.4rem]" />
      <h1 className="text-2xl font-title mb-1">{title}</h1>
      <span className="text-base font-text text-gray-500 font-medium pb-4 border-b border-dashed border-gray-400">
        {subtitle}
      </span>
      {posts.map(
        (
          {
            title,
            desc,
            action,
            leftText,
            subtitle,
            href,
            external,
          }: {
            title: string;
            href: string;
            desc?: string;
            action?: string;
            leftText?: string;
            subtitle?: string;
            external?: boolean;
          },
          index: any
        ) => (
          <LinkItem
            title={title}
            desc={desc}
            action={action}
            leftText={leftText}
            key={index}
            subtitle={subtitle}
            external={external}
            href={href}
          />
        )
      )}
      <span className="text-base font-text flex justify-between text-gray-500 font-medium border-b border-dashed border-gray-400">
        {!pathname.includes("writings") && (
          <Link
            href="/writings"
            className="flex-1 border-x text-center border-dashed border-gray-400 py-4 hover:bg-white hover:text-black"
          >
            {" "}
            See all texts{" "}
          </Link>
        )}
        {!pathname.includes("projects") && (
          <Link
            href="/projects"
            className="flex-1 text-center hover:bg-white hover:text-black py-4 border-x border-dashed border-gray-400"
          >
            {" "}
            See all Case Studies{" "}
          </Link>
        )}
      </span>
    </div>
  );
};

export default BlogComponent;
