"use client";

import { useMemo, useState } from "react";
import { Download, FileText, Search } from "lucide-react";

import { downloadCategories, type DownloadCategory, type DownloadDocument } from "@/types/downloads";

import styles from "./downloads-explorer.module.css";

type DownloadsExplorerProps = {
  documents: DownloadDocument[];
  hasLoadError?: boolean;
};

export function DownloadsExplorer({ documents, hasLoadError = false }: DownloadsExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<DownloadCategory>("All");
  const [query, setQuery] = useState("");

  const visibleDocuments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return documents.filter((document) => {
      const matchesCategory = activeCategory === "All" || document.category === activeCategory;
      const matchesQuery = !normalizedQuery || `${document.title} ${document.description ?? ""}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, documents, query]);

  if (hasLoadError) {
    return <div className="downloads-empty-state" role="status"><FileText aria-hidden="true" className="text-gold-ink" size={28} /><p className="type-eyebrow text-brand-red">Document centre</p><h3 className={styles.emptyHeading}>Documents are temporarily unavailable.</h3><p>Please refresh this page and try again. No unpublished documents are shown.</p></div>;
  }

  return (
    <section className="downloads-explorer" aria-labelledby="document-centre-title">
      <h2 className="sr-only" id="document-centre-title">Approved school documents</h2>
      <div className="downloads-controls">
        <label className="downloads-search" htmlFor="downloads-search">
          <Search aria-hidden="true" size={18} />
          <span className="sr-only">Search approved school documents</span>
          <input id="downloads-search" onChange={(event) => setQuery(event.target.value)} placeholder="Search documents" type="search" value={query} />
        </label>
        <div aria-label="Document categories" className="downloads-filter-list" role="group">
          {downloadCategories.map((category) => (
            <button
              aria-pressed={activeCategory === category}
              className={activeCategory === category ? "downloads-filter-active" : undefined}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {visibleDocuments.length ? (
        <ul className="downloads-list">
          {visibleDocuments.map((document) => (
            <li key={document.id}>
              <FileText aria-hidden="true" className="text-gold-ink" size={22} />
              <div>
                <p className="type-eyebrow text-brand-red">{document.category}</p>
                <h3>{document.title}</h3>
                {document.description ? <p>{document.description}</p> : null}
              </div>
              <div className="downloads-document-meta">
                {document.fileType ? <span>{document.fileType}</span> : null}
                {document.fileSize ? <span>{document.fileSize}</span> : null}
                {document.publishDate ? <time dateTime={document.publishDate}>{document.publishDate}</time> : null}
              </div>
              {document.fileUrl ? <a aria-label={`Open ${document.title}`} href={document.fileUrl} rel="noreferrer" target="_blank"><Download aria-hidden="true" size={17} />Open</a> : null}
            </li>
          ))}
        </ul>
      ) : (
        <div className="downloads-empty-state" role="status">
          <FileText aria-hidden="true" className="text-gold-ink" size={28} />
          <p className="type-eyebrow text-brand-red">Document centre</p>
          <h3 className={styles.emptyHeading}>No approved documents are available in this category yet.</h3>
          <p>Verified school documents will appear here when they are supplied and approved for publication.</p>
        </div>
      )}
    </section>
  );
}
