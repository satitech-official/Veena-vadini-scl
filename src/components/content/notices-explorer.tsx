"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { DemoContentLabel } from "@/components/content/demo-content-label";
import { NoticeRow } from "@/components/content/notice-row";
import { Button } from "@/components/ui/button";
import { noticeCategories, type Notice, type NoticeCategory } from "@/types/content";

type NoticeFilter = "All" | NoticeCategory;

type NoticesExplorerProps = {
  notices: readonly Notice[];
  hasLoadError?: boolean;
};

export function NoticesExplorer({ hasLoadError = false, notices }: NoticesExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<NoticeFilter>("All");
  const [query, setQuery] = useState("");
  const isDemoCollection = notices.some((notice) => notice.isDemo);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredNotices = useMemo(
    () => notices.filter((notice) => {
      const matchesCategory = activeCategory === "All" || notice.category === activeCategory;
      const searchableText = `${notice.title} ${notice.summary} ${notice.category}`.toLocaleLowerCase();

      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    }),
    [activeCategory, normalizedQuery, notices],
  );
  const filters: readonly NoticeFilter[] = ["All", ...noticeCategories];

  const resetFilters = () => {
    setActiveCategory("All");
    setQuery("");
  };

  if (hasLoadError) {
    return <section className="content-empty-state" role="status"><p className="type-eyebrow text-brand-red">Notice board</p><h2 className="mt-4 font-display text-[clamp(2.3rem,4vw,4.3rem)] leading-[0.88] tracking-[-0.06em] text-primary">Updates are temporarily unavailable.</h2><p className="mt-4 max-w-lg text-base leading-7 text-muted">Please refresh this page or contact the school directly for urgent information.</p></section>;
  }

  return (
    <div className="notices-explorer">
      {isDemoCollection ? <DemoContentLabel /> : null}
      <div className="notice-explorer-controls mt-7 border-y border-brand-indigo/14 py-5 sm:mt-9 sm:py-6">
        <label className="notice-search">
          <span className="sr-only">Search school notices</span>
          <Search aria-hidden="true" size={18} strokeWidth={1.8} />
          <input
            aria-controls="notice-results"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search notices"
            type="search"
            value={query}
          />
          {query ? (
            <button aria-label="Clear notice search" onClick={() => setQuery("")} type="button">
              <X aria-hidden="true" size={16} />
            </button>
          ) : null}
        </label>
        <div aria-label="Filter notices by category" className="notice-filter-list" role="group">
          {filters.map((filter) => (
            <button
              aria-pressed={activeCategory === filter}
              className={activeCategory === filter ? "notice-filter-active" : undefined}
              key={filter}
              onClick={() => setActiveCategory(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-sm leading-6 text-muted">
        {filteredNotices.length} {filteredNotices.length === 1 ? (isDemoCollection ? "demo notice" : "notice") : (isDemoCollection ? "demo notices" : "notices")} shown.
      </p>

      {filteredNotices.length ? (
        <ol className="mt-5 border-t border-brand-indigo/15" id="notice-results">
          {filteredNotices.map((notice, index) => (
            <li className="border-b border-brand-indigo/15" key={notice.id}>
              <NoticeRow notice={notice} priority={index === 0 ? "featured" : "standard"} />
            </li>
          ))}
        </ol>
      ) : (
        <section className="content-empty-state mt-8" id="notice-results">
          <p className="type-eyebrow text-brand-red">Notice board</p>
          <h2 className="mt-4 font-display text-[clamp(2.3rem,4vw,4.3rem)] leading-[0.88] tracking-[-0.06em] text-primary">No notices found.</h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted">{notices.length ? "Try another category or clear the search to view available notices." : "Published school notices will appear here when the school is ready to share them."}</p>
          <Button className="mt-7" onClick={resetFilters} size="md" type="button" variant="secondary">Reset filters</Button>
        </section>
      )}
    </div>
  );
}
