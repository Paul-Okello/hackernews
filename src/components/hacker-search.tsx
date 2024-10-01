"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface SearchResult {
  objectID: string;
  title: string;
  url: string;
  author: string;
  points: number;
  num_comments: number;
  story_text: string;
}

export default function HackerSearch() {
  const [query, setQuery] = useState("Web Development");
  const [page, setPage] = useState(0);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(
          query
        )}&page=${page}&hitsPerPage=20`
      );
      const data = await response.json();
      setResults(data.hits);
      setTotalPages(data.nbPages);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [query, page]);


  const SkeletonCard = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Hacker News Search</h1>
      <Card className="mb-4">
        <CardHeader className="flex flex-row">
          <Input
            type="text"
            placeholder="Search Hacker News"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mr-2"
          />
          <Button size="sm" onClick={() => setPage(0)}>
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 ">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />)
          : results.map((result) => (
              <Card key={result.objectID}>
                <CardHeader>
                  <CardTitle>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {result.title}
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
                    {result.points} points by {result.author} |{" "}
                    {result.num_comments} comments
                  </p>
                  {result.story_text && (
                    <CardDescription className=" mt-2 prose ">
                      {result.story_text.length > 200
                        ? `${result.story_text.substring(0, 200)}...`
                        : result.story_text}
                    </CardDescription>
                  )}
                </CardContent>
              </Card>
            ))}
      </div>
      <div className="flex justify-between items-center">
        <Button
          size="sm"
          onClick={() => setPage((prev) => Math.max(0, prev - 1))}
          disabled={page === 0 || isLoading}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <Button
          size="sm"
          onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
          disabled={page === totalPages - 1 || isLoading}
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
