import { useEffect } from "react";

interface EnglishTweetProps {
  tweetId?: string;
}

const EnglishTweet: React.FC<EnglishTweetProps> = ({
  tweetId = "1901357103731847605",
}) => {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <blockquote className="twitter-tweet">
      <p lang="en" dir="ltr">
        This not only has aged well, it's also the single most important change
        that's happened to the software engineering industry since its inception{" "}
        <a href="https://t.co/Z2vgnpjCD5">https://t.co/Z2vgnpjCD5</a>
      </p>
      &mdash; Guillermo Rauch (@rauchg){" "}
      <a
        href={`https://twitter.com/rauchg/status/${tweetId}?ref_src=twsrc%5Etfw`}
      >
        March 16, 2025
      </a>
    </blockquote>
  );
};

export default EnglishTweet;
