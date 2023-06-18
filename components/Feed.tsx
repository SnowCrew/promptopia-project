"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { Prompt } from "@/app/create-prompt/page";

interface PromptCreator {
  email: string;
  username: string;
  _id: string;
  image: string;
}
export interface PromptFromDB extends Prompt {
  _id: "string";
  creator: PromptCreator;
}

type PromptCardListProps = {
  data: PromptFromDB[];
  handleTagClick: (tag: string) => void;
};

type SearchConstrains = "tag" | "any";

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleDelete={() => {}}
          handleEdit={() => {}}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState<PromptFromDB[]>([]);

  //searching
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchedResults, setSearchedResults] = useState<PromptFromDB[]>([]);
  const searchCallback = (searchStr: string) => {
    const searchRes = filterPosts(searchStr);
    setSearchedResults(searchRes);
  };

  const filterPosts = (
    searchStr: string,
    constrains: SearchConstrains = "any"
  ) => {
    const regex = new RegExp(searchStr, "i");

    if (constrains === "tag") {
      return allPosts.filter((item) => regex.test(item.tag));
    }

    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.creator.email) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPosts(tagName, "tag");
    setSearchedResults(searchResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setAllPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
