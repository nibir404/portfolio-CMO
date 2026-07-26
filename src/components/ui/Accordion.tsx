"use client";

import { useId, useState } from "react";
import type { FaqEntry } from "@/types/content";

export function Accordion({ items }: { items: FaqEntry[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          item={item}
          isOpen={open === index}
          onToggle={() => setOpen((current) => (current === index ? null : index))}
        />
      ))}
    </div>
  );
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  const headingId = `${id}-heading`;
  const panelId = `${id}-panel`;
  return (
    <div className="accordion__item">
      <h3>
        <button
          type="button"
          className="accordion__button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          id={headingId}
          onClick={onToggle}
        >
          <span>{item.question}</span>
          <span className="accordion__icon" aria-hidden="true">
            {isOpen ? "−" : "+"}
          </span>
        </button>
      </h3>
      {isOpen ? (
        <div id={panelId} role="region" aria-labelledby={headingId} className="accordion__panel">
          <p>{item.answer}</p>
        </div>
      ) : null}
    </div>
  );
}
