import React, { useEffect, useState } from "react";

const FinalNarrative = ({ paragraphs,selectedNaratvies,parasContent }) => {
  const [highlightedSuggestions, setHighlightedSuggestions] = useState({});
  const selectedRows = paragraphs.filter((row) => selectedNaratvies.includes(row.id));
  useEffect(() => {
    highlightSuggestions();
  },[paragraphs,selectedNaratvies]);
  const highlightSuggestions = () => {
    const map={};
    selectedRows.filter(row => row.FrontendAction === "Replace" && row.error!=="\n").forEach((paragraph) => {
      let { paraContent, error, suggestion, StartPos } = paragraph;
      paraContent= map[paragraph.ParagraphNum]|| paraContent;
      const lastUpdatedIndex = paraContent.lastIndexOf(`</span>`);
      const errorPos = paraContent.indexOf(error,lastUpdatedIndex>0 && lastUpdatedIndex>StartPos?lastUpdatedIndex:StartPos);

      // If the error is not found in the paragraph, skip it
      if (errorPos === -1) {
        return paragraph;
      }

      // Split the paragraph into three parts: the text before the error, the error itself, and the text after the error
      const beforeError = paraContent.substring(0, errorPos);
      const afterError = paraContent.substring(errorPos + error.length);

      const suggestions = Array.isArray(suggestion)?suggestion:suggestion.split("/");
      // Wrap the suggestion in a span element with a "highlight" class
      const suggestionSpan = `<span class="text-white bg-green-500 py-1">${suggestions[0]}</span>`;

      // Concatenate all three parts to get the highlighted paragraph
      const highlightedParagraph = beforeError + suggestionSpan + afterError;

      map[paragraph.ParagraphNum]= highlightedParagraph;
    });

    setHighlightedSuggestions(map);
  };
  return (
    <div>
      {parasContent.map((paragraph,i) => (
        <span key={i} dangerouslySetInnerHTML={{ __html: highlightedSuggestions[i+1]||paragraph }} />
      ))}
    </div>
  );
};

export default FinalNarrative;
