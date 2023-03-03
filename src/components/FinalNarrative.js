import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Paragraph, Document, Packer } from "docx";
import { saveAs } from "file-saver";

const FinalNarrative = ({ paragraphs,selectedNaratvies,parasContent }) => {
  const [highlightedSuggestions, setHighlightedSuggestions] = useState({});
  const [suggestions, setSuggestions] = useState({});
  const selectedRows = paragraphs.filter((row) => selectedNaratvies.includes(row.id));
  useEffect(() => {
    highlightSuggestions();
    getSuggestions();
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
  const getSuggestions = () => {
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
      

      // Concatenate all three parts to get the highlighted paragraph
      const highlightedParagraph = beforeError + suggestions[0] + afterError;

      map[paragraph.ParagraphNum]= highlightedParagraph;
    });

    setSuggestions(map);
  };
  const generate = () => {
    const doc = new Document({
      sections: [
        {
          children: parasContent.map((paragraph,i) => suggestions[i+1]||paragraph).map(text => new Paragraph({text}))
        }
      ]
    });

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  };

  return (
    <>
    <div>
      {parasContent.map((paragraph,i) => (
        <span key={i} dangerouslySetInnerHTML={{ __html: highlightedSuggestions[i+1]||paragraph }} />
      ))}
    </div>
    <div className="flex justify-center items-center w-full">
    <Button size="large" variant="contained" onClick={generate} >
      Download doc.
    </Button>
  </div>
  </>
  );
};

export default FinalNarrative;
