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
    <div
      className="w-full min-h-[300px] flex items-center justify-center opacity-0"
      style={{ animation: "bounceIn 0.8s cubic-bezier(0.36, 0, 0.66, -0.56) forwards 0.5s" }}
    >
      <style jsx>{`
        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          70% { 
            transform: scale(0.95);
            opacity: 0.9;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          This not only has aged well, it's also the single most important
          change that's happened to the software engineering industry since its
          inception{" "}
          <a href="https://t.co/Z2vgnpjCD5">https://t.co/Z2vgnpjCD5</a>
        </p>
        &mdash; Guillermo Rauch (@rauchg){" "}
        <a
          href={`https://twitter.com/rauchg/status/${tweetId}?ref_src=twsrc%5Etfw`}
        >
          March 16, 2025
        </a>
      </blockquote>
    </div>
  );
};

export default EnglishTweet;
